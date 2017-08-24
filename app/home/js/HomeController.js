var app = angular.module('app');

app.controller('HomeController', function ($scope, HomeService, $localStorage, ConfirmacaoService, $state, minhaContaService) {

    $scope.clienteLog = {};
    $scope.clienteLog = $localStorage.clienteLogado;
    $scope.carrinhos = [];
    $scope.jogos = [];
    HomeService.getJogos($scope.jogos).then(function (data) {
        $scope.jogos = data.data;
    });

    $scope.jogoPorDetalhe = function (jogo) {
        $localStorage.jogoDetalhe = jogo;
        $state.go('produto');
    };

    $scope.adicionarDesejo = function (jogo) {
        $scope.desejo = {};
        $scope.desejo = {
            cliente: {idCliente: $scope.clienteLog.idCliente},
            jogo: {idJogo: jogo.idJogo}
        };
        HomeService.cadastrar($scope.desejo).then(function (data) {
            if (data.data == null || data.data == "") {
                $.notify({
                    // options
                    title: 'Este jogo já está adicinado a sua lista!',
                    message: ''
                }, {
                    // settings
                    type: 'danger'

                });
            } else {
                $.notify({
                    // options
                    title: 'Jogo adicionado a sua lista!',
                    message: ''
                }, {
                    // settings
                    type: 'success'
                });
            }
        });
    };

    //Comprar com um click.
    $scope.comprarComUmClick = function (jogo) {
        HomeService.comprarUmClick(jogo);
    };

    $scope.alterarMeusDados = function (cliente) {
        ConfirmacaoService.alterar(cliente);
    };
   
    $scope.alterarDadosEndereco = function () {
        if ($scope.enderecos.length == 0) {
        } else {
            minhaContaService.alterarEndereco($localStorage.enderecoId);
        }
    };
});

