app.service('MenuConsoleService', function ($http, $localStorage, $state) {

    this.exibirAcessoriosNesteConsole = function (id) {
        var $res = $http({
            url: 'exibirAcessoriosPorConsole?id=' + id,
            method: "get",
            contentType: "application/json"
        });
        $res.success(function (data) {
            $localStorage.acessoriosInConsole = data;
            $state.go('acessorios');
        });
    };
});
