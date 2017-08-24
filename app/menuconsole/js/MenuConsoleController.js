var app = angular.module('app');

app.controller('MenuConsoleController', function ($scope, $localStorage, HomeService, NavbarService, $state, $window, MenuConsoleService) {
    var idConsole = $localStorage.idConsole;
    $scope.jogos = $localStorage.jogoInConsole;
    $scope.acessorios = $localStorage.acessoriosInConsole;

    //Repegar o navar.
    NavbarService.getConsole().then(function (data) {
        $scope.consoles = data.data;
    });

    $scope.jogosByConsole = function (id) {
        NavbarService.getJogosByConsole(id);
        $state.go('listajogos');
    };
    $scope.getAcessorios = function () {
        MenuConsoleService.exibirAcessoriosNesteConsole(idConsole);
        $state.go('listaacessorios');
    };
    $scope.getJogos = function () {
        NavbarService.getJogosByConsole(idConsole);
        $state.go('listajogos');
    };

    $scope.comprarComUmClique = function (jogo) {
        HomeService.comprarUmClick(jogo);
    };

    $scope.jogoPorDetalhe = function (jogo) {
        $localStorage.jogoDetalhe = jogo;
        $state.go('produto');
    };
});