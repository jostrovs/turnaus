
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