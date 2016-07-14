// Turnauksen yleisiä juttuja
var app = angular.module('myApp', []);
app.controller('turnaus', function($scope) {
    $scope.turnaus = luoTurnaus();
    $scope.asJson=JSON.stringify($scope.turnaus);
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
.directive('lohkoEditori', function(){
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

// Sarja
var Sarja = function(nimi){
    this.nimi = nimi;

    this.joukkueet = function(){
        var ret = [];
        for(var i=0;i<this.alkulohkot.length;i++) ret = ret.concat(this.alkulohkot[i].joukkueet);
        return ret;   
    }

    this.alkulohkot = [];
    this.sijoituslohkot = [];

    this.addAlkuLohko = function(){
        this.alkulohkot.push(new Lohko("** lohkon nimi puuttuu **", []));
    };
    this.addSijoitusLohko = function(){
        this.sijoituslohkot.push(new Lohko("** lohkon nimi puuttuu **", []));
    };

    this.popAlkuLohko = function(){
        this.alkulohkot.pop();
    };
    this.popSijoitusLohko = function(){
        this.sijoituslohkot.pop();
    };
};

// Lohko
var Lohko = function(nimi, joukkueet){
    this.nimi = nimi;

    this.joukkueet = joukkueet;

    this.ottelut = [];

    this.addJoukkue = function(){
        this.joukkueet.push(new Joukkue("** joukkueen nimi puuttuu **"));
    };

    this.popJoukkue = function(){
        this.joukkueet.pop();
    };
};

// Ottelu
var Ottelu = function(koti, vieras, tuomari, tulos){
    this.koti = koti;
    this.vieras = vieras;
    this.tuomari = tuomari;
    this.tulos = tulos;
    this.onChange = function(){
        this.tulos = pikasyote(this.tulos);
    }
};

// Joukkue
var Joukkue = function(nimi){
    this.nimi = nimi;
};






///////////////////////////////////////
// Luontifunktiot

var luoTurnaus = function(){
    var turnaus = new Turnaus();
    turnaus.pvm = new Date(2017, 0, 5, 0, 0, 0);
    turnaus.sarjat.push(luoSarja('Miehet A'));
    turnaus.sarjat.push(luoSarja('Miehet B'));
    turnaus.sarjat.push(luoSarja('Miehet C'));
    turnaus.sarjat.push(luoSarja('Naiset A'));
    turnaus.sarjat.push(luoSarja('Naiset B'));
    return turnaus;
};

var luoSarja = function(nimi){
    var sarja = new Sarja(nimi);

    var joukkueet = [];
    for(var i=1;i<9;i++){
        var n = nimi + " joukkue " + i.toString();
        joukkueet.push(new Joukkue(n));
    }

    var lohkoon1 = joukkueet.slice(0,4);
    var lohkoon2 = joukkueet.slice(4,8);

    sarja.alkulohkot.push(luoLohko(nimi + " alku 1", lohkoon1, luoAlku4));
    sarja.alkulohkot.push(luoLohko(nimi + " alku 2", lohkoon2, luoAlku4));
    return sarja;
};

var luoLohko = function(nimi, joukkueet, otteluFunktio){
    var lohko = new Lohko(nimi, joukkueet);
    lohko.ottelut = otteluFunktio(joukkueet);
    return lohko;
};

var luoAlku4 = function(joukkueet){
    var ret = [];
    ret.push(new Ottelu(joukkueet[0], joukkueet[1], joukkueet[2], ""));
    ret.push(new Ottelu(joukkueet[1], joukkueet[2], joukkueet[3], ""));
    ret.push(new Ottelu(joukkueet[2], joukkueet[3], joukkueet[0], ""));
    ret.push(new Ottelu(joukkueet[3], joukkueet[0], joukkueet[1], ""));
    return ret;
};











/////////////////////////////////////////////////////////////////////////////////

var pikasyote = function (value) {
    // Pikasyöte muokkaa lyhyen muodon pidemmäksi, jota parseOttelu osaa lukea
    // Esim: "201122" -> "2-0 (25-11, 25-22)"
    //       "21252021251513" -> "2-1 (25-20, 21-25, 15-13)"
    if (value.length < 2) return value;
    var nums = '0123456789';
    for (var i = 0; i < value.length; i++) {
        if (nums.indexOf(value.charAt(i)) < 0) return value;
    }

    var koti = parseInt(value.charAt(0));
    var vieras = parseInt(value.charAt(1));

    var pisteet = [];
    for (var i = 2; i < value.length; i += 2) {
        pisteet.push(parseInt(value.substr(i, 2)));
    }

    var e = koti + "-" + vieras;

    var p = '';

    if (koti < 1) {
        if (value.length < (koti + vieras) * 2 + 2) return value; // Ei ole tarvittavaa määrää merkkejä pikasyötettä varten
        // Vieras voitti nollille. Tehdään pisteosuus:
        for (var i = 0; i < pisteet.length; i++) {
            if (p != '') p += ", ";
            p += pisteet[i].toString() + "-";
            if (pisteet[i] > 23) p += (pisteet[i] + 2).toString();
            else p += "25";
        }
    } else if (vieras < 1) {
        if (value.length < (koti + vieras) * 2 + 2) return value; // Ei ole tarvittavaa määrää merkkejä pikasyötettä varten
        // Koti voitti nollille. Tehdään pisteosuus:
        for (var i = 0; i < pisteet.length; i++) {
            if (p != '') p += ", ";
            if (pisteet[i] > 23) p += (pisteet[i] + 2).toString();
            else p += "25";
            p += "-" + pisteet[i].toString();
        }
    } else {
        // Kummankaan erät eivät ole nollilla -> molempien pisteet on lueteltu
        if (value.length < (koti + vieras) * 4 + 2) return value; // Ei ole tarvittavaa määrää merkkejä pikasyötettä varten
        for (var i = 0; i < pisteet.length - 1; i += 2) {
            if (p != '') p += ", ";
            p += pisteet[i].toString() + "-" + pisteet[i + 1].toString();
        }
    }

    return e + " (" + p + ")";
}