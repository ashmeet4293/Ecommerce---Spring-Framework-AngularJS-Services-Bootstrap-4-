
app.service('ClienteService', function ($http, $localStorage, $state) {
    var id = $localStorage.idDoCliente;

    this.adicionar = function (item) {
        var $res = $http.post('cadastrarCliente', item.cliente);
        $res.then(function (data) {
            $localStorage.queroOId = data;
        });
        return $res;
    };

    this.adicionarEndereco = function (item) {

        var enderecoCadastro = {
            cep: item.endereco.cep,
            endereco: item.endereco.endereco,
            numero: item.endereco.numero,
            complemento: item.endereco.complemento,
            referencia: item.endereco.referencia,
            bairro: item.endereco.bairro,
            cidade: item.endereco.cidade,
            estado: item.endereco.estado,
            cliente: {idCliente: id}
        };

        var $res = $http({
            url: "criarEndereco",
            method: "POST",
            data: enderecoCadastro,
            headers: {'Content-Type': 'application/json'}
        });
        $res.success(function (data) {});
    };



    this.login = function (cliente) {
        var $res = $http.post('loginCliente', cliente);
        $res.then(function (data) {
            $localStorage.clienteLogado = data.data;
        });
        return $res;
    };

    this.alterar = function (cliente) {
        var res = $http.post('alterarCliente', cliente);
        res.then(function (data) {
            var resposta = data;
            swal("Sucesso", "Alteração efetuada com sucesso!", "success");
        });
    };

    this.verifica = function (cliente) {
        var $res = $http({
            url: 'verificaClienteCadastro',
            data: cliente,
            method: "POST",
            contentType: "application/json"
        });
        $res.success(function (data) {});
        return $res;
    };
});
