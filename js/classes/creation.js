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
    joukkueet.push(new Joukkue("Malmin Urheilijat", "MU"));
    joukkueet.push(new Joukkue("Korson Veto", "KoVe"));
    joukkueet.push(new Joukkue("Vantaan Lentopallo", "VanLe"));
    joukkueet.push(new Joukkue("Sahra Pallo", "SahPa"));
    joukkueet.push(new Joukkue("Dynamo"));
    joukkueet.push(new Joukkue("Kontulan Kunto", "Kunto"));
    joukkueet.push(new Joukkue("Kaivos-Veikot", "KaVe"));
    joukkueet.push(new Joukkue("Poliisien Palloseura", "PPS"));



    var lohkoon1 = joukkueet.slice(0,4);
    var lohkoon2 = joukkueet.slice(4,8);

    sarja.alkulohkot.push(luoLohko(nimi + " alku 1", lohkoon1, luoAlku4));
    sarja.alkulohkot.push(luoLohko(nimi + " alku 2", lohkoon2, luoAlku4));
    return sarja;
};

var luoLohko = function(nimi, joukkueet, otteluFunktio){
    var lohko = new Lohko(nimi, joukkueet);
    lohko.ottelut = otteluFunktio(joukkueet);
    lohko.laskeTulokset();
    return lohko;
};

var luoAlku4 = function(joukkueet){
    var ret = [];
    ret.push(new Ottelu(joukkueet[0], joukkueet[1], joukkueet[2], "2-0 (25-22, 25-22)"));
    ret.push(new Ottelu(joukkueet[1], joukkueet[2], joukkueet[3], "2-1 (25-12, 10-25, 15-12)"));
    ret.push(new Ottelu(joukkueet[2], joukkueet[3], joukkueet[0], "2-0 (25-20, 25-22)"));
    ret.push(new Ottelu(joukkueet[3], joukkueet[0], joukkueet[1], "2-0 (25-21, 25-18)"));
    return ret;
};

