// Turnauksen yleisiä juttuja
var app = angular.module('myApp', []);
app.controller('turnausEditori', function($timeout, $scope) {
    $scope.turnaus = null;//luoTurnaus();

    $timeout(function(){
        jj_init();
    });

    $scope.save = function(){
        let s = JSON.stringify($scope.turnaus);
        josSaveJson(JOS_TURNAUS_2017, s);
        $("#save").notify("Talletettu.", {autoHideDelay: 2000, gap: 4, className: 'success'});
    };

    $scope.load = function(){
        $scope.turnaus = null;
        josLoadJson(JOS_TURNAUS_2017, function (d) {
            let s = JSON.parse(d);
            //let s = luoTurnaus();
            $scope.turnaus = luoTurnausS(s);
            $("#load").notify("Ladattu.", {autoHideDelay: 2000, gap: 4, className: 'success'});
        });        
    };

    $scope.load();

})
.directive('sarjaEditori', function($timeout){
    return {
        restrict: 'E',
        scope: {
            sarja: '='
        },
        templateUrl: 'templates/sarja-editori.html',
        controller: function($scope, $element, $attrs){
            $timeout(function(){
                jj_init();
            });
        }
    };
})
.directive('joukkueEditori', function($timeout){
    return {
        restrict: 'E',
        scope: {
            joukkue: '='
        },
        templateUrl: 'templates/joukkue-editori.html',
        controller: function($scope, $element, $attrs){
            $timeout(function(){
                jj_init();
            });
        }
    };
})
.directive('tulostauluEditori', function($timeout){
    return {
        restrict: 'E',
        scope: {
            tulostaulu: '='
        },
        templateUrl: 'templates/tulostaulu-editori.html',
        controller: function($scope, $element, $attrs){
            $timeout(function(){
                jj_init();
            });
        }
    };
})
.directive('lohkoEditori', function($timeout){
    return {
        restrict: 'E',
        scope: {
            lohko: '='
        },
        templateUrl: 'templates/lohko-editori.html',
        controller: function($scope, $element, $attrs){
            $timeout(function(){
                jj_init();
            });
        }
    };
})
.directive('sijoituslohkoEditori', function($timeout){
    return {
        restrict: 'E',
        scope: {
            lohko: '='
        },
        templateUrl: 'templates/sijoituslohko-editori.html',
        controller: function($scope, $element, $attrs){
            $timeout(function(){
                jj_init();
            });
        }
    };
});


// Turnaus
var Turnaus = function(){
    this.pvm = "5.1.2017";
    this.vuosi = 2017;

    this.sarjat = [];

    this.numeroiOttelut = function(){
        // Numeroidaan kaikki ottelut uudelleen
        let no = 1;
        for(let sarja of this.sarjat) no = sarja.numeroiOttelut(no);
    }
};