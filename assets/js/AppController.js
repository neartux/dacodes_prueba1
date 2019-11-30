(function (){
    var app = angular.module('App', ['AppProvider']);

    app.controller('AppController', function($scope, AppService) {
        var ctrl = this;
        ctrl.gameList = { copa: [], ascenso: [] };
        ctrl.playerList = { data: [] };
        ctrl.gameTypes = { copa: "Copa MX", copaTab: "active-div", ascenso: "Ascenso MX", ascensoTab: "inactive-div" };
        ctrl.pages = {};
        ctrl.months = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        ctrl.stadisticsTabs = {};
        ctrl.player = {};

        
        ctrl.init = function () {
            ctrl.pages = { home: true, stadistics: false, players: false };
            // Find games
            ctrl.findGames();
            // Fin palayers
            ctrl.findPlayers();
        };

        ctrl.goToStadisticsPage = function () {
            ctrl.pages.home = false;
            ctrl.pages.players = false;
            ctrl.pages.stadistics = true;
        };

        ctrl.findGames = function () {
            return AppService.games().then(function(res) {
                if (res.data.success) {
                    ctrl.filterGames(res.data.data.games);
                }
            });
        };

        ctrl.filterGames = function (games) {
            angular.forEach(games, function (game, key) {
                var partsDate = game.datetime.split("-");
                // Agrega la fecha
                game.day = parseInt(partsDate[2]);
                // Si la liga es de copa
                if (game.league === ctrl.gameTypes.copa) {
                    ctrl.addGameCopaToList(parseInt(partsDate[1]), game);
                } else if (game.league === ctrl.gameTypes.ascenso) { // Es liga de ascenso
                    ctrl.addGameAscensoToList(parseInt(partsDate[1]), game);
                }
            });
        };

        ctrl.addGameCopaToList = function (index, game) {
            if (ctrl.gameList.copa[index] === undefined) {
                ctrl.gameList.copa[index] = { month: ctrl.months[index], games: [] };
            }
            ctrl.gameList.copa[index].games.push(game);
        };

        ctrl.addGameAscensoToList = function (index, game) {
            if (ctrl.gameList.ascenso[index] === undefined) {
                ctrl.gameList.ascenso[index] = { month: ctrl.months[index], games: [] };
            }
            ctrl.gameList.ascenso[index].games.push(game);
        };

        ctrl.programerGame = function (game) {
            game.programed = true;
        };

        ctrl.goToHomePage = function () {
            ctrl.pages.players = false;
            ctrl.pages.stadistics = false;
            ctrl.pages.home = true;
        };

        ctrl.goToPlayersPage = function () {
            ctrl.pages.home = false;
            ctrl.pages.stadistics = false;
            ctrl.pages.players = true;
        };

        ctrl.findPlayers = function () {
            return AppService.findPlayers().then(function (res) {
                ctrl.playerList.data = res.data.data.team;
                console.info("ctrl.playerList.data = ", ctrl.playerList.data);
            });
        };

        ctrl.shoProfilePlayer = function (player) {
            ctrl.player = angular.copy(player);
            $("#modal-profile").modal();
        }

    });

})();
