app.service('ConfirmacaoService', function ($http, $uibModal, $uibModalStack, $state, $localStorage) {

    this.salvarPedido = function (compra) {

        var jogo = compra.adicionadoNoCarrinho;
        var cliente = compra.cliente;
        var itemPedido = compra.pedido;
        var pedido = {
            cliente: {idCliente: cliente.idCliente},
            jogo: {idJogo: jogo.idJogo},
            endereco: {idEndereco: compra.idEndereco},
            pagamento: {idPagamento: compra.idPagamento},
            frete: itemPedido.entrega,
            subTotal: jogo.preco * jogo.qtd,
            total: jogo.preco * jogo.qtd + itemPedido.entrega,
            quantidade: jogo.qtd
        };
        if (pedido.endereco.idEndereco == "" || pedido.endereco.idEndereco == null) {
            $.notify({
                title: 'Endereço não selecionado!',
                message: ''
            }, {
                type: 'info'
            });
        } else {
            if (pedido.pagamento.idPagamento == "" || pedido.pagamento.idPagamento == null) {
                $.notify({
                    title: 'Tipo de pagamento não selecionado!',
                    message: ''
                }, {
                    type: 'warning'
                });
            } else {
                if (pedido.frete == "" || pedido.frete == null) {
                    $.notify({
                        title: 'Frete não selecionado!',
                        message: ''
                    }, {
                        type: 'danger'
                    });
                } else {
                    swal({
                        title: "Deseja realizar este pedido?",
                        text: "Verifique as opções de entrega e pagamento e se os dados pessoais estão corretos!",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Sim",
                        cancelButtonText: "Vou pensar mais",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                            function (isConfirm) {
                                if (isConfirm) {
                                    var $res = $http({
                                        url: "salvarPedido",
                                        method: "post",
                                        data: pedido,
                                        contentType: "application/json"
                                    });
                                    $res.success(function (data) {
                                        $state.go("comprado");
                                        $localStorage.jogoComprado = compra.adicionadoNoCarrinho;
                                        $localStorage.pedidoEfetuado = pedido;
                                    });
                                    swal("Pedido realizado!", "Verifique depois no seus pedidos", "success");
                                } else {
                                    swal("Pedido cancelado", "Cancelado", "warning");
                                }
                            });
                }
            }
        }
    };

    this.getPagamentos = function () {
        var $retorno = $http.get('pagamentos');
        $retorno.then(function (data) {});
        return $retorno;
    };

    //Abre modal para ver os dados e efetuar uma alteração.
    this.alterar = function (cliente) {
        $uibModal.open({
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'webapp/app/confirmacao/views/alterarcli.html',
            size: 'md',
            controller: function ($scope) {
                $scope.cliente = cliente;

                // Esconde/Exibe inputs e botões. 
                $scope.esondeInputs = true;
                $scope.botaoAlterar = true;
                $scope.botaoSalvar = true;

                //Habilita alteração. Habilita campos para enviar para alteração e botão para alterar.
                $scope.habilitarAlteracao = function () {
                    $scope.esondeInputs = false;
                    $scope.botaoAlterar = false;
                    $scope.botaoSalvar = false;
                };

                //Salva os dados alterados.
                $scope.salvarAlteracao = function (cliente) {
                    var res = $http.post('alterarCliente', cliente);
                    res.success(function (data) {
                        $uibModalStack.dismissAll();
                        swal("Alteração efetuada!", "Alteração dos dados pessoais feito com sucesso.", "success");
                    });
                };

                //Fecha modal
                $scope.Fechar = function () {
                    $uibModalStack.dismissAll();
                };
            }
        });
    };

    this.buscarEnderecoPorId = function (id) {
        var $res = $http({
            url: "enderecoPorId?id=" + id,
            method: "get",
            headers: {'Content-Type': 'application/json'}
        });
        $res.success(function (data) {});
        return $res;
    };

    this.buscarPagamentoPorId = function (id) {
        var $res = $http({
            url: "pagamentoPorId?id=" + id,
            method: "get",
            headers: {'Content-Type': 'application/json'}
        });
        $res.success(function (data) {});
        return $res;
    };
});

