// Turnauksen yleisiä juttuja
var app = angular.module('myApp', []);
app.controller('turnaus', function($timeout, $scope) {
    $scope.turnaus = luoTurnaus();
    $scope.asJson=JSON.stringify($scope.turnaus);
    $timeout(function(){
        jj_init();
    });
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
.directive('joukkueView', function($timeout){
    return {
        restrict: 'E',
        scope: {
            joukkue: '='
        },
        templateUrl: 'templates/joukkue-view.html',
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
}).directive('lohkoEditori', function($timeout){
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
});


// Turnaus
var Turnaus = function(){
    this.pvm = new Date(2017, 0, 4, 0, 0, 0);
    this.vuosi = function(){ 
        return this.pvm.getFullYear(); 
    }

    this.sarjat = [];
};