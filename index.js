(function (harlan,$) {
  'use strict';

  harlan = harlan && harlan.hasOwnProperty('default') ? harlan['default'] : harlan;
  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  harlan.addPlugin(function (controller) {
    controller.registerCall('icheques::consulta::refin', function (result, doc) { return controller.call('credits::has', 250, function () { return controller.server.call('SELECT FROM \'PROTESTOS\'.\'REFIN\'', {
      dataType: 'json',
      data: {
        documento: doc.replace(/[^0-9]/g, ''),
      },

      success: function (data) {
        var addItem = function (name, value) { return value && result.addItem(name, value); };

        data.spc.forEach(function (spc) {
          result.addSeparator('Consulta ao SPC/Serasa',
            'Apontamentos e Restrições Financeiras e Comerciais',
            'Pendências e restrições financeiras nos bureaus de crédito Serasa e SPC');
          addItem('Associado', spc.NomeAssociado);
          addItem('Valor', spc.Valor);
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
          result.addSeparator('Consulta Realizada por Associado do SPC/Serasa',
            'Consulta Realizada por Associado do SPC/Serasa',
            'Um associado do SPC/Serasa consultou este CNPJ/CPF a procura de apontamentos e restrições financeiras e comerciais');

          data.consultaRealizada.forEach(function (consultaRealizada) {
            addItem('Nome Associado', consultaRealizada.NomeAssociado);
            addItem('CPF/CNPJ', consultaRealizada.CpfCnpj);
            addItem('Data da Consulta', consultaRealizada.DataDaConsulta);
            addItem('Cidade Associado', consultaRealizada.CidadeAssociado);
            addItem('UF Associado', consultaRealizada.UfAssociado);
          });
        }
      },
    }); }); });

    controller.registerTrigger('ccbusca::parser', 'refin', function (ref, cb) {
      var result = ref.result;
      var doc = ref.doc;

      var refinButton = $('<button />')
        .text('Consultar Refin')
        .addClass('button')
        .click(controller.click('icheques::consulta::refin', result, doc));
      result.addItem().prepend(refinButton);
      cb();
    });
  });

}(harlan,$));
