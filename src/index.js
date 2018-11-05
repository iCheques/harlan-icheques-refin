import harlan from 'harlan';
import $ from 'jquery';
import { CPF, CNPJ } from 'cpf_cnpj';

harlan.addPlugin((controller) => {
  controller.registerCall('icheques::consulta::refin', (result, doc, refinButton) => controller.call('credits::has', 2500, () => controller.server.call('USING \'REFIN\' SELECT FROM \'PROTESTOS\'.\'REFINALTERNATIVE\'',
    controller.call('loader::ajax', controller.call('error::ajax',
      {
        dataType: 'json',
        data: {
          documento: doc.replace(/[^0-9]/g, ''),
        },

        success: (data) => {
          refinButton.remove();

          let firstCall = true;
          const addItem = (name, value) => value && result.addItem(name, value);

          if (!data.spc.length) {
            controller.call('alert', {
              icon: 'pass',
              title: 'Não foram encontrados registros de Refin/Pefin',
              subtitle: 'O sistema não encontrou nenhum registro de Refin/Pefin para o documento informado.',
              paragraph: `Para o documento ${CPF.isValid(doc) ? CPF.format(doc) : CNPJ.format(doc)} não foram encontrados registros de Refin/Pefin.`,
            });
          }

          data.spc.forEach((spc) => {
            const separatorElement = result.addSeparator('Restrição no Refin/Pefin',
              'Apontamentos e Restrições Financeiras e Comerciais',
              'Pendências e restrições financeiras nos bureaus de crédito Refin e Pefin')
              .addClass('error');
            if (firstCall) {
              $('html, body').animate({
                scrollTop: separatorElement.offset().top,
              }, 2000);
              firstCall = false;
            }

            addItem('Associado', spc.NomeAssociado);
            addItem('Valor', `R$ ${spc.Valor}`);
            addItem('Data da Inclusão', spc.DataDeInclusao);
            addItem('Data do Vencimento', spc.DataDoVencimento);
            addItem('Entidade', spc.Entidade);
            addItem('Número do Contrato', spc.NumeroContrato);
            addItem('Comprador, Fiador ou Avalista', spc.CompradorFiadorAvalista);
            addItem('Telefone Associado', spc.TelefoneAssociado);
            addItem('Cidade Associado', spc.CidadeAssociado);
            addItem('UF Associado', spc.UfAssociado);
          });

          if (data.consultaRealizada.length) {
            result.addSeparator('Consulta Realizada por Associado do Refin e Pefin',
              'Consulta Realizada por Associado do Refin/Pefin',
              'Um associado do Refin/Pefin consultou este CNPJ/CPF a procura de apontamentos e restrições financeiras e comerciais');

            data.consultaRealizada.forEach((consultaRealizada) => {
              addItem('Nome Associado', consultaRealizada.NomeAssociado);
              addItem('CPF/CNPJ', consultaRealizada.CpfCnpj);
              addItem('Data da Consulta', consultaRealizada.DataDaConsulta);
              addItem('Cidade Associado', consultaRealizada.CidadeAssociado);
              addItem('UF Associado', consultaRealizada.UfAssociado);
            });
          }
        },
      })))));

  controller.registerTrigger('ccbusca::parser', 'refin', ({ result, doc }, cb) => {
    let refinButton = null;
    refinButton = $('<button />')
      .text('Consultar Refin')
      .addClass('button');

    refinButton.click(controller.click('icheques::consulta::refin', result, doc, refinButton));
    result.addItem().prepend(refinButton);
    cb();
  });
});
