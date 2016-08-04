// Tulostaulu
var Tulostaulu = function (lohko) {
    this.rivit = [];
    this.selitys = "";

    this.teeRivit = function () {
        this.rivit = [];
        for (let joukkue of lohko.joukkueet) {
            let rivi = new Rivi(joukkue);

            for (let ottelu of lohko.ottelut) {
                if (ottelu.koti != joukkue && ottelu.vieras != joukkue) continue;

                var tulos = ottelu.parseTulos();

                if (ottelu.koti == joukkue) rivi.addKoti(tulos);
                if (ottelu.vieras == joukkue) rivi.addVieras(tulos);
            }
            rivi.totalErat = rivi.getTotalEraString();
            rivi.totalPisteet = rivi.getTotalPisteString();

            this.rivit.push(rivi);
        }

        // Sijoitukset
        this.rivit.sort(function (a, b) {
            if (a.erat < b.erat) return 1;
            if (a.erat > b.erat) return -1;
            if (a.pisteet < b.pisteet) return 1;
            if (a.pisteet > b.pisteet) return -1;
            return 0;
        });

        let sija = 1;
        for (let rivi of this.rivit) {
            rivi.sija = sija++;
        }
    }
    this.laskeUudestaan = function () {
        this.teeRivit();
    }

    this.laskeUudestaan();
};

// Rivi
var Rivi = function (joukkue) {
    this.joukkue = joukkue;
    this.nimi = joukkue.nimi;
    this.ottelut = 0;
    this.voitot = 0;
    this.tappiot = 0;
    this.ero = 0;

    this.erat = 0;
    this.eraplus = 0;
    this.eraminus = 0;

    this.pisteet = 0;
    this.pisteplus = 0;
    this.pisteminus = 0;

    this.sija = 0;

    this.era_total_arr = [];
    this.piste_total_arr = [];

    this.getTotalEraString = function () {
        // Palauttaa erät muodossa "1 + 0 + 1 = 2"
        let ret = "";
        let total = 0;
        for (let era of this.era_total_arr) {
            if (era >= 0) {
                if (ret.length > 0) ret += " + ";
                ret += era.toString();
            } else {
                if (ret.length > 0) ret += "-";
                else ret += " - ";
                ret += (-era).toString();
            }
            total += era;
        }

        if (ret.length > 0) {
            ret += " = ";
            ret += total.toString();
        }

        return ret;
    }

    this.getTotalPisteString = function () {
        // Palauttaa pisteet muodossa "1 - 5 + 10 = +6"
        let ret = "";
        let total = 0;
        for (let piste of this.piste_total_arr) {
            if (piste >= 0) {
                if (ret.length > 0) ret += " + ";
                else if(piste > 0) ret += "+";
                ret += piste.toString();
            } else {
                if (ret.length > 0) ret += " - ";
                else ret += "-";
                ret += (-piste).toString();
            }
            total += piste;
        }

        if (ret.length > 0) {
            ret += " = ";
            if (total > 0) ret += "+";
            ret += total.toString();
        }

        return ret;
    }

    this.addKoti = function (tulos) {
        //  kotierat: 0,
        //  vieraserat: 0,
        //  totalerat: 0,
        //  kotipisteet: [0],
        //  vieraspisteet: [0],
        //  ero: 0,
        //  kotivoitto: 0,
        //  vierasvoitto: 0
        
        if (tulos.kotierat + tulos.vieraserat > 0) this.ottelut++;
        else return;

        this.erat += tulos.kotierat - tulos.vieraserat;
        this.eraplus += tulos.kotierat;
        this.eraminus += tulos.vieraserat;

        this.era_total_arr.push(tulos.kotierat);

        let ottelunPisteet = 0;
        for (let kp of tulos.kotipisteet) {
            let kotipisteet = parseInt(kp, 10);
            if (!isNaN(kotipisteet)) {
                this.pisteet += kotipisteet;
                this.pisteplus += kotipisteet;
                ottelunPisteet += kotipisteet;
            }
        }
        for (let vp of tulos.vieraspisteet) {
            let vieraspisteet = parseInt(vp, 10);
            if (!isNaN(vieraspisteet)) {
                this.pisteet -= vieraspisteet;
                this.pisteminus += vieraspisteet;
                ottelunPisteet -= vieraspisteet;
            }
        }

        this.piste_total_arr.push(ottelunPisteet);

        if (tulos.kotivoitto > 0) {
            this.voitot++;
        }
        if (tulos.vierasvoitto > 0) {
            this.tappiot++;
        }
    };
    this.addVieras = function (tulos) {
        //  kotierat: 0,
        //  vieraserat: 0,
        //  totalerat: 0,
        //  kotipisteet: [0],
        //  vieraspisteet: [0],
        //  ero: 0,
        //  kotivoitto: 0,
        //  vierasvoitto: 0

        if (tulos.kotierat + tulos.vieraserat > 0) this.ottelut++;
        else return;

        this.erat += tulos.vieraserat - tulos.kotierat;
        this.eraplus += tulos.vieraserat;
        this.eraminus += tulos.kotierat;

        this.era_total_arr.push(tulos.vieraserat);

        let ottelunPisteet = 0;
        for (let kp of tulos.kotipisteet) {
            let kotipisteet = parseInt(kp, 10);
            if (!isNaN(kotipisteet)) {
                this.pisteet -= kotipisteet;
                this.pisteminus += kotipisteet;
                ottelunPisteet -= kotipisteet;
            }
        }
        for (let vp of tulos.vieraspisteet) {
            let vieraspisteet = parseInt(vp, 10);
            if (!isNaN(vieraspisteet)) {
                this.pisteet += vieraspisteet;
                this.pisteplus += vieraspisteet;
                ottelunPisteet += vieraspisteet;
            }
        }

        this.piste_total_arr.push(ottelunPisteet);

        if (tulos.kotivoitto > 0) {
            this.tappiot++;
        }
        if (tulos.vierasvoitto > 0) {
            this.voitot++;
        }
    };
};