// Sarja
var Sarja = function (nimi, lyhenne) {
    this.id = "sarja" + lyhenne;
    this.nimi = nimi;
    this.lyhenne = lyhenne;

    this.joukkueet = function () {
        var ret = [];
        for (var i = 0; i < this.alkulohkot.length; i++) ret = ret.concat(this.alkulohkot[i].joukkueet);
        return ret;
    }

    this.alkulohkot = [];
    this.sijoituslohkot = [];

    this.addAlkuLohko = function () {
        this.alkulohkot.push(new Lohko("** lohkon nimi puuttuu **", []));
    };
    this.addSijoitusLohko = function () {
        this.sijoituslohkot.push(new Lohko("** lohkon nimi puuttuu **", []));
    };

    this.popAlkuLohko = function () {
        this.alkulohkot.pop();
    };
    this.popSijoitusLohko = function () {
        this.sijoituslohkot.pop();
    };

    this.numeroiOttelut = function (seed = 1) {
        // Numeroidaan kaikki ottelut uudelleen
        for (let lohko of this.alkulohkot) {
            seed = lohko.numeroiOttelut(seed);
        }
        for (let lohko of this.sijoituslohkot) {
            seed = lohko.numeroiOttelut(seed);
        }

        return seed;
    };
};
