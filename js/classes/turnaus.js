
// Turnaus
var Turnaus = function(){
    this.pvm = "6.1.2017";
    this.vuosi = 2017;

    this.sarjat = [ new Sarja("MA", "MA"),
                    new Sarja("MA", "MA"),
                    new Sarja("MA", "MA"),
                    new Sarja("MA", "MA"),
                    new Sarja("MA", "MA"),
    ];

    this.numeroiOttelut = function(){
        // Numeroidaan kaikki ottelut uudelleen
        let no = 1;
        for(let sarja of this.sarjat) no = sarja.numeroiOttelut(no);
    }
};