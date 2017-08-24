var app = angular.module('app');

app.controller('NavbarController', function ($scope, NavbarService, $state, $localStorage) {
    var cliente = $localStorage.clienteLogado;

    $scope.botoes = false;
    if (cliente == null) {
        $scope.botoes = true;
    } else {
        $scope.botoes = false;
    }
    
    $scope.consoles = [];
    NavbarService.getConsole().then(function (data) {
        $scope.consoles = data.data;
    });

    $scope.jogosPorConsole = function (idConsole) {
        NavbarService.getJogosByConsole(idConsole);
        $state.go('listajogos');
    };
    
    $scope.logout = function(){
        NavbarService.logoutCliente(cliente);
    };
});