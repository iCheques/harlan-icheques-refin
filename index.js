!function(c,h,l){"use strict";function e(e,t){return e(t={exports:{}},t.exports),t.exports}c=c&&Object.prototype.hasOwnProperty.call(c,"default")?c.default:c,h=h&&Object.prototype.hasOwnProperty.call(h,"default")?h.default:h,l=l&&Object.prototype.hasOwnProperty.call(l,"default")?l.default:l;var t="object"==typeof(R="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{})&&R&&R.Object===Object&&R,a="object"==typeof self&&self&&self.Object===Object&&self,n=t||a||Function("return this")(),o=n.Symbol,r=(E=Object.prototype).hasOwnProperty,i=E.toString,s=o?o.toStringTag:void 0,u=function(e){var t=r.call(e,s),a=e[s];try{var n=!(e[s]=void 0)}catch(e){}var o=i.call(e);return n&&(t?e[s]=a:delete e[s]),o},d=Object.prototype.toString,f=function(e){return d.call(e)},p=o?o.toStringTag:void 0,m=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":(p&&p in Object(e)?u:f)(e)},v=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)},O=function(e){return!!v(e)&&("[object Function]"==(e=m(e))||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e)},C=n["__core-js_shared__"],g=(I=/[^.]+$/.exec(C&&C.keys&&C.keys.IE_PROTO||""))?"Symbol(src)_1."+I:"",y=function(e){return!!g&&g in e},P=Function.prototype.toString,b=function(e){if(null!=e){try{return P.call(e)}catch(e){}try{return e+""}catch(e){}}return""},T=/^\[object .+?Constructor\]$/,R=Function.prototype,t=Object.prototype,a=R.toString,E=t.hasOwnProperty,_=RegExp("^"+a.call(E).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),A=function(e){return!(!v(e)||y(e))&&(O(e)?_:T).test(b(e))},S=function(e,t){return null==e?void 0:e[t]},N=(C=function(e,t){return t=S(e,t),A(t)?t:void 0})(Object,"create"),I=function(){this.__data__=N?N(null):{},this.size=0},R=function(e){return e=this.has(e)&&delete this.__data__[e],this.size-=e?1:0,e},j=Object.prototype.hasOwnProperty,t=function(e){var t=this.__data__;if(N){var a=t[e];return"__lodash_hash_undefined__"===a?void 0:a}return j.call(t,e)?t[e]:void 0},x=Object.prototype.hasOwnProperty;function V(e){var t=-1,a=null==e?0:e.length;for(this.clear();++t<a;){var n=e[t];this.set(n[0],n[1])}}a=function(e){var t=this.__data__;return N?void 0!==t[e]:x.call(t,e)},E=function(e,t){var a=this.__data__;return this.size+=this.has(e)?0:1,a[e]=N&&void 0===t?"__lodash_hash_undefined__":t,this},V.prototype.clear=I,V.prototype.delete=R,V.prototype.get=t,V.prototype.has=a,V.prototype.set=E;var w=V;I=function(){this.__data__=[],this.size=0};var F=function(e,t){return e===t||e!=e&&t!=t},L=function(e,t){for(var a=e.length;a--;)if(F(e[a][0],t))return a;return-1},M=Array.prototype.splice;function U(e){var t=-1,a=null==e?0:e.length;for(this.clear();++t<a;){var n=e[t];this.set(n[0],n[1])}}R=function(e){var t=this.__data__;return!((e=L(t,e))<0)&&(e==t.length-1?t.pop():M.call(t,e,1),--this.size,!0)},t=function(e){var t=this.__data__;return(e=L(t,e))<0?void 0:t[e][1]},a=function(e){return-1<L(this.__data__,e)},E=function(e,t){var a=this.__data__,n=L(a,e);return n<0?(++this.size,a.push([e,t])):a[n][1]=t,this},U.prototype.clear=I,U.prototype.delete=R,U.prototype.get=t,U.prototype.has=a,U.prototype.set=E;var k=U,z=C(n,"Map"),D=function(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e},B=function(e,t){return e=e.__data__,D(t)?e["string"==typeof t?"string":"hash"]:e.map};function q(e){var t=-1,a=null==e?0:e.length;for(this.clear();++t<a;){var n=e[t];this.set(n[0],n[1])}}a=function(e){return e=B(this,e).delete(e),this.size-=e?1:0,e},E=function(e){return B(this,e).get(e)},C=function(e){return B(this,e).has(e)},n=function(e,t){var a=B(this,e),n=a.size;return a.set(e,t),this.size+=a.size==n?0:1,this},q.prototype.clear=function(){this.size=0,this.__data__={hash:new w,map:new(z||k),string:new w}},q.prototype.delete=a,q.prototype.get=E,q.prototype.has=C,q.prototype.set=n;var J=q,H="Expected a function";function Q(n,o){if("function"!=typeof n||null!=o&&"function"!=typeof o)throw new TypeError(H);var r=function(){var e=arguments,t=o?o.apply(this,e):e[0],a=r.cache;if(a.has(t))return a.get(t);e=n.apply(this,e);return r.cache=a.set(t,e)||a,e};return r.cache=new(Q.Cache||J),r}Q.Cache=J;var G=Q;function W(){this.content=$("<div>").addClass("content serasa"),this.container=$("<div>").addClass("container").append(this.content)}var Y=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,K=/\\(\\)?/g,X=(o=((o=(function(e){var t=(e=G(e,function(e){return 500===t.size&&t.clear(),e})).cache}(function(e){var o=[];return 46===e.charCodeAt(0)&&o.push(""),e.replace(Y,function(e,t,a,n){o.push(a?n.replace(K,"$1"):t||e)}),o}),o?o.prototype:void 0))&&o.toString,{CPF:e(function(e,t){function n(e){var a=(e=e.split("").map(function(e){return parseInt(e,10)})).length+1;return(e=e.map(function(e,t){return e*(a-t)}).reduce(function(e,t){return e+t})%11)<2?0:11-e}var a,o,r,i;a=["00000000000","11111111111","22222222222","33333333333","44444444444","55555555555","66666666666","77777777777","88888888888","99999999999","12345678909"],o=/[.-]/g,r=/[^\d]/g,i={format:function(e){return this.strip(e).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/,"$1.$2.$3-$4")},strip:function(e,t){t=t?o:r;return(e||"").toString().replace(t,"")},isValid:function(e,t){e=this.strip(e,t);if(!e)return!1;if(11!==e.length)return!1;if(0<=a.indexOf(e))return!1;t=e.substr(0,9);return t+=n(t),(t+=n(t)).substr(-2)===e.substr(-2)},generate:function(e){for(var t="",a=0;a<9;a++)t+=Math.floor(9*Math.random());return t+=n(t),t+=n(t),e?this.format(t):t}},e.exports=i}),CNPJ:e(function(e,t){function n(e){var a=2;return(e=e.split("").reduce(function(e,t){return[parseInt(t,10)].concat(e)},[]).reduce(function(e,t){return e+=t*a,a=9===a?2:a+1,e},0)%11)<2?0:11-e}var a,o,r,i;a=["00000000000000","11111111111111","22222222222222","33333333333333","44444444444444","55555555555555","66666666666666","77777777777777","88888888888888","99999999999999"],o=/[-\/.]/g,r=/[^\d]/g,i={format:function(e){return this.strip(e).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,"$1.$2.$3/$4-$5")},strip:function(e,t){t=t?o:r;return(e||"").toString().replace(t,"")},isValid:function(e,t){e=this.strip(e,t);if(!e)return!1;if(14!==e.length)return!1;if(0<=a.indexOf(e))return!1;t=e.substr(0,12);return t+=n(t),(t+=n(t)).substr(-2)===e.substr(-2)},generate:function(e){for(var t="",a=0;a<12;a++)t+=Math.floor(9*Math.random());return t+=n(t),t+=n(t),e?this.format(t):t}},e.exports=i})})).CPF,Z=o.CNPJ,ee={ocorrencia:"Tipo de Ocorrência",entrada:"Data de Entrada",vencimento:"Data de Vencimento",valor:"Valor",informante:"Informante",contrato:"Número de Contrato",avalista:"Avalista",cidade:"Cidade",uf:"UF",situacao:"Situação",orgaoemissor:"Orgão Emissor",totalpendencias:"Total de Pendências",totalcredores:"Total de Credores",totalvalor:"Valor Total",categoria:"Categoria"};W.prototype.addItem=function(e,t){var a=$("<div>").addClass("field"),n=$("<div>").addClass("name").css({fontSize:"10px",fontWeight:"bold"}),o=$("<div>").addClass("value");a.append(n.text(e),o.text(t)),this.content.append(a)},W.prototype.element=function(){return this.container},W.prototype.resetFields=function(){this.content=$("<div>").addClass("content serasa"),this.container=$("<div>").addClass("container").append(this.content)},c.addPlugin(function(m){function i(t,a){return m.server.call("SELECT FROM 'ICHEQUES'.'IPAYTHEBILL'",m.call("loader::ajax",{dataType:"json",success:function(e){e?m.call("credits::has",t,function(){a()}):a()}}))}var s=(m.confs.user||{}).tags||[];m.registerCall("icheques::consulta::imoveis::generate",function(e,a,t,n,o,r){void 0===o&&(o=!1),void 0===r&&(r=null),h.isEmptyObject(r)||(r.parent(),r.remove());function i(e,t){return t?a.addItem(e,t):null}var s=!o,e=JSON.parse(e);h.isEmptyObject(e)||(void 0===(e=e.IPTUS)||0===e.length?(t=a.addSeparator("Não foram encontrados registros de IPTU","O sistema não encontrou nenhum registro de IPTU para o documento informado.","Para o documento "+(X.isValid(t)?X:Z).format(t)+" não foram encontrados registros de IPTU.").addClass("error"),m.call("minimizar::categorias",a.element()),s&&(h("html, body").animate({scrollTop:t.offset().top},2e3),s=!1)):(e.forEach(function(e){var t=a.addSeparator("Registro de IPTU no Nome","Apontamentos de IPTU para o documento informado","Imposto Predial e Territorial Urbano sendo cobrado para o documento").addClass("error");s&&(h("html, body").animate({scrollTop:t.offset().top},2e3),s=!1),e.hasOwnProperty("COMPLEMENTO")&&(e.COMPLEMENTO.hasOwnProperty("CONJUNTO")&&i("Conjunto",e.COMPLEMENTO.CONJUNTO),e.COMPLEMENTO.hasOwnProperty("QUADRA")&&i("Quadra",e.COMPLEMENTO.QUADRA),e.COMPLEMENTO.hasOwnProperty("LOTE")&&i("Lote",e.COMPLEMENTO.LOTE)),e.hasOwnProperty("ENDERECO")&&i("Endereço",e.ENDERECO),e.hasOwnProperty("NUMERO")&&i("Número",e.NUMERO),e.hasOwnProperty("BAIRRO")&&i("Bairro",e.BAIRRO),e.hasOwnProperty("CEP")&&i("CEP",e.CEP),e.hasOwnProperty("AREA")&&(e.AREA.hasOwnProperty("TOTAL")&&i("Área do Terreno",e.AREA.TOTAL?l(e.AREA.TOTAL).format()+" m²":null),e.AREA.hasOwnProperty("CONSTRUIDA")&&i("Área Construída",e.AREA.CONSTRUIDA?l(e.AREA.CONSTRUIDA).format()+" m²":null)),e.hasOwnProperty("ANO")&&i("Ano de Construção",e.ANO?l(e.ANO).format():null),e.hasOwnProperty("ANO")&&i("Base de Cálculo do IPTU",e.ANO?l(e.ANO).format("$0,0.00"):null),e.hasOwnProperty("VALOR")&&(e.VALOR.hasOwnProperty("IPTU")&&i("Valor do IPTU",e.VALOR.IPTU?l(e.VALOR.IPTU).format("$0,0.00"):null),e.VALOR.hasOwnProperty("IPTU")&&i("Valor do IMÓVEL",e.VALOR.IPTU?l(e.VALOR.CONSTRUCAO).format("$0,0.00"):null))}),m.call("minimizar::categorias",a.element())))}),m.registerCall("icheques::consulta::imoveis",function(t,a,n){return i(2e4,function(){return m.serverCommunication.call("SELECT FROM 'IMOVEIS'.'CONSULTA'",m.call("loader::ajax",{dataType:"json",data:{documento:a.replace(/[^0-9]/g,"")},error:function(){toastr.error("Houve um erro ao consultar imóveis. O valor da consulta já foi estornado, por favor, tente mais tarde.")},success:function(e){m.call("icheques::consulta::imoveis::generate",e,t,a,!1,!1,n)}}))})}),m.registerCall("icheques::consulta::score::generate",function(e,n,t,a,o,r){void 0===o&&(o=!1),void 0===r&&(r=null);var i,s=e;s.hasOwnProperty("score")&&(e=s.score[0],null!=r&&r.remove(),s=function(e,t,a){return t&&n.addItem(e,t,void 0,a)},r=!o,o=n.addSeparator("Score Boa Vista","Consulta","Score, explicação do score pela Boa Vista, porcentagem de inadimplência.").addClass("error"),r&&h("html, body").animate({scrollTop:o.offset().top},2e3),s("Score",parseInt(e.score)),s("Probabilidade de Inadimplência",e.provavel),Z.isValid(t)||s("Classificação",e.classificacao),s("Análise",e.texto),Z.isValid(t)||s("Status",e.status),Z.isValid(t)&&(s("Classificação Númerica",e.classificacao_numerica),s("Classificação Alfabética",e.classificacao_alfabetica)),t=[{name:"Score Boa Vista",value:parseInt(e.score)}],Z.isValid()?t.push({name:"Classificação Númerica",value:e.classificacao_numerica},{name:"Classificação Alfabética",value:e.classificacao_alfabetica}):t.push({name:"Classificação",value:e.classificacao}),s=t.map(function(e){var t=h("<div>").addClass("field"),a=h("<div>").addClass("name").text(e.name),e=h("<div>").addClass("value").text(e.value);return t.append(e,a)}),e=function(){var e=h("<div>").addClass("content");return h("<div>").addClass("separator").css("display","none").insertAfter(i),h("<div>").addClass("container").append(e).insertAfter(i),e},e=(t=(i=n.element().parent().find(".separator.resumo_negativacoes").next()).next().next().length?i.next().next().find(".content"):e()).next().next().length?t.next().next().find(".content"):e(),Z.isValid()?(i.find(".content").append(s[0]),t.append(s[1]),e.append(s[2])):(i.find(".content").append(s[0]),t.append(s[1])))}),m.registerCall("icheques::consulta::score",function(t,a,n){return i(Z.isValid(a)?6e3:3700,function(){return m.serverCommunication.call("SELECT FROM 'SPCNet'.'ScoreBoaVista'",m.call("loader::ajax",{dataType:"json",data:{documento:a.replace(/[^0-9]/g,"")},error:function(){toastr.error("Houve um erro ao consultar o Score. O valor da consulta já foi estornado, por favor, tente mais tarde.")},success:function(e){m.call("icheques::consulta::score::generate",e,t,a,!1,!1,n)}}))})}),m.registerCall("icheques::consulta::refin::generate",function(t,n,e,a,o,r,i){var s;void 0===a&&(a=!1),void 0===o&&(o=!1),null!=(r=void 0===r?null:r)&&r.remove();try{s=JSON.parse(t)}catch(e){s=t}if(!h.isEmptyObject(s)){var c=!1;s.hasOwnProperty("spc")&&(c=s.spc[0].length);var r=n.element().parent().find(".resumo_negativacoes"),l=!o,u=function(e,t,a){return t&&n.addItem(e,t,void 0,a).parent().addClass("container-boa-vista").css({paddingTop:0,paddingBottom:0})};if(!c){c=n.addSeparator("Restrições Pefin/Refin Boa Vista","Apontamentos e Restrições Financeiras e Comerciais","Pendências e restrições financeiras no Boa Vista").addClass("error");return l&&(h("html, body").animate({scrollTop:c.offset().top},2e3),l=!1),u("Informação","Para o documento "+(X.isValid(e)?X:Z).format(e)+" não foram encontrados registros de restrições."),void(a||m.call("alert",{icon:"pass",title:"Não há Pefin/Refin Boa Vista no Target",subtitle:"O sistema encontrou 0 ocorrências de Pefin/Refin para o documento informado.",paragraph:"Para o documento "+(X.isValid(e)?X:Z).format(e)+" não foram encontrados registros de Refin/Pefin."}))}var d=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),f=!0;s.spc[0].forEach(function(e){var t=n.addSeparator("Restrições Pefin/Refin Boa Vista","Apontamentos e Restrições Financeiras e Comerciais","Pendências e restrições financeiras nos bureaus de crédito Refin e Pefin").addClass("error");f||t.hide().find(".container").remove(),f=f&&!1,l&&(h("html, body").animate({scrollTop:t.offset().top},2e3),l=!1),u("Associado",e.NomeAssociado),u("Valor",""+d.format(parseFloat(e.Valor))),u("Data da Inclusão",e.DataDeInclusao),u("Data do Vencimento",e.DataDoVencimento),u("Entidade",e.Entidade),u("Número do Contrato",e.NumeroContrato),u("Comprador, Fiador ou Avalista",e.CompradorFiadorAvalista),u("Telefone Associado",e.TelefoneAssociado),u("Cidade Associado",e.CidadeAssociado),u("UF Associado",e.UfAssociado)}),r.length&&(n.element().parent().find(".result:contains(Resumo de Negativações)").remove(),m.call("grafico::analitico",n.element().parent(),e,i,!0)),s.consultaRealizada.length&&(n.addSeparator("Quem consultou este CPF/CNPJ?","Veja o histórico de Pefin/Refin do Target","No passado um CPF/CNPJ consultou Pefin/Refin neste Target."),s.consultaRealizada.forEach(function(e){u("Nome Associado",e.NomeAssociado),u("Data da Consulta",e.DataDaConsulta,!0)}))}}),m.registerCall("icheques::consulta::refin",function(t,a,n,o){var e={cpf:{endpointCall:"SELECT FROM 'PROTESTOS'.'REFIN'",searchValue:1200},cnpj:{endpointCall:"SELECT FROM 'PROTESTOS'.'REFIN'",searchValue:2700}}[11<a.replace(/[^0-9]/g,"").length?"cnpj":"cpf"],r=e.endpointCall,e=e.searchValue;i(e,function(){return m.serverCommunication.call(r,m.call("loader::ajax",{dataType:"json",data:{documento:a.replace(/[^0-9]/g,"")},error:function(){toastr.error("Houve um erro ao consultar PEFIN/REFIN Boa Vista, o valor da consulta foi estornado. Por favor, tente mais tarde.")},success:function(e){m.call("icheques::consulta::refin::generate",e,t,a,!1,!1,n,o)}}))})}),m.registerCall("icheques::consulta::serasa::generate",function(t,e,a,n,o,r,i){if(void 0===n&&(n=!1),void 0===o&&(o=!1),void 0===r&&(r=null),!h.isEmptyObject(t)){var s;try{s=JSON.parse(t)}catch(e){s=t}var c=s.informacoes.hasOwnProperty("valorTotalPendencias")?s.informacoes.valorTotalPendencias:null;try{s=s.informacoes[0].bello}catch(e){console.log(e)}var l=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});null!=r&&r.remove();var u,d=new W,f=function(e,t){return t&&d.addItem(e,t)},p=!o,o=e.element().parent().find(".resumo_negativacoes");s.length?(u=e.addSeparator("Restrições Serasa","Apontamentos e Restrições Financeiras e Comerciais",null!==c?"O documento possui "+l.format(c)+"em pendências Financeiras":"Pendências e restrições financeiras no Serasa").addClass("error"),s.forEach(function(t){p&&(h("html, body").animate({scrollTop:u.offset().top},2e3),p=!1),Object.keys(t).forEach(function(e){return f(ee[e],t[e]||"Não Informado")}),e.element().append(d.element().append(h("<hr>"))),d.resetFields()}),o.length&&(e.element().parent().find(".result:contains(Resumo de Negativações)").remove(),m.call("grafico::analitico",e.element().parent(),a,i,!0))):(i=e.addSeparator("Restrições Serasa","Apontamentos e Restrições Financeiras e Comerciais","Pendências e restrições financeiras no Serasa").addClass("error"),m.call("resize",[i]),p&&(h("html, body").animate({scrollTop:i.offset().top},2e3),p=!1),f("Informação","Para o documento "+(X.isValid(a)?X:Z).format(a)+" não foram encontrados registros de restrições."),e.element().append(d.element()),n||m.call("alert",{icon:"pass",title:"Não há Restrições Serasa no Target",subtitle:"O sistema encontrou 0 ocorrências de Restrições Serasa para o documento informado.",paragraph:"Para o documento "+(X.isValid(a)?X:Z).format(a)+" não foram encontrados registros de restrições."}))}}),m.registerCall("icheques::consulta::serasa",function(t,a,n,o){return i(4e3,function(){return m.serverCommunication.call("SELECT FROM 'PROTESTOS'.'SERASA'",{dataType:"json",data:{documento:a.replace(/[^0-9]/g,"")},success:function(e){m.call("icheques::consulta::serasa::generate",e,t,a,!1,!1,n,o)},error:function(e){toastr.error("Houve um erro ao consultar inadimplência. Tente novamente mais tarde.")}})})}),m.registerTrigger("ccbusca::parser","imoveis",function(e,t){var a,n=e.result,o=e.doc;Z.isValid(o)||(a=null,e=-1===s.indexOf("no-imóveis"),a=h("<button />").text("Consultar Imóveis SP Capital").addClass("button").append(h("<small />").text("CPF Somente - R$20").css({display:"block","font-size":"9px"})),e?a.click(m.click("icheques::consulta::imoveis",n,o,a)):a.on("click",function(e){e.preventDefault(),m.call("blockedOperation","imóveis")}),n.addItem().prepend(a),t())}),m.registerTrigger("ccbusca::parser","refin",function(e,t){var a=e.result,n=e.doc,o=e.jdocument;t();e=null,t=-1===s.indexOf("no-consulta-pefin-refin-boa-vista"),e=h("<button />").text("Consultar Pefin/Refin Boa Vista").addClass("button").append(h("<small />").text("CPF R$1,20 / CNPJ R$2,70").css({display:"block","font-size":"9px"}));t?e.click(m.click("icheques::consulta::refin",a,n,e,o)):e.on("click",function(e){e.preventDefault(),m.call("blockedOperation","consulta-pefin-refin-boa-vista")}),a.addItem().prepend(e)}),m.registerTrigger("ccbusca::parser","score",function(e,t){var a=e.result,n=e.doc;t();e=null,t=-1===s.indexOf("no-score-boa-vista"),e=h("<button />").text("Consultar Score Boa Vista").addClass("button").append(h("<small />").text("CPF R$ 3,00 / CNPJ R$ 6,00").css({display:"block","font-size":"9px"}));t?e.click(m.click("icheques::consulta::score",a,n,e)):e.on("click",function(e){e.preventDefault(),m.call("blockedOperation","score-boa-vista")}),a.addItem().prepend(e)}),m.registerTrigger("ccbusca::parser","serasa",function(e,t){var a=e.result,n=e.doc,o=e.jdocument;t();var r=null,i=-1===s.indexOf("no-consulta-pefin-refin-serasa"),r=h("<button />").text("Consultar Pefin/Refin Serasa").addClass("button").append(h("<small />").text("CPF/CNPJ - R$ 4").css({display:"block","font-size":"9px"}));if("boieterra"===c.confs.user.username)return r.click(m.click("icheques::consulta::serasa",a,n,r,o));m.serverCommunication.call("SELECT FROM 'SubAccount'.'IsSubAccountAndHavePermissionPefinRefin'",{dataType:"json"}).then(function(e){e&&i||i&&null!=s.join().match(/(flex|ouro|prata|diamante)/)?r.click(m.click("icheques::consulta::serasa",a,n,r,o)):r.on("click",function(e){return e.preventDefault(),null===s.join().match(/(flex|ouro|prata|diamante)/)?m.call("alert",{title:"Infelizmente voce não tem permissão para isso!",subtitle:"Para realizar essa consulta é necessário que você esteja no plano flex, prata, ouro ou diamante."}):void m.call("blockedOperation","consulta-pefin-refin-serasa")})},function(e){i&&null!=s.join().match(/(flex|ouro|prata|diamante)/)?r.click(m.click("icheques::consulta::serasa",a,n,r,o)):r.on("click",function(e){return e.preventDefault(),null===s.join().match(/(flex|ouro|prata|diamante)/)?m.call("alert",{title:"Infelizmente voce não tem permissão para isso!",subtitle:"Para realizar essa consulta é necessário que você esteja no plano flex, prata, ouro ou diamante."}):void m.call("blockedOperation","consulta-pefin-refin-serasa")})}),a.addItem().prepend(r)})})}(harlan,$,numeral);
