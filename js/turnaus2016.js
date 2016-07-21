// Turnauksen yleisiä juttuja
var app = angular.module('myApp', []);
app.controller('turnaus', function($scope) {
    $scope.turnaus = luoTurnaus();
    $scope.asJson=JSON.stringify($scope.turnaus);
})
.directive('sarjaEditori', function(){
    return {
        restrict: 'E',
        scope: {
            sarja: '='
        },
        templateUrl: 'templates/sarja-editori.html'
    };
})
.directive('joukkueEditori', function(){
    return {
        restrict: 'E',
        scope: {
            joukkue: '='
        },
        templateUrl: 'templates/joukkue-editori.html'
    };
})
.directive('joukkueView', function(){
    return {
        restrict: 'E',
        scope: {
            joukkue: '='
        },
        templateUrl: 'templates/joukkue-view.html'
    };
})
.directive('tulostauluEditori', function(){
    return {
        restrict: 'E',
        scope: {
            tulostaulu: '='
        },
        templateUrl: 'templates/tulostaulu-editori.html'
    };
}).directive('lohkoEditori', function(){
    return {
        restrict: 'E',
        scope: {
            lohko: '='
        },
        templateUrl: 'templates/lohko-editori.html'
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