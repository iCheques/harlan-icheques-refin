import harlan from 'harlan';
import $ from 'jquery';
import get from 'lodash/get';
import numeral from 'numeral';
import {
  CPF,
  CNPJ,
} from 'cpf_cnpj';
import serasaFields from './fields-serasa';
import FieldsCreator from './fields-creator';

harlan.addPlugin((controller) => {
  const systemTags = (controller.confs.user || {}).tags || [];
  const hasCredits = (c, b) => controller.server.call(
    "SELECT FROM 'ICHEQUES'.'IPAYTHEBILL'",
    controller.call('loader::ajax', {
      dataType: 'json',
      success: (data) => {
        if (data) {
          controller.call('credits::has', c, () => {
            b();
          });
        } else {
          b();
        }
      },
    }),
  );

  controller.registerCall('icheques::consulta::imoveis::generate', (data, result, doc, alertDisabled = false, firstCallDisabled = false, imoveisButton = null) => {
    if (!$.isEmptyObject(imoveisButton)) {
      imoveisButton.parent();
      imoveisButton.remove();
    }

    let firstCall = !firstCallDisabled;
    const addItem = (name, value) => (value ? result.addItem(name, value) : null);
    const objectData = JSON.parse(data);

    if ($.isEmptyObject(objectData)) return;

    const iptus = objectData.IPTUS;

    if (iptus === undefined || iptus.length === 0) {
      const separatorElement = result
        .addSeparator(
          'Não foram encontrados registros de IPTU',
          'O sistema não encontrou nenhum registro de IPTU para o documento informado.',
          `Para o documento ${
            CPF.isValid(doc) ? CPF.format(doc) : CNPJ.format(doc)
          } não foram encontrados registros de IPTU.`,
        )
        .addClass('error');
      controller.call('minimizar::categorias', result.element());
      if (firstCall) {
        $('html, body').animate({
          scrollTop: separatorElement.offset().top,
        },
        2000);
        firstCall = false;
      }
    } else {
      iptus.forEach((iptu) => {
        const separatorElement = result
          .addSeparator(
            'Registro de IPTU no Nome',
            'Apontamentos de IPTU para o documento informado',
            'Imposto Predial e Territorial Urbano sendo cobrado para o documento',
          )
          .addClass('error');
        if (firstCall) {
          $('html, body').animate({
            scrollTop: separatorElement.offset().top,
          },
          2000);
          firstCall = false;
        }

        if (iptu.hasOwnProperty('COMPLEMENTO')) {
          iptu.COMPLEMENTO.hasOwnProperty('CONJUNTO') ? addItem('Conjunto', iptu.COMPLEMENTO.CONJUNTO) : '';
          iptu.COMPLEMENTO.hasOwnProperty('QUADRA') ? addItem('Quadra', iptu.COMPLEMENTO.QUADRA) : '';
          iptu.COMPLEMENTO.hasOwnProperty('LOTE') ? addItem('Lote', iptu.COMPLEMENTO.LOTE) : '';
        }
        iptu.hasOwnProperty('ENDERECO') ? addItem('Endereço', iptu.ENDERECO) : '';
        iptu.hasOwnProperty('NUMERO') ? addItem('Número', iptu.NUMERO) : '';
        iptu.hasOwnProperty('BAIRRO') ? addItem('Bairro', iptu.BAIRRO) : '';
        iptu.hasOwnProperty('CEP') ? addItem('CEP', iptu.CEP) : '';
        // addItem('Código', iptu.CodLog);
        if (iptu.hasOwnProperty('AREA')) {
          iptu.AREA.hasOwnProperty('TOTAL') ? addItem(
            'Área do Terreno',
            iptu.AREA.TOTAL
              ? `${numeral(iptu.AREA.TOTAL).format()} m²`
              : null,
          ) : '';

          iptu.AREA.hasOwnProperty('CONSTRUIDA') ? addItem(
            'Área Construída',
            iptu.AREA.CONSTRUIDA
              ? `${numeral(iptu.AREA.CONSTRUIDA).format()} m²`
              : null,
          ) : '';
        }
        iptu.hasOwnProperty('ANO') ? addItem(
          'Ano de Construção',
          iptu.ANO
            ? numeral(iptu.ANO).format()
            : null,
        ) : '';
        iptu.hasOwnProperty('ANO') ? addItem(
          'Base de Cálculo do IPTU',
          iptu.ANO
            ? numeral(iptu.ANO).format('$0,0.00')
            : null,
        ) : '';
        if (iptu.hasOwnProperty('VALOR')) {
          iptu.VALOR.hasOwnProperty('IPTU') ? addItem(
            'Valor do IPTU',
            iptu.VALOR.IPTU
              ? numeral(iptu.VALOR.IPTU).format('$0,0.00')
              : null,
          ) : '';
          iptu.VALOR.hasOwnProperty('IPTU') ? addItem(
            'Valor do IMÓVEL',
            iptu.VALOR.IPTU
              ? numeral(iptu.VALOR.CONSTRUCAO).format('$0,0.00')
              : null,
          ) : '';
        }
      });

      controller.call('minimizar::categorias', result.element());
    }
  });

  controller.registerCall(
    'icheques::consulta::imoveis',
    (result, doc, imoveisButton) => hasCredits(20000, () => controller.serverCommunication.call(
      "SELECT FROM 'IMOVEIS'.'CONSULTA'",
      controller.call(
        'loader::ajax',
        {
          dataType: 'json',
          data: {
            documento: doc.replace(/[^0-9]/g, ''),
          },
          error: () => {
            toastr.error('Houve um erro ao consultar imóveis. O valor da consulta já foi estornado, por favor, tente mais tarde.')
          },
          success: (data) => {
            controller.call('icheques::consulta::imoveis::generate', data, result, doc, false, false, imoveisButton);
          },
        },
      ),
    )),
  );

  controller.registerCall('icheques::consulta::score::generate', (dataRes, result, doc, alertDisabled = false, firstCallDisabled = false, scoreButton = null) => {
    const data = dataRes;
    if (!data.hasOwnProperty('score')) return;
    const score = data.score[0];

    if (scoreButton != null) scoreButton.remove();

    const addItem = (name, value, after) => value && result.addItem(name, value, undefined, after);
    let firstCall = !firstCallDisabled;
    const separatorElement = result
      .addSeparator(
        'Score Boa Vista',
        'Consulta',
        'Score, explicação do score pela Boa Vista, porcentagem de inadimplência.',
      )
      .addClass('error');
    if (firstCall) {
      $('html, body').animate({
        scrollTop: separatorElement.offset().top,
      },
      2000);
      firstCall = false;
    }
    addItem('Score', score.score);
    addItem('Probabilidade de Inadimplência', score.provavel);
    if (!CNPJ.isValid(doc)) addItem('Classificação', score.classificacao);
    addItem('Análise', score.texto);
    if (!CNPJ.isValid(doc)) addItem('Status', score.status);
    if (CNPJ.isValid(doc)) {
      addItem('Classificação Númerica', score.classificacao_numerica);
      addItem('Classificação Alfabética', score.classificacao_alfabetica);
    }

    controller.call('minimizar::categorias', result.element());
  });

  controller.registerCall('icheques::consulta::score', (result, doc, scoreButton) => hasCredits(CNPJ.isValid(doc) ? 6000 : 3700, () => controller.serverCommunication.call(
    'SELECT FROM \'SPCNet\'.\'ScoreBoaVista\'',
    controller.call(
      'loader::ajax',
      {
        dataType: 'json',
        data: {
          documento: doc.replace(/[^0-9]/g, ''),
        },
        error: () => {
          toastr.error('Houve um erro ao consultar o Score. O valor da consulta já foi estornado, por favor, tente mais tarde.')
        },
        success: (dataRes) => {
          controller.call('icheques::consulta::score::generate', dataRes, result, doc, false, false, scoreButton);
        },
      },
    ),
  )));

  controller.registerCall('icheques::consulta::refin::generate', (data, result, doc, alertDisabled = false, firstCallDisabled = false, refinButton = null) => {
    if (refinButton != null) refinButton.remove();

    let newData;

    try {
      newData = JSON.parse(data);
    } catch (e) {
      newData = data;
    }

    if ($.isEmptyObject(newData)) return;

    let possuiRestricoes = false;

    if (newData.hasOwnProperty('spc')) possuiRestricoes = newData.spc[0].length;

    let firstCall = !firstCallDisabled;
    // eslint-disable-next-line max-len
    const addItem = (name, value, after) => value && result.addItem(name, value, undefined, after);
    if (!possuiRestricoes) {
      const separatorElement = result.addSeparator(
        'Restrições Pefin/Refin Boa Vista',
        'Apontamentos e Restrições Financeiras e Comerciais',
        'Pendências e restrições financeiras no Boa Vista',
      ).addClass('error');

      if (firstCall) {
        $('html, body').animate({
          scrollTop: separatorElement.offset().top,
        },
        2000);
        firstCall = false;
      }

      addItem('Informação', `Para o documento ${CPF.isValid(doc) ? CPF.format(doc) : CNPJ.format(doc)} não foram encontrados registros de restrições.`);

      controller.call('minimizar::categorias', result.element());

      if (!alertDisabled) {
        controller.call('alert', {
          icon: 'pass',
          title: 'Não há Pefin/Refin Boa Vista no Target',
          subtitle: 'O sistema encontrou 0 ocorrências de Pefin/Refin para o documento informado.',
          paragraph: `Para o documento ${
            CPF.isValid(doc) ? CPF.format(doc) : CNPJ.format(doc)
          } não foram encontrados registros de Refin/Pefin.`,
        });
      }

      return;
    }

    const formatter = (new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }));

    newData.spc[0].forEach((spc) => {
      const separatorElement = result
        .addSeparator(
          'Restrição no Refin/Pefin',
          'Apontamentos e Restrições Financeiras e Comerciais',
          'Pendências e restrições financeiras nos bureaus de crédito Refin e Pefin',
        )
        .addClass('error');
        // controller.call('minimizar::categorias', result.element());
      if (firstCall) {
        $('html, body').animate({
          scrollTop: separatorElement.offset().top,
        },
        2000);
        firstCall = false;
      }

      addItem('Associado', spc.NomeAssociado);
      addItem('Valor', `${formatter.format(parseFloat(spc.Valor))}`);
      addItem('Data da Inclusão', spc.DataDeInclusao);
      addItem('Data do Vencimento', spc.DataDoVencimento);
      addItem('Entidade', spc.Entidade);
      addItem('Número do Contrato', spc.NumeroContrato);
      addItem(
        'Comprador, Fiador ou Avalista',
        spc.CompradorFiadorAvalista,
      );
      addItem('Telefone Associado', spc.TelefoneAssociado);
      addItem('Cidade Associado', spc.CidadeAssociado);
      addItem('UF Associado', spc.UfAssociado);
    });

    if (newData.consultaRealizada.length) {
      result.addSeparator(
        'Quem consultou este CPF/CNPJ?',
        'Veja o histórico de Pefin/Refin do Target',
        'No passado um CPF/CNPJ consultou Pefin/Refin neste Target.',
      );

      newData.consultaRealizada.forEach((consultaRealizada) => {
        addItem('Nome Associado', consultaRealizada.NomeAssociado);
        // addItem('CPF/CNPJ', consultaRealizada.CpfCnpj);
        addItem(
          'Data da Consulta',
          consultaRealizada.DataDaConsulta, true,
        );
        // addItem('Cidade Associado', consultaRealizada.CidadeAssociado,);
        // addItem('UF Associado', consultaRealizada.UfAssociado);
      });

      controller.call('minimizar::categorias', result.element());
    }
  });

  controller.registerCall(
    'icheques::consulta::refin',
    (result, doc, refinButton) => {
      const config = {
        cpf: {
          endpointCall: "SELECT FROM 'PROTESTOS'.'REFIN'",
          searchValue: 1200,
        },
        cnpj: {
          endpointCall: "SELECT FROM 'PROTESTOS'.'REFIN'",
          searchValue: 2700,
        },
      };

      const opt = doc.replace(/[^0-9]/g, '').length > 11 ? 'cnpj' : 'cpf';
      const { endpointCall, searchValue } = config[opt];

      hasCredits(searchValue, () => controller.serverCommunication.call(
        endpointCall,
        controller.call(
          'loader::ajax',
          {
            dataType: 'json',
            data: {
              documento: doc.replace(/[^0-9]/g, ''),
            },
            error: () => {
              toastr.error('Houve um erro ao consultar a inadimplência. O valor da consulta já foi estornado, por favor, tente mais tarde.')
            },
            success: (data) => {
              controller.call('icheques::consulta::refin::generate', data, result, doc, false, false, refinButton);
            },
          },
        ),
      ));
    },
  );

  controller.registerCall('icheques::consulta::serasa::generate', (dataRes, result, doc, alertDisabled = false, firstCallDisabled = false, serasaButton = null) => {
    if ($.isEmptyObject(dataRes)) return;
    let data;

    try {
      data = JSON.parse(dataRes);
    } catch (e) {
      data = dataRes;
    }

    const valorTotalPendencias = data.informacoes.hasOwnProperty('valorTotalPendencias') ? data.informacoes.valorTotalPendencias : null;

    try {
      data = data.informacoes[0].bello;
    } catch (e) {
      console.log(e);
    }

    const formatter = (new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }));

    if (serasaButton != null) serasaButton.remove();

    const fieldsCreator = new FieldsCreator();
    const addItem = (name, value) => value && fieldsCreator.addItem(name, value);

    let firstCall = !firstCallDisabled;

    if (!data.length) {
      const separatorElement = result.addSeparator(
        'Restrições Serasa',
        'Apontamentos e Restrições Financeiras e Comerciais',
        'Pendências e restrições financeiras no Serasa',
      ).addClass('error');

      if (firstCall) {
        $('html, body').animate({
          scrollTop: separatorElement.offset().top,
        },
        2000);
        firstCall = false;
      }

      addItem('Informação', `Para o documento ${CPF.isValid(doc) ? CPF.format(doc) : CNPJ.format(doc)} não foram encontrados registros de restrições.`);
      result.element().append(fieldsCreator.element());

      controller.call('minimizar::categorias', result.element());

      if (!alertDisabled) {
        controller.call('alert', {
          icon: 'pass',
          title: 'Não há Restrições Serasa no Target',
          subtitle: 'O sistema encontrou 0 ocorrências de Restrições Serasa para o documento informado.',
          paragraph: `Para o documento ${
            CPF.isValid(doc) ? CPF.format(doc) : CNPJ.format(doc)
          } não foram encontrados registros de restrições.`,
        });
      }
    } else {
      const separatorElement = result.addSeparator(
        'Restrições Serasa',
        'Apontamentos e Restrições Financeiras e Comerciais',
        valorTotalPendencias !== null ? 'O documento possui ' + formatter.format(valorTotalPendencias) + 'em pendências Financeiras' :'Pendências e restrições financeiras no Serasa',
      ).addClass('error');

      data.forEach((ocorrencia) => {
        if (firstCall) {
          $('html, body').animate({
            scrollTop: separatorElement.offset().top,
          },
          2000);
          firstCall = false;
        }

        Object.keys(ocorrencia).forEach((field) => addItem(serasaFields[field], ocorrencia[field] || 'Não Informado'));

        result.element().append(fieldsCreator.element().append($('<hr>')));
        fieldsCreator.resetFields();
      });

      controller.call('minimizar::categorias', result.element());
    }
  });

  controller.registerCall('icheques::consulta::serasa', (result, doc, serasaButton) => hasCredits(3700, () => controller.serverCommunication.call(
    'SELECT FROM \'PROTESTOS\'.\'SERASA\'', {
      dataType: 'json',
      data: {
        documento: doc.replace(/[^0-9]/g, ''),
      },
      success: (dataRes) => {
        controller.call('icheques::consulta::serasa::generate', dataRes, result, doc, false, false, serasaButton);
      },
      error: (err) => {
        toastr.error('Houve um erro ao consultar inadimplência. Tente novamente mais tarde.');
      },
    },
  )));
  controller.registerTrigger(
    'ccbusca::parser',
    'imoveis',
    ({
      result,
      doc,
    }, cb) => {
      if (CNPJ.isValid(doc)) return;
      let imoveisButton = null;
      const consultaImoveisLiberada = systemTags.indexOf('no-imóveis') === -1;
      imoveisButton = $('<button />')
        .text('Consultar Imóveis SP Capital')
        .addClass('button')
        .append(
          $('<small />')
            .text('CPF Somente - R$20')
            .css({
              display: 'block',
              'font-size': '9px',
            }),
        );

      if (consultaImoveisLiberada) {
        imoveisButton.click(
          controller.click(
            'icheques::consulta::imoveis',
            result,
            doc,
            imoveisButton,
          ),
        );
      } else {
        imoveisButton.on('click', (ev) => {
          ev.preventDefault();
          controller.call('blockedOperation', 'imóveis');
        });
      }


      result.addItem().prepend(imoveisButton);
      cb();
    },
  );

  controller.registerTrigger(
    'ccbusca::parser',
    'refin',
    ({
      result,
      doc,
    }, cb) => {
      cb();
      let refinButton = null;
      const consultaRefinBoaVistaLiberada = systemTags.indexOf('no-consulta-pefin-refin-boa-vista') === -1;
      refinButton = $('<button />')
        .text('Consultar Pefin/Refin Boa Vista')
        .addClass('button')
        .append(
          $('<small />')
            .text('CPF R$1,20 / CNPJ R$2,70')
            .css({
              display: 'block',
              'font-size': '9px',
            }),
        );

      if (consultaRefinBoaVistaLiberada) {
        refinButton.click(
          controller.click('icheques::consulta::refin', result, doc, refinButton),
        );
      } else {
        refinButton.on('click', (ev) => {
          ev.preventDefault();
          controller.call('blockedOperation', 'consulta-pefin-refin-boa-vista');
        });
      }

      let serasaButton = null;
      serasaButton = $('<button />')
        .text('Consultar Pefin/Refin Serasa')
        .addClass('button')
        .append(
          $('<small />')
            .text('CPF/CNPJ - R$ 3,70')
            .css({
              display: 'block',
              'font-size': '9px',
            }),
        );

      serasaButton.on('click', ev => {
        ev.preventDefault();
        const modal = controller.call('modal');
        modal.gamification('fail');
        modal.title('Consulta Serasa Indisponível');
        modal.paragraph('Devido às praticas anticompetitivas impostas pela Serasa, o fornecimento de Pefin/Refin Serasa está temporariamente indisponível.  Recomendamos utilizar o Pefin/Refin Boa Vista como substituto até a normalização:');
        const form = modal.createForm();
        const btnRefin = $('<button />')
        .text('Consultar Pefin/Refin Boa Vista')
        .addClass('button')
        .append(
          $('<small />')
            .text('CPF R$1,20 / CNPJ R$2,70')
            .css({
              display: 'block',
              'font-size': '9px',
            }),
        );
        btnRefin.on('click', ev => {
          ev.preventDefault();
          modal.close();
          refinButton.click();
        });
        form.element().append(btnRefin);
        modal.createActions().cancel();
      });

      
      result.addItem().prepend(refinButton);
      result.addItem().prepend(serasaButton);
    },
  );

  controller.registerTrigger(
    'ccbusca::parser',
    'score',
    ({
      result,
      doc,
    }, cb) => {
      cb();
      let scoreButton = null;
      const consultaScoreBoaVistaLiberada = systemTags.indexOf('no-score-boa-vista') === -1;
      scoreButton = $('<button />')
        .text('Consultar Score Boa Vista')
        .addClass('button')
        .append(
          $('<small />')
            .text('CPF R$ 3,00 / CNPJ R$ 6,00')
            .css({
              display: 'block',
              'font-size': '9px',
            }),
        );

      if (consultaScoreBoaVistaLiberada) {
        scoreButton.click(
          controller.click('icheques::consulta::score', result, doc, scoreButton),
        );
      } else {
        scoreButton.on('click', (ev) => {
          ev.preventDefault();
          controller.call('blockedOperation', 'score-boa-vista');
        });
      }
      result.addItem().prepend(scoreButton);
    },
  );

  /*controller.registerTrigger(
    'ccbusca::parser',
    'serasa',
    ({
      result,
      doc,
    }, cb) => {
      cb();
      let serasaButton = null;
      const consultaPefinSerasaLiberada = systemTags.indexOf('no-consulta-pefin-refin-serasa') === -1;
      serasaButton = $('<button />')
        .text('Consultar Pefin/Refin Serasa')
        .addClass('button')
        .append(
          $('<small />')
            .text('CPF/CNPJ - R$ 3,70')
            .css({
              display: 'block',
              'font-size': '9px',
            }),
        );

      if (consultaPefinSerasaLiberada) {
        serasaButton.click(
          controller.click('icheques::consulta::serasa', result, doc, serasaButton),
        );
      } else {
        serasaButton.on('click', (ev) => {
          ev.preventDefault();
          controller.call('blockedOperation', 'consulta-pefin-refin-serasa');
        });
      }
      result.addItem().prepend(serasaButton);
    },
  );*/
});
