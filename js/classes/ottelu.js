// Ottelu

var no = 1;

var Ottelu = function(koti, vieras, tuomari, tulos){
    this.no = no++;
    this.koti = koti;
    this.vieras = vieras;
    this.tuomari = tuomari;
    this.tuomariEditable = false;
    this.tulos = tulos;
    this.onChange = function(){
        let t = this.tulos.toString();
        this.tulos = pikasyote(this.tulos);

        let tulos = this.parseTulos(/* markRead */ false);
        this.ero = tulos.ero.toString();
        if(tulos.ero > 0) this.ero = "+" + this.ero;
    }

    this.viimeksiLuettuTulos = tulos; // Tällä kontrolloidaan sitä, onko lohkon tuloslista ajan tasalla vai ei
    this.lueTulos = function(){
        this.viimeksiLuettuTulos = this.tulos;
        return this.tulos;
    };
    this.onMuuttunut = function(){
        return this.viimeksiLuettuTulos !== this.tulos;
    };

    this.getKoti = function(){
        if(!this.koti) return "";
        if(!this.koti.lyhenne){
            if(this.koti.nimi) return this.koti.nimi;
            return this.koti;
        }
        return this.koti.lyhenne;
    };
    this.getVieras = function(){
        if(!this.vieras) return "";
        if(!this.vieras.lyhenne){
            if(this.vieras.nimi) return this.vieras.nimi;        
            return this.vieras;
        }
        return this.vieras.lyhenne;
    };
    this.getTuomari = function(){
        if(!this.tuomari) return "";
        if(this.tuomariEditable) return this.tuomari;
        if(!this.tuomari.lyhenne){
            if(this.tuomari.nimi) return this.tuomari.nimi;
            return this.tuomari;
        }
        return this.tuomari.lyhenne;
    };

    this.parseTulos = function (markRead=true) { // MarkRead: merkitäänkö ottelun tulos luetuksi
        // parseTulos lukee "2-0 (25-23, 26-24)" -muodossa olevan tuloksen.
        var a = {
            kotierat: 0,
            vieraserat: 0,
            totalerat: 0,
            kotipisteet: [0],
            vieraspisteet: [0],
            ero: 0,
            kotivoitto: 0,
            vierasvoitto: 0
        };
        
        let tulos ="";
        if(markRead){
            tulos = this.lueTulos();
        } else {
            tulos = this.tulos;
        }

        if (tulos == null || tulos.length < 3) return a;
        a.kotierat = parseInt(tulos.charAt(0));
        a.vieraserat = parseInt(tulos.charAt(2));

        a.totalerat = a.kotierat + a.vieraserat;

        var koti = [];
        var vieras = [];
        var f = tulos.indexOf("(");
        var l = tulos.indexOf(")");
        var p = tulos.substr(f + 1, l - f - 1);
        var erat = p.split(", ");
        var ero = 0;
        for (var i = 0; i < erat.length; i++) {
            var pist = erat[i].split("-");
            koti.push(pist[0]);
            vieras.push(pist[1]);
            ero += pist[0] - pist[1];
        }

        a.kotipisteet = koti;
        a.vieraspisteet = vieras;

        a.ero = ero;
        if (a.kotierat > a.vieraserat) a.kotivoitto = 1;
        if (a.kotierat < a.vieraserat) a.vierasvoitto = 1;
        return a;
    };    
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