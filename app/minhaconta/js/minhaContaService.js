app.service('minhaContaService', function ($http, $uibModal, $uibModalStack, $localStorage, $window, $state) {

    this.cadastrarEndereco = function (cliente) {
        $uibModal.open({
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'webapp/app/minhaconta/views/cadastrarend.html',
            size: 'md',
            controller: function ($scope) {
                //Fecha modal
                $scope.Fechar = function () {
                    $uibModalStack.dismissAll();
                };

                //Cadastra endereco
                $scope.criarNovoEndereco = function (item) {
                    var cadastro = {
                        cep: item.cep,
                        endereco: item.endereco,
                        numero: item.numero,
                        complemento: item.complemento,
                        referencia: item.referencia,
                        bairro: item.bairro,
                        cidade: item.cidade,
                        estado: item.estado,
                        cliente: {idCliente: cliente.idCliente},
                    };

                    var $res = $http({
                        url: "criarEndereco",
                        method: "POST",
                        data: cadastro,
                        headers: {'Content-Type': 'application/json'}
                    });
                    $res.success(function (data) {
                        $uibModalStack.dismissAll();
                        $window.location.reload();
                    });
                    return $res;
                };
            }
        });
    };

    //Abre modal para verificação e alteração dos endereços de um cliente logado.
    this.alterarEndereco = function (id) {
        //Verifica se o storage está vazio.
        if (id == null) {
            swal("Selecione", "Selecione um endereço, caso não tenha, cadastre!", "warning");
        } else {
            //Abre modal.
            $uibModal.open({
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'webapp/app/confirmacao/views/alterarend.html',
                size: 'lg',
                controller: function ($scope) {
                    //CONTROLLER MODAL

                    //Esconde inputs e campos para alterar o endereço.
                    $scope.input = true;
                    $scope.campo = true;
                    //Endereço selecionado armazenado no storage.
                    var id = $localStorage.enderecoId;
                    //Envia id para pegar endereço por ID.
                    var $res = $http({
                        url: "enderecoPorId?id=" + id,
                        method: "get",
                        headers: {'Content-Type': 'application/json'}
                    });
                    $res.success(function (data) {
                        $scope.endereco = data;
                    });

                    //Habilita campos para alterar endereço selecionado
                    $scope.alterarEsteEndereco = function () {
                        $scope.input = false;
                        $scope.campo = false;
                    };

                    //Salva modificações.
                    $scope.salvarAlteracao = function (endereco) {
                        var res = $http.post('alterarEndereco', endereco);
                        res.success(function (data) {
                            $uibModalStack.dismissAll();
                            $window.location.reload();
                        });
                    };

                    //Fecha modal.
                    $scope.Fechar = function () {
                        $uibModalStack.dismissAll();
                        delete $localStorage.enderecoId;
                    };
                }
            });
        }
    };

    this.excluirEsteEndereco = function (id) {
        swal({
            title: "Você tem certeza que deseja excluir este endereço?",
            text: "Você ainda poderá cadastrar outros endereços!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim",
            cancelButtonText: "Não!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
                function (isConfirm) {
                    if (isConfirm) {
                        $http({
                            method: 'PUT',
                            url: 'excluirEndereco?endereco=' + id,
                            headers: {'Content-Type': 'application/json'}
                        });
                        swal("Deletado!", "Endereço deletado com sucesso", "success");

                    } else {
                        swal("Cancelado", "Operação cancelada.", "info");
                        $window.location.reload();
                    }
                });
    };

    this.alterarSenha = function (item) {
        var senhaAtual = item.atualSenha;
        var senhaNova = item.novaSenha;
        var confirmar = item.confirmarSenha;

        if (senhaAtual !== item.cliente.senha) {
            swal("Senha atual não confere", "Aparentemente a senha atual que você digitou não está correta.", "error");
        } else {
            if (senhaNova !== confirmar) {
                swal("Senhas erradas", "Senhas não conferem", "error");
            } else {
                var cliente = {
                    idCliente: item.cliente.idCliente,
                    senha: senhaNova
                };
                $http.post('alterarSenha', cliente);
                swal("Senha alterada", "Senha alterada com sucesso!", "success");
                $state.go('cliente');
            }
        }
    };
});