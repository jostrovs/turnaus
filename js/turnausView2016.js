// Turnauksen yleisiä juttuja
var app = angular.module('myApp', []);
app.controller('turnausView', function($timeout, $scope) {
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
        });        
    };

    $scope.load();

})
.directive('sarjaView', function($timeout){
    return {
        restrict: 'E',
        scope: {
            sarja: '='
        },
        templateUrl: 'templates/sarja-view.html',
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
.directive('tulostauluView', function($timeout){
    return {
        restrict: 'E',
        scope: {
            tulostaulu: '='
        },
        templateUrl: 'templates/tulostaulu-view.html',
        controller: function($scope, $element, $attrs){
            $timeout(function(){
                jj_init();
            });
        }
    };
})
.directive('lohkoView', function($timeout){
    return {
        restrict: 'E',
        scope: {
            lohko: '='
        },
        templateUrl: 'templates/lohko-view.html',
        controller: function($scope, $element, $attrs){
            $timeout(function(){
                jj_init();
            });
        }
    };
})
.directive('sijoituslohkoView', function($timeout){
    return {
        restrict: 'E',
        scope: {
            lohko: '='
        },
        templateUrl: 'templates/sijoituslohko-view.html',
        controller: function($scope, $element, $attrs){
            $timeout(function(){
                jj_init();
            });
        }
    };
});

