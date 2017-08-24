app.service('HomeService', function ($http, $uibModalStack, $uibModal, $localStorage, $state) {

    this.getJogos = function ($scope) {
        var $retorno = $http({
            url: "exibirJogos",
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });
        $retorno.then(function (data) {});
        return $retorno;
    };

    this.cadastrar = function (desejo) {
        var $res = $http.post('criarNovoDesejo', desejo);
        $res.then(function (data) {});
        return $res;
    };

    this.getEnderecos = function (id) {
        var $retorno = $http({
            url: "exibirEnderecos?id=" + id,
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });
        $retorno.then(function (data) {});
        return $retorno;
    };

    this.getDesejos = function (cliente) {
        var $retorno = $http({
            url: "getDesejos?cliente=" + cliente,
            method: "get",
            headers: {'Content-Type': 'application/json'}
        });
        $retorno.then(function (data) {});
        return $retorno;
    };

    this.removeEsteDesejo = function (desejo) {
        var $retorno = $http({
            method: 'POST',
            url: 'removerDesejo?desejo=' + desejo,
            headers: {'Content-Type': 'application/json'}
        });
        $retorno.then(function (data) {});
        return $retorno;
    };

    //Comprar com um click.
    this.comprarUmClick = function (jogo) {
        var logado = $localStorage.clienteLogado;
        if (logado == null) {
            swal("Usuário não logado", "Faça login por favor", "warning");
            $state.go('login');
        } else {
            $uibModal.open({
                ariaLabelledBy: 'modal-title-down',
                ariaDescribedBy: 'modal-body-down',
                templateUrl: 'webapp/app/home/views/comprarumclick.html',
                size: 'md',
                controller: function ($scope) {
                    $scope.jogoComprar = jogo;
                    $scope.cliente = logado;

                    //Pega forma de pagamentos
                    $http.get('pagamentos').success(function (data) {
                        $scope.pagamentos = data;
                    });

                    //Pega os endereços de novo :(
                    $http({
                        url: "exibirEnderecos?id=" + $scope.cliente.idCliente,
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).success(function (data) {
                        $scope.enderecos = data;
                    });

                    //Opções de entrega
                    $scope.sedex = 50.85;
                    $scope.pac = 26.23;
                    $scope.total = 0;
                    $scope.pedido = {};
                    $scope.quantidade = 1;
                    $scope.mostrarPrazo = true;

                    $scope.mostrarDesconto = true;

                    $scope.atualizaSedex = function () {
                        $scope.pedido.entrega = $scope.sedex;
                        $scope.mostrarPrazo = false;
                        $scope.prazo = "6 dias úteis";
                    };

                    $scope.atualizaPac = function () {
                        $scope.pedido.entrega = $scope.pac;
                        $scope.mostrarPrazo = false;
                        $scope.prazo = "25 dias úteis";
                    };

                    //Desconto depedendendo da forma de pagamento. //Melhorar aqui.
                    $scope.atualizaPagamento = function (id) {

                        $scope.IdPagmento = id;
                        if (id == 1) {
                            var boleto = 0.10;
                            $scope.desconto = $scope.jogoComprar.preco * boleto;
                            $scope.mostrarDesconto = false;
                            $scope.valorDesconto = '10%';
                        } else {
                            if (id == 2) {
                                var mercado = 0.15;
                                $scope.desconto = $scope.jogoComprar.preco * mercado;
                                $scope.mostrarDesconto = false;
                                $scope.valorDesconto = '15%';
                            } else {
                                if (id == 3) {
                                    var pag = 0.12;
                                    $scope.desconto = $scope.jogoComprar.preco * pag;
                                    $scope.mostrarDesconto = false;
                                    $scope.valorDesconto = '11%';
                                } else {
                                    if (id == 4) {
                                        var pay = 0.23;
                                        $scope.desconto = $scope.jogoComprar.preco * pay;
                                        $scope.mostrarDesconto = false;
                                        $scope.valorDesconto = '5%';
                                    }
                                }
                            }
                        }
                    };

                    //Seleciona endereço.
                    $scope.getIdEndereco = function (item) {
                        $scope.IdEndereco = item;
                        $localStorage.enderecoId = item;
                    };

                    //Salva o pedido
                    $scope.salvarPedido = function () {
                        //Primeiro verifica se os campos estão selecionados.
                        if ($scope.pedido.entrega == '' || $scope.pedido.entrega == null) {
                            swal("Selecione a entrega", "Tipo de entrega não foi selecionado.", "error");
                        } else {
                            if ($scope.IdPagmento == '' || $scope.IdPagmento == null) {
                                swal("Forma de pagamento", "Forma de pagamento não foi selecionado.", "error");
                            } else {
                                if ($scope.IdEndereco == '' || $scope.IdEndereco == null) {
                                    swal("Endereço", "Endereço não selecionado.", "error");
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
                                                    //Objeto para enviar para controller.
                                                    var pedido = {
                                                        cliente: {idCliente: $scope.cliente.idCliente},
                                                        jogo: {idJogo: jogo.idJogo},
                                                        endereco: {idEndereco: $scope.IdEndereco},
                                                        pagamento: {idPagamento: $scope.IdPagmento},
                                                        frete: $scope.pedido.entrega,
                                                        subTotal: jogo.preco * $scope.quantidade,
                                                        total: jogo.preco * $scope.quantidade + $scope.pedido.entrega,
                                                        quantidade: $scope.quantidade
                                                    };
                                                    var $res = $http({
                                                        url: "salvarPedido",
                                                        method: "post",
                                                        data: pedido,
                                                        contentType: "application/json"
                                                    });
                                                    $res.success(function (data) {
                                                        $state.go("comprado");
                                                        $localStorage.pedidoEfetuado = pedido;
                                                        $localStorage.jogoComprado = jogo;
                                                        $uibModalStack.dismissAll();
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

                    //Fecha modal
                    $scope.Fechar = function () {
                        $uibModalStack.dismissAll();
                    };
                }
            });
        }
    };
});
