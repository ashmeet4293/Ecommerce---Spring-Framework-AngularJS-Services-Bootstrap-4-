var app = angular.module('app');

app.controller('PedidosController', function ($scope, $localStorage, $state, $uibModal, PedidosService) {
    $scope.cliente = $localStorage.clienteLogado;

    $scope.detalhesDoPedido = function (pedido) {
        $localStorage.pedido = pedido;
        $state.go('detalhe');
    };

    $scope.detalhePedido = $localStorage.pedido;

    $scope.modalDetalhesPedido = function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'webapp/app/pedidos/views/modal.html',
            size: 'lg',
            controller: function ($scope) {
            }
        });
    };

    //Pega pedidos
    PedidosService.getPedidos($scope.cliente.idCliente).then(function (data) {
        $scope.pedidos = data.data;
    });

    $scope.modalAvaliarJogo = function (idJogo) {
        PedidosService.avaliar(idJogo);
    };

});


