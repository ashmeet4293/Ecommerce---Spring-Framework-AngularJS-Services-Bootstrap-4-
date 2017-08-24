app.service('ProdutoService', function ($http) {

    this.avaliacoes = function (id) {
        var $res = $http({
            url: "exibirAvaliacoesPorJogo?id=" + id,
            method: "get",
            headers: {'Content-Type': 'application/json'}
        });
        $res.then(function (data) {});
        return $res;
    };

    this.jogosPorConsole = function (id) {
        var $res = $http({
            url: "exibirJogosPorConsoleLimite?id=" + id,
            method: "get",
            headers: {'Content-Type': 'application/json'}
        });
        $res.then(function (data) {});
        return $res;
    };

    this.acessoriosPorConsole = function (id) {
        var $res = $http({
            url: "exibirAcessoriosPorConsoleLimite?id=" + id,
            method: "get",
            headers: {'Content-Type': 'application/json'}
        });
        $res.then(function (data) {});
        return $res;
    };
});