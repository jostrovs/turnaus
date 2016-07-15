// Lohko
var Lohko = function(nimi, joukkueet, roundRobin){
    this.nimi = nimi;

    this.roundRobin = roundRobin;

    this.joukkueet = joukkueet;

    this.ottelut = [];

    this.addJoukkue = function(){
        this.joukkueet.push(new Joukkue("** joukkueen nimi puuttuu **"));
    };

    this.popJoukkue = function(){
        this.joukkueet.pop();
    };

    this.laskeTulokset = function(){
        console.log("Lasken tulokset lohkolle " + this.nimi);
    };

    this.tulostaulu=`
        ------------------
        1. Ekana kana
        2. Tokana takana
        3. Kolkkana kelkka
        4. Nelkkänä telkkä
        ------------------
    `;
};