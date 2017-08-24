var app = angular.module('app');
app.controller('ProdutoController', function ($scope, $localStorage, $state, CarrinhoService, ProdutoService) {

    $scope.jogo = $localStorage.jogoDetalhe;
    $scope.enviarParaCompra = function (item) {
        CarrinhoService.adicionarAoCarrinho(item);
        $state.go('carrinho');
    };
    $scope.showTable = false;
    $scope.mostreATable = function () {
        $scope.showTable = true;
    };
    $scope.avaliacaoNao = true;
    $scope.avaliacaoSim = true;
    $scope.avaliacoes = [];
    ProdutoService.avaliacoes($scope.jogo.idJogo).then(function (data) {
        $scope.avaliacoes = data.data;
        if ($scope.avaliacoes.length == 0) {
            $scope.avaliacaoNao = false;
        } else {
            $scope.avaliacaoSim = false;
            $scope.total = $scope.avaliacoes.length;
        }

        $scope.range = function (count) {
            var ratings = [];
            for (var i = 0; i < count; i++) {
                ratings.push(i);
            }
            return ratings;
        };

        $scope.recomendaJogo = function (recomenda) {
            if (recomenda == 1) {
                return 'font-thumbs-up';
            } else {
                return 'font-thumbs-down';
            }
        };
    });

    ProdutoService.jogosPorConsole($scope.jogo.console.idConsole).then(function (data) {
        $scope.jogosConsole = data.data;
    });

    ProdutoService.acessoriosPorConsole($scope.jogo.console.idConsole).then(function (data) {
        $scope.acessoriosConsole = data.data;
    });

    $scope.jogoPorDetalhe = function (jogo) {
        $localStorage.jogoDetalhe = jogo;
        $state.go('produto');
    };

});


