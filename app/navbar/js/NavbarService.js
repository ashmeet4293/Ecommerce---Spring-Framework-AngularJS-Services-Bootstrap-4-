app.service('NavbarService', function ($http, $localStorage, $state, $window) {

    this.getConsole = function () {
        var $retorno = $http.get('getConsoles');
        $retorno.then(function (data) {});
        return $retorno;
    };

    this.getJogosByConsole = function (id) {
        $localStorage.idConsole = id;
        var $res = $http({
            url: 'exibirJogosPorConsole?id=' + id,
            method: "get",
            contentType: "application/json"
        });
        $res.success(function (data) {
            $localStorage.jogoInConsole = data;
            $state.go("menuconsole");
        });
    };

    this.logoutCliente = function (cliente) {
        var $res = $http.post('logout', cliente);
        $res.then(function (data) {
            $localStorage.$reset();
            swal({
                title: "Volte sempre",
                text: "Saindo...",
                type: "info",
                showCancelButton: false,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            },
                    function () {
                        setTimeout(function () {
                            swal("Aguarde por favor!");
                            $state.go('home');
                            $window.location.reload();
                        }, 1000);
                    });
        });
        return $res;
    };
});
