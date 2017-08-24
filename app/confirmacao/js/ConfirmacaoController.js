var app = angular.module('app');
app.controller('ConfirmacaoController', function (ConfirmacaoService, $scope, $localStorage, minhaContaService, HomeService) {
    $scope.boleto = true;
    $scope.mercado = true;
    $scope.pag = true;
    $scope.pay = true;
    $scope.adicionadoNoCarrinho = $localStorage.confirmacaoCarrinho;
    $scope.cliente = $localStorage.clienteLogado;
    //Enderecos

    HomeService.getEnderecos($scope.cliente.idCliente).then(function (data) {
        $scope.enderecos = data.data;
    });
    
    $scope.sedex = 50.85;
    $scope.pac = 26.23;
    $scope.total = 0;
    $scope.pedido = {};
    $scope.finalizarCompra = function () {
        ConfirmacaoService.salvarPedido($scope);
    };
    $scope.atualizaSedex = function () {
        $scope.pedido.entrega = $scope.sedex;
    };
    $scope.atualizaPac = function () {
        $scope.pedido.entrega = $scope.pac;
    };
    ConfirmacaoService.getPagamentos().then(function (data) {
        $scope.pagamentos = [];
        $scope.pagamentos = data.data;
    });
    $scope.getIdEndereco = function (item) {
        $scope.idEndereco = item;
        $localStorage.enderecoId = item;
    };
    $scope.getIdPagamento = function (item) {
        $scope.idPagamento = item;
        if (item == 1) {
            $scope.boleto = false;
        } else {
            $scope.boleto = true;
        }
        if (item == 2) {
            $scope.mercado = false;
        } else {
            $scope.mercado = true;
        }
        if (item == 3) {
            $scope.pag = false;
        } else {
            $scope.pag = true;
        }
        if (item == 4) {
            $scope.pay = false;
        } else {
            $scope.pay = true;
        }
    };
    $scope.alterarDadosDoCliente = function (cliente) {
        ConfirmacaoService.alterar(cliente);
    };
    $scope.alterarDadosEndereco = function () {
        if ($scope.enderecos.length == 0) {
        } else {
            minhaContaService.alterarEndereco($localStorage.enderecoId);
        }
    };
    $scope.adicionarEndereco = function () {
        minhaContaService.cadastrarEndereco($scope.cliente);
    };
    $scope.pedidoComprado = $localStorage.pedidoEfetuado;
    $scope.jogoPedido = $localStorage.jogoComprado;

    if ($scope.pedidoComprado == "" || $scope.pedidoComprado == null) {
        console.log('waiting for adress');
    } else {

        ConfirmacaoService.buscarEnderecoPorId($scope.pedidoComprado.endereco.idEndereco).then(function (data) {
            $scope.enderecoSelecionado = data.data;
        });
    }

    if ($scope.pedidoComprado == "" || $scope.pedidoComprado == null) {
        console.log('waiting for payment options');
    } else {
        ConfirmacaoService.buscarPagamentoPorId($scope.pedidoComprado.pagamento.idPagamento).then(function (data) {
            $scope.pagamentoSelecionado = data.data;
        });
    }
});


