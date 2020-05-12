import harlan from 'harlan';
import $ from 'jquery';
import get from 'lodash/get';
import numeral from 'numeral';
import {
  CPF,
  CNPJ,
} from 'cpf_cnpj';

harlan.addPlugin((controller) => {
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

  controller.registerCall(
    'icheques::consulta::imoveis',
    (result, doc, imoveisButton) => hasCredits(20000, () => controller.server.call(
      "SELECT FROM 'IMOVEIS'.'CONSULTA'",
      controller.call(
        'loader::ajax',
        controller.call('error::ajax', {
          dataType: 'json',
          data: {
            documento: doc.replace(/[^0-9]/g, ''),
          },

          success: (data) => {
            const fieldset = imoveisButton.parent();
            imoveisButton.remove();

            let firstCall = true;
            const addItem = (name, value) => (value ? result.addItem(name, value) : null);
            const objectData = JSON.parse(data);
            if (objectData.hasOwnProperty('LGPD')) {
              const separatorElement = result
                .addSeparator(
                  'Bloqueio devido a LGPD 2020',
                  'Infelizmente o documento consultado nos pediu para bloquear suas informações de imóveis de acordo à LGPD 2020.',
                  `Não se preocupe, estornamos valor e você não foi cobrado(a) pela consulta do cpf: ${
                    CPF.isValid(doc) ? CPF.format(doc) : CNPJ.format(doc)
                  }.`,
                )
                .addClass('error');
              if (firstCall) {
                $('html, body').animate({
                  scrollTop: separatorElement.offset().top,
                },
                2000);
                firstCall = false;
              }
            }
            const iptus = objectData.IPTUS;

            const r = (d) => (d ? d.insertBefore(fieldset) : null);

            r(addItem('Score', get(data, 'SCORE')));
            r(
              addItem(
                'Título de Eleitor',
                get(data, 'DADOS_CADASTRAIS.TITULO_ELEITOR'),
              ),
            );
            r(
              addItem(
                'Salário Presumido',
                get(data, 'DADOS_CADASTRAIS.RENDA_PRESUMIDA'),
              ),
            );
            r(addItem('Aposentadoria', get(data, 'DADOS_CADASTRAIS.RENDA_BENEFICIO')));
            r(addItem('Classe Social', get(data, 'DADOS_CADASTRAIS.CLASSE_SOCIAL')));

            imoveisButton.remove();

            if (iptus.length === 0) {
              /*controller.call('alert', {
                title: 'Não foram encontrados registros de IPTU',
                subtitle:
                      'O sistema não encontrou nenhum registro de IPTU para o documento informado.',
                paragraph: `Para o documento ${
                  CPF.isValid(doc) ? CPF.format(doc) : CNPJ.format(doc)
                } não foram encontrados registros de IPTU.`,
              });*/
              const separatorElement = result
                .addSeparator(
                  'Não foram encontrados registros de IPTU',
                  'O sistema não encontrou nenhum registro de IPTU para o documento informado.',
                  `Para o documento ${
                    CPF.isValid(doc) ? CPF.format(doc) : CNPJ.format(doc)
                  } não foram encontrados registros de IPTU.`,
                )
                .addClass('error');
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

                // addItem('Procolo', iptu.Protocolo);
                // addItem('Setor, Quadra ou Lote', iptu.SetorQuadraLote);
                // addItem('Dia do Vencimento', iptu.DiaVencimento);
                /* addItem(
                  'Data da Consulta do Proprietario',
                  iptu.DataConsultaProprietario,
                ); */
                // addItem('Situação', iptu.Situacao);
                // addItem('Setor', iptu.Setor);
                iptu.COMPLEMENTO.CONJUNTO.length > 0 ? addItem('Conjunto', iptu.COMPLEMENTO.CONJUNTO) : "";
                iptu.COMPLEMENTO.QUADRA.length > 0 ? addItem('Quadra', iptu.COMPLEMENTO.QUADRA) : "";
                iptu.COMPLEMENTO.LOTE.length > 0 ? addItem('Lote', iptu.COMPLEMENTO.LOTE) : "";
                addItem('Endereço', iptu.ENDERECO);
                addItem('Número', iptu.NUMERO);
                addItem('Bairro', iptu.BAIRRO);
                addItem('CEP', iptu.CEP);
                // addItem('Código', iptu.CodLog);
                addItem(
                  'Área do Terreno',
                  iptu.AREA.TOTAL ?
                    `${numeral(iptu.AREA.TOTAL).format()} m²` :
                    null,
                );
                /* addItem(
                  'Área do Testada',
                  iptu.Testada ? `${numeral(iptu.Testada).format()} m²` : null,
                ); */
                // addItem('Fração Ideal', iptu.FracaoIdeal);
                addItem(
                  'Área Construída',
                  iptu.AREA.CONSTRUIDA ?
                    `${numeral(iptu.AREA.CONSTRUIDA).format()} m²` :
                    null,
                );
                addItem(
                  'Ano de Construção',
                  iptu.ANO ?
                    numeral(iptu.ANO).format() :
                    null,
                );
                addItem(
                  'Base de Cálculo do IPTU',
                  iptu.ANO ?
                    numeral(iptu.ANO).format('$0,0.00') :
                    null,
                );
                addItem(
                  'Valor do IPTU',
                  iptu.VALOR.IPTU ?
                    numeral(iptu.VALOR.IPTU).format('$0,0.00') :
                    null,
                );
                addItem(
                  'Valor do IMÓVEL',
                  iptu.VALOR.IPTU ?
                    numeral(iptu.VALOR.CONSTRUCAO).format('$0,0.00') :
                    null,
                );
                /* addItem(
                  'Data de Consulta do Cadastro',
                  iptu.DataConsultaCadastro,
                ); */
              });
            }
          },
        }),
      ),
    )),
  );

  controller.registerCall('icheques::consulta::score', (result, doc, scoreButton) => hasCredits(3000, () => controller.serverCommunication.call(
    'SELECT FROM \'SPCNet\'.\'ScoreBoaVista\'',
    controller.call(
      'loader::ajax',
      controller.call('error::ajax', {
        dataType: 'json',
        data: {
          documento: doc.replace(/[^0-9]/g, ''),
        },
        success: (dataRes) => {
          const data = JSON.parse(dataRes);
          const score = data.score[0];
          scoreButton.remove();
          const addItem = (name, value, after) => value && result.addItem(name, value, undefined, after);
          let firstCall = true;
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
          addItem('Classificação', score.classificacao);
          addItem('Análise', score.texto);
          addItem('Status', score.status);
        },
      }),
    ),
  )));

  controller.registerCall(
    'icheques::consulta::refin',
    (result, doc, refinButton) => {
      const config = {
        cpf: {
          endpointCall: "USING 'SCPCNET' SELECT FROM 'PROTESTOS'.'SCPCNET'",
          searchValue: 1200,
        },
        cnpj: {
          endpointCall: "SELECT FROM 'PROTESTOS'.'Refin'",
          searchValue: 2700,
        },
      };

      const opt = doc.replace(/[^0-9]/g, '').length > 11 ? 'cnpj' : 'cpf';
      const { endpointCall, searchValue } = config[opt];

      hasCredits(searchValue, () => controller.server.call(
        endpointCall,
        controller.call(
          'loader::ajax',
          controller.call('error::ajax', {
            dataType: 'json',
            data: {
              documento: doc.replace(/[^0-9]/g, ''),
            },

            success: (data) => {
              refinButton.remove();

              let firstCall = true;
              // eslint-disable-next-line max-len
              const addItem = (name, value, after) => value && result.addItem(name, value, undefined, after);
              if (!data.spc.length) {
                controller.call('alert', {
                  icon: 'pass',
                  title: 'Não há Pefin/Refin Boa Vista no Target',
                  subtitle: 'O sistema encontrou 0 ocorrências de Pefin/Refin para o documento informado.',
                  paragraph: `Para o documento ${
                    CPF.isValid(doc) ? CPF.format(doc) : CNPJ.format(doc)
                  } não foram encontrados registros de Refin/Pefin.`,
                });
              }

              data.spc.forEach((spc) => {
                const separatorElement = result
                  .addSeparator(
                    'Restrição no Refin/Pefin',
                    'Apontamentos e Restrições Financeiras e Comerciais',
                    'Pendências e restrições financeiras nos bureaus de crédito Refin e Pefin',
                  )
                  .addClass('error');
                if (firstCall) {
                  $('html, body').animate({
                    scrollTop: separatorElement.offset().top,
                  },
                  2000);
                  firstCall = false;
                }

                addItem('Associado', spc.NomeAssociado);
                addItem('Valor', `R$ ${spc.Valor}`);
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

              if (data.consultaRealizada.length) {
                result.addSeparator(
                  'Quem consultou este CPF/CNPJ?',
                  'Veja o histórico de Pefin/Refin do Target',
                  'No passado um CPF/CNPJ consultou Pefin/Refin neste Target.',
                );

                data.consultaRealizada.forEach((consultaRealizada) => {
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
            },
          }),
        ),
      ));
    },
  );

  controller.registerTrigger(
    'ccbusca::parser',
    'imoveis',
    ({
      result,
      doc,
    }, cb) => {
      if (CNPJ.isValid(doc)) return;
      let imoveisButton = null;
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

      imoveisButton.click(
        controller.click(
          'icheques::consulta::imoveis',
          result,
          doc,
          imoveisButton,
        ),
      );
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

      refinButton.click(
        controller.click('icheques::consulta::refin', result, doc, refinButton),
      );
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
      if (CNPJ.isValid(doc)) return;
      cb();
      let scoreButton = null;
      scoreButton = $('<button />')
        .text('Consultar Score Boa Vista')
        .addClass('button')
        .append(
          $('<small />')
            .text('CPF Somente - R$ 3,00')
            .css({
              display: 'block',
              'font-size': '9px',
            }),
        );

      scoreButton.click(
        controller.click('icheques::consulta::score', result, doc, scoreButton),
      );
      result.addItem().prepend(scoreButton);
    },
  );
});
