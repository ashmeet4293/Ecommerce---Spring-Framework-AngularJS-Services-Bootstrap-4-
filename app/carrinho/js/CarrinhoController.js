var app = angular.module('app');

app.controller('CarrinhoController', function ($scope, $localStorage, CarrinhoService, $state) {

    $scope.clienteLog = $localStorage.clienteLogado;

    $scope.jogoNoCarrinho = $localStorage.carrinho;

    $scope.jogoNoCarrinho.qtd = 1;

    $scope.removerItemDoCarrinho = function (item) {
        CarrinhoService.removerItem($scope.jogosNoCarrinho, item);
    };

    $scope.confirmacao = function (carrinho) {
        $localStorage.confirmacaoCarrinho = carrinho;
        if( $scope.clienteLog == '' ||  $scope.clienteLog == null){
          swal("Identificação", "Faça o login ou cadastre-se", "info");
             $state.go('login');
        }else{
            $state.go('confirmacao');
        };
    };

});


