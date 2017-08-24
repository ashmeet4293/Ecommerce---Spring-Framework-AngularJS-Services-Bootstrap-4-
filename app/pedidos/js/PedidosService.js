app.service('PedidosService', function ($http, $uibModal, $localStorage, $uibModalStack) {

    this.getPedidos = function (id) {
        var $retorno = $http({
            url: 'getPedidos?id=' + id,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        $retorno.then(function (data) {});
        return $retorno;
    };

    this.avaliar = function (idJogo) {
        $uibModal.open({
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'webapp/app/pedidos/views/avaliar.html',
            size: 'md',
            controller: function ($scope) {

                $scope.cliente = $localStorage.clienteLogado;

                $scope.avaliacao = {
                    cliente: {idCliente: $scope.cliente.idCliente},
                    jogo: {idJogo: idJogo}
                };

                $scope.efetuarAvalicao = function () {
                    var $res = $http({
                        url: "avaliarJogo",
                        method: "POST",
                        data: $scope.avaliacao,
                        headers: {'Content-Type': 'application/json'}
                    });
                    $res.success(function (data) {
                        $uibModalStack.dismissAll();
                    });
                };
            }
        });
    };
});
