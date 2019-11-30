(function () {
    var app = angular.module('AppProvider', []);

    app.factory('AppService', function ($http, $q) {
        var service = {};

        service.contextPath = 'https://venados.dacodes.mx/api';

        service.games = function(){
            return $http({
                method: 'GET',
                url: service.contextPath + '/games',
                headers: {'Accept': 'application/json'}
            });
        };

        service.findPlayers = function () {
            return $http({
                method: 'GET',
                url: service.contextPath + '/players',
                headers: {'Accept': 'application/json'}
            });
        };

        return service;

    });

})();