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
            toastr.error('Houve um erro ao consultar imóveis. O valor da consulta já foi estornado, por favor, tente mais tarde.');
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
    addItem('Score', parseInt(score.score));
    addItem('Probabilidade de Inadimplência', score.provavel);
    if (!CNPJ.isValid(doc)) addItem('Classificação', score.classificacao);
    addItem('Análise', score.texto);
    if (!CNPJ.isValid(doc)) addItem('Status', score.status);
    if (CNPJ.isValid(doc)) {
      addItem('Classificação Númerica', score.classificacao_numerica);
      addItem('Classificação Alfabética', score.classificacao_alfabetica);
    }
    const dataScore = [{
      name: 'Score Boa Vista',
      value: parseInt(score.score),
    }];

    if (CNPJ.isValid()) {
      dataScore.push({
        name: 'Classificação Númerica',
        value: score.classificacao_numerica,
      }, {
        name: 'Classificação Alfabética',
        value: score.classificacao_alfabetica,
      });
    } else {
      dataScore.push({
        name: 'Classificação',
        value: score.classificacao,
      });
    }

    const fields = dataScore.map((info) => {
      const field = $('<div>').addClass('field');
      const name = $('<div>').addClass('name').text(info.name);
      const value = $('<div>').addClass('value').text(info.value);

      return field.append(value, name);
    });

    const contentResumo = result.element().parent().find('.separator.resumo_negativacoes').next();

    const addContent = () => {
      const contentDiv = $('<div>').addClass('content');
      $('<div>').addClass('separator').css('display', 'none').insertAfter(contentResumo);
      $('<div>').addClass('container').append(contentDiv).insertAfter(contentResumo);

      return contentDiv;
    };

    const contentResumo2 = contentResumo.next().next().length ? contentResumo.next().next().find('.content') : addContent();
    const contentResumo3 = contentResumo2.next().next().length ? contentResumo2.next().next().find('.content') : addContent();

    if (CNPJ.isValid()) {
      contentResumo.find('.content').append(fields[0]);
      contentResumo2.append(fields[1]);
      contentResumo3.append(fields[2]);
    } else {
      contentResumo.find('.content').append(fields[0]);
      contentResumo2.append(fields[1]);
    }
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
          toastr.error('Houve um erro ao consultar o Score. O valor da consulta já foi estornado, por favor, tente mais tarde.');
        },
        success: (dataRes) => {
          controller.call('icheques::consulta::score::generate', dataRes, result, doc, false, false, scoreButton);
        },
      },
    ),
  )));

  controller.registerCall('icheques::consulta::refin::generate', (data, result, doc, alertDisabled = false, firstCallDisabled = false, refinButton = null, jdocument) => {
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

    const resumoNegativacoes = result.element().parent().find('.resumo_negativacoes');

    let firstCall = !firstCallDisabled;
    // eslint-disable-next-line max-len
    const addItem = (name, value, after) => value && result.addItem(name, value, undefined, after).parent().addClass('container-boa-vista').css({ paddingTop: 0, paddingBottom: 0 });
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

    let firstPefinRefin = true;
    newData.spc[0].forEach((spc) => {
      const separatorElement = result
        .addSeparator(
          'Restrições Pefin/Refin Boa Vista',
          'Apontamentos e Restrições Financeiras e Comerciais',
          'Pendências e restrições financeiras nos bureaus de crédito Refin e Pefin',
        )
        .addClass('error');
      if (!firstPefinRefin) separatorElement.hide().find('.container').remove();
      if (firstPefinRefin) firstPefinRefin = false;
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

    if (resumoNegativacoes.length) {
      result.element().parent().find('.result:contains(Resumo de Negativações)').remove();
      controller.call('grafico::analitico', result.element().parent(), doc, jdocument, true);
    }

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
    }
  });

  controller.registerCall(
    'icheques::consulta::refin',
    (result, doc, refinButton, jdocument) => {
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
              toastr.error('Houve um erro ao consultar PEFIN/REFIN Boa Vista, o valor da consulta foi estornado. Por favor, tente mais tarde.');
            },
            success: (data) => {
              controller.call('icheques::consulta::refin::generate', data, result, doc, false, false, refinButton, jdocument);
            },
          },
        ),
      ));
    },
  );

  const valorTotalDeDividas = (dividas) => {
    if (!dividas.length) return null;

    return dividas.map((divida) => Number.parseFloat(divida.valor.replace(',', '.'))).reduce((acc, cur) => acc + cur);
  };

  controller.registerCall('icheques::consulta::serasa::generate', (dataRes, result, doc, alertDisabled = false, firstCallDisabled = false, serasaButton = null, jdocument) => {
    if ($.isEmptyObject(dataRes)) return;
    let data;

    try {
      data = JSON.parse(dataRes);
    } catch (e) {
      data = dataRes;
    }

    try {
      data = data.informacoes[0].bello;
    } catch (e) {
      console.log(e);
    }

    const formatter = (new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }));

    const valorTotalPendenciasFinanceiras = valorTotalDeDividas(data);

    if (serasaButton != null) serasaButton.remove();

    const fieldsCreator = new FieldsCreator();
    const addItem = (name, value) => value && fieldsCreator.addItem(name, value);

    let firstCall = !firstCallDisabled;
    const resumoNegativacoes = result.element().parent().find('.resumo_negativacoes');
    if (!data.length) {
      const separatorElement = result.addSeparator(
        'Restrições Serasa',
        'Apontamentos e Restrições Financeiras e Comerciais',
        'Pendências e restrições financeiras no Serasa',
      ).addClass('error');

      controller.call('resize', [separatorElement]);

      if (firstCall) {
        $('html, body').animate({
          scrollTop: separatorElement.offset().top,
        },
        2000);
        firstCall = false;
      }

      addItem('Informação', `Para o documento ${CPF.isValid(doc) ? CPF.format(doc) : CNPJ.format(doc)} não foram encontrados registros de restrições.`);
      result.element().append(fieldsCreator.element());

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
        valorTotalPendenciasFinanceiras !== null ? `O documento possui ${formatter.format(valorTotalPendenciasFinanceiras)}em pendências Financeiras` : 'Pendências e restrições financeiras no Serasa',
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

      if (resumoNegativacoes.length) {
        result.element().parent().find('.result:contains(Resumo de Negativações)').remove();
        controller.call('grafico::analitico', result.element().parent(), doc, jdocument, true);
      }
    }
  });

  controller.registerCall('icheques::consulta::serasa', (result, doc, serasaButton, jdocument) => hasCredits(4000, () => controller.serverCommunication.call(
    'SELECT FROM \'PROTESTOS\'.\'SERASA\'',
    controller.call('loader::ajax', {
      dataType: 'json',
      data: {
        documento: doc.replace(/[^0-9]/g, ''),
      },
      success: (dataRes) => {
        controller.call('icheques::consulta::serasa::generate', dataRes, result, doc, false, false, serasaButton, jdocument);
      },
      error: (err) => {
        toastr.error('Houve um erro ao consultar inadimplência. Tente novamente mais tarde.');
      },
    }),
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
      jdocument,
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
          controller.click('icheques::consulta::refin', result, doc, refinButton, jdocument),
        );
      } else {
        refinButton.on('click', (ev) => {
          ev.preventDefault();
          controller.call('blockedOperation', 'consulta-pefin-refin-boa-vista');
        });
      }

      result.addItem().prepend(refinButton);
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

  controller.registerTrigger(
    'ccbusca::parser',
    'serasa',
    ({
      result,
      doc,
      jdocument,
    }, cb) => {
      cb();
      let serasaButton = null;
      const consultaPefinSerasaLiberada = systemTags.indexOf('no-consulta-pefin-refin-serasa') === -1;
      serasaButton = $('<button />')
        .text('Consultar Pefin/Refin Serasa')
        .addClass('button')
        .append(
          $('<small />')
            .text('CPF/CNPJ - R$ 4')
            .css({
              display: 'block',
              'font-size': '9px',
            }),
        );

      result.addItem().prepend(serasaButton);

      controller.serverCommunication.call("SELECT FROM 'SubAccount'.'IsSubAccountAndHavePermissionPefinRefin'", { dataType: 'json' }).then((isSubAccountAndHavePermission) => {
        if (isSubAccountAndHavePermission && consultaPefinSerasaLiberada) {
          serasaButton.click(
            controller.click('icheques::consulta::serasa', result, doc, serasaButton, jdocument),
          );
        } else if (consultaPefinSerasaLiberada && (systemTags.join().match(/(flex|ouro|prata|diamante)/) != null)) {
          serasaButton.click(
            controller.click('icheques::consulta::serasa', result, doc, serasaButton, jdocument),
          );
        } else {
          serasaButton.on('click', (ev) => {
            ev.preventDefault();
            if (systemTags.join().match(/(flex|ouro|prata|diamante)/) === null) {
              return controller.call('alert', {
                title: 'Infelizmente voce não tem permissão para isso!',
                subtitle: 'Para realizar essa consulta é necessário que você esteja no plano flex, prata, ouro ou diamante.',
              });
            }
            controller.call('blockedOperation', 'consulta-pefin-refin-serasa');
          });
        }
      }, (err) => {
        if (consultaPefinSerasaLiberada && (systemTags.join().match(/(flex|ouro|prata|diamante)/) != null)) {
          serasaButton.click(
            controller.click('icheques::consulta::serasa', result, doc, serasaButton, jdocument),
          );
        } else {
          serasaButton.on('click', (ev) => {
            ev.preventDefault();
            if (systemTags.join().match(/(flex|ouro|prata|diamante)/) === null) {
              return controller.call('alert', {
                title: 'Infelizmente voce não tem permissão para isso!',
                subtitle: 'Para realizar essa consulta é necessário que você esteja no plano flex, prata, ouro ou diamante.',
              });
            }
            controller.call('blockedOperation', 'consulta-pefin-refin-serasa');
          });
        }
      });
    },
  );
});
