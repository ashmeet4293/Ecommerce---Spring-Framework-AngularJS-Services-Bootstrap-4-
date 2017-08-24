var app = angular.module('app');

app.controller('ClienteController', function ($scope, ClienteService, $state, $localStorage) {

    $scope.cliente = {};
    $scope.endereco = {}

    $scope.criarNovoCliente = function () {
        ClienteService.adicionar($scope.cliente);
    };

    $scope.clienteLog = {};
    $scope.loginCliente = function () {
        ClienteService.login($scope.cliente).then(function (data) {
            if (data.data == '') {
                swal("Dados incorretos", "Verifique os dados digitados.", "info");
            } else {
                $state.go('home');
            }
        });
    };

    $scope.escondeCadastrar = false;
    $scope.esconder = function () {
        $scope.escondeCadastrar = true;
    };

    $scope.verificarUsuarioCadastrado = function () {
        ClienteService.verifica($scope.cliente).then(function (data) {
            if (data.data == '' || data.data == null) {
                swal("Dados incorretos", "Este endereço de email já se encontra em nossa base dados.", "warning");
            } else {
                $state.go('cadastro');
            }
        });
    };

    $scope.cadastrarCliente = function () {
        ClienteService.adicionar($scope).then(function (data) {
            if (data.data.idCliente !== null) {
                $localStorage.idDoCliente = data.data.idCliente;
                ClienteService.adicionarEndereco($scope);
            } else {
                console.log('nao temos id');
            }
        });
    };
    
    $scope.naoSouCliente = function(){
      $state.go('semcadastro');  
    };
});