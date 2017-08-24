app.service('CarrinhoService', function ($http, $localStorage) {


    this.removerItem = function (y, item) {
        y.splice(item, 1);
    };

    this.adicionarAoCarrinho = function (item) {

        $localStorage.carrinho = item;
    };


});
