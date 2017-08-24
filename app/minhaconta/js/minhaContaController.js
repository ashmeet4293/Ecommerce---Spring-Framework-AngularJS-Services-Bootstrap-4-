var app = angular.module('app');

app.controller('minhaContaController', function ($scope, $localStorage, $state, ClienteService, minhaContaService, HomeService) {

    $scope.cliente = $localStorage.clienteLogado;
    if ($scope.cliente == '' || $scope.cliente == null) {
        swal("Usuário não logado", "Faça o login por favor", "info");
        $state.go('login');
    } else {
        //Desejos
        HomeService.getDesejos($scope.cliente.idCliente).then(function (data) {
            $scope.desejos = data.data;
        });
        //Enderecos
        HomeService.getEnderecos($scope.cliente.idCliente).then(function (data) {
            $scope.enderecos = data.data;
        });
    }

    //Alterar Nome
    $scope.inputAlterarNome = false;
    $scope.h4Nome = false;
    $scope.emaildisabled = false;
    $scope.alterarNome = function (cliente) {
        $scope.inputAlterarNome = true;
        $scope.h4Nome = true;
        $scope.emaildisabled = true;
        $scope.alterarDados = function () {
            ClienteService.alterar(cliente);
            $scope.inputAlterarNome = false;
            $scope.h4Nome = false;
        };
        $scope.cancelarAlterarDados = function () {
            $scope.inputAlterarNome = false;
            $scope.h4Nome = false;
        };
    };

    //Alterar Email
    $scope.inputAlterarEmail = false;
    $scope.pEmail = false;
    $scope.alterarEmail = function (cliente) {
        $scope.inputAlterarEmail = true;
        $scope.pEmail = true;
        $scope.alterarDados = function () {
            ClienteService.alterar(cliente);
            $scope.inputAlterarEmail = false;
            $scope.pEmail = false;
        };
        $scope.cancelarAlterarDados = function () {
            $scope.inputAlterarEmail = false;
            $scope.pEmail = false;
        };
    };

    //Alterar CPF
    $scope.inputAlterarCpf = false;
    $scope.pCpf = false;
    $scope.alterarCpf = function (cliente) {
        $scope.inputAlterarCpf = true;
        $scope.pCpf = true;
        $scope.alterarDados = function () {
            ClienteService.alterar(cliente);
            $scope.inputAlterarCpf = false;
            $scope.pCpf = false;
        };
        $scope.cancelarAlterarDados = function () {
            $scope.inputAlterarCpf = false;
            $scope.pCpf = false;
        };
    };
    //Alterar Telefone
    $scope.inputAlterarTelefone = false;
    $scope.pTelefone = false;
    $scope.alterarTelefone = function (cliente) {
        $scope.inputAlterarTelefone = true;
        $scope.pTelefone = true;
        $scope.alterarDados = function () {
            ClienteService.alterar(cliente);
            $scope.inputAlterarTelefone = false;
            $scope.pTelefone = false;
        };
        $scope.cancelarAlterarDados = function () {
            $scope.inputAlterarTelefone = false;
            $scope.pTelefone = false;
        };
    };

    //Alterar Celular
    $scope.inputAlterarCelular = false;
    $scope.pCelular = false;
    $scope.alterarCelular = function (cliente) {
        $scope.inputAlterarCelular = true;
        $scope.pCelular = true;
        $scope.alterarDados = function () {
            ClienteService.alterar(cliente);
            $scope.inputAlterarCelular = false;
            $scope.pCelular = false;
        };
        $scope.cancelarAlterarDados = function () {
            $scope.inputAlterarCelular = false;
            $scope.pCelular = false;
        };
    };

    //Alterar Sexo 
    $scope.inputAlterarSexo = false;
    $scope.pSexo = false;
    $scope.alterarSexo = function (cliente) {
        $scope.inputAlterarSexo = true;
        $scope.pSexo = true;
        $scope.alterarDados = function () {
            ClienteService.alterar(cliente);
            $scope.inputAlterarSexo = false;
            $scope.pSexo = false;
        };
        $scope.cancelarAlterarDados = function () {
            $scope.inputAlterarSexo = false;
            $scope.pSexo = false;
        };
    };

    //Alterar Data Nascimento 
    $scope.inputAlterarData = false;
    $scope.pData = false;
    $scope.alterarData = function (cliente) {
        $scope.inputAlterarData = true;
        $scope.pData = true;
        $scope.alterarDados = function () {
            ClienteService.alterar(cliente);
            $scope.inputAlterarData = false;
            $scope.pData = false;
        };
        $scope.cancelarAlterarDados = function () {
            $scope.inputAlterarData = false;
            $scope.pData = false;
        };
    };

    //Endereco
    $scope.alterarEsteEnderecoPlease = function (endereco) {
        $localStorage.enderecoId = endereco;
        minhaContaService.alterarEndereco(endereco);
    };

    $scope.adicionarNovoEndereco = function () {
        minhaContaService.cadastrarEndereco($scope.cliente)
        //$scope.enderecos.push(data.data);
    };

    $scope.excluirEndereco = function (id, index) {
        minhaContaService.excluirEsteEndereco(id);
        $scope.enderecos.splice(index, 1);
    };

    //Remover desejo selecionado.
    $scope.removerJogoDesejado = function (idDesejo, index) {
        HomeService.removeEsteDesejo(idDesejo).then(function (data) {
            $scope.desejos.splice(index, 1);
        });
    };

    //Alterar senha
    $scope.alterarMinhaSenha = function () {
        minhaContaService.alterarSenha($scope);
    };

    $scope.myStyle = function () {
        $scope.border = '4px solid black';
        $scope.bgColor = '#ff5252';
    };

    $scope.comprarComUmClique = function (jogo) {
        HomeService.comprarUmClick(jogo);
    };
});
