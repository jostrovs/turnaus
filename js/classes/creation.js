///////////////////////////////////////
// Luontifunktiot

var luoTurnaus = function () {
    let turnaus = new Turnaus();
    turnaus.pvm = new Date(2017, 0, 5, 0, 0, 0);
    turnaus.sarjat.push(luoSarja('Miehet A', 'MA'));
    turnaus.sarjat.push(luoSarja('Miehet B', 'MB'));
    turnaus.sarjat.push(luoSarja('Miehet C', 'MC'));
    turnaus.sarjat.push(luoSarja('Naiset A', 'NA'));
    turnaus.sarjat.push(luoSarja('Naiset B', 'NB'));
    return turnaus;
};

var luoSarja = function (nimi, lyhenne) {
    var sarja = new Sarja(nimi, lyhenne);

    var joukkueet = [];
    joukkueet.push(new Joukkue("Malmin Urheilijat", "MU"));
    joukkueet.push(new Joukkue("Korson Veto", "KoVe"));
    joukkueet.push(new Joukkue("Vantaan Lentopallo", "VanLe"));
    joukkueet.push(new Joukkue("Sahra Pallo", "SahPa"));
    joukkueet.push(new Joukkue("Dynamo"));
    joukkueet.push(new Joukkue("Kontulan Kunto", "Kunto"));
    joukkueet.push(new Joukkue("Kaivos-Veikot", "KaVe"));
    joukkueet.push(new Joukkue("Poliisien Palloseura", "PPS"));



    var lohkoon1 = joukkueet.slice(0, 4);
    var lohkoon2 = joukkueet.slice(4, 8);

    sarja.alkulohkot.push(luoLohko(nimi + " alku 1", lohkoon1, luoRoundRobin));
    sarja.alkulohkot.push(luoLohko(nimi + " alku 2", lohkoon2, luoRoundRobin));
    return sarja;
};

var luoLohko = function (nimi, joukkueet, otteluFunktio) {
    var lohko = new Lohko(nimi, joukkueet);
    lohko.ottelut = otteluFunktio(joukkueet);
    lohko.laskeTulokset();
    return lohko;
};

var luoRoundRobin = function (joukkueet) {
    if (joukkueet.length < 3) throw "Ei voi luoda round robinia, kun joukkueita on alle 3.";
    if (joukkueet.length > 5) throw "Ei voi luoda round robinia, kun joukkueita on yli 5.";

    var ret = [];

    if (joukkueet.length == 3) {
        ret.push(new Ottelu(joukkueet[0], joukkueet[1], joukkueet[2]));
        ret.push(new Ottelu(joukkueet[1], joukkueet[2], joukkueet[3]));
        ret.push(new Ottelu(joukkueet[2], joukkueet[3], joukkueet[0]));
    }

    if (joukkueet.length == 4) {
        ret.push(new Ottelu(joukkueet[0], joukkueet[1], joukkueet[2]));
        ret.push(new Ottelu(joukkueet[2], joukkueet[3], joukkueet[1]));
        ret.push(new Ottelu(joukkueet[1], joukkueet[2], joukkueet[3]));
        ret.push(new Ottelu(joukkueet[0], joukkueet[3], joukkueet[2]));
        ret.push(new Ottelu(joukkueet[3], joukkueet[1], joukkueet[0]));
        ret.push(new Ottelu(joukkueet[2], joukkueet[0], joukkueet[3]));
    }

    if (joukkueet.length == 5) {
        ret.push(new Ottelu(joukkueet[0], joukkueet[1], joukkueet[2]));
        ret.push(new Ottelu(joukkueet[2], joukkueet[3], joukkueet[4]));
        ret.push(new Ottelu(joukkueet[4], joukkueet[1], joukkueet[3]));

        ret.push(new Ottelu(joukkueet[0], joukkueet[3], joukkueet[1]));
        ret.push(new Ottelu(joukkueet[2], joukkueet[4], joukkueet[0]));
        ret.push(new Ottelu(joukkueet[1], joukkueet[2], joukkueet[3]));

        ret.push(new Ottelu(joukkueet[0], joukkueet[4], joukkueet[1]));
        ret.push(new Ottelu(joukkueet[3], joukkueet[1], joukkueet[2]));
        ret.push(new Ottelu(joukkueet[2], joukkueet[0], joukkueet[4]));
        ret.push(new Ottelu(joukkueet[4], joukkueet[3], joukkueet[0]));
    }

    return ret;
};

