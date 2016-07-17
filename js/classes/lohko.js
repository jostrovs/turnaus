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
        this.tulostaulu = new Tulostaulu(this);
        console.log("Lasken tulokset lohkolle " + this.nimi);
    };

    this.tulostaulu=new Tulostaulu(this);

    this.onMuuttunut = function(){
        for(let ottelu of this.ottelut){
            if(ottelu.onMuuttunut()) return true;
        }
        return false;
    }
};