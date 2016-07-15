///////////////////////////////////////
// Luontifunktiot

var luoTurnaus = function(){
    let turnaus = new Turnaus();
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
        joukkueet.push(new Joukkue(n, "J" + i.toString()));
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

var luoAlku4 = function(joukkueet, lohkoCallback){
    var ret = [];
    ret.push(new Ottelu(joukkueet[0], joukkueet[1], joukkueet[2], ""));
    ret.push(new Ottelu(joukkueet[1], joukkueet[2], joukkueet[3], ""));
    ret.push(new Ottelu(joukkueet[2], joukkueet[3], joukkueet[0], ""));
    ret.push(new Ottelu(joukkueet[3], joukkueet[0], joukkueet[1], ""));
    return ret;
};

