// Tulostaulu
var Tulostaulu = function(lohko){
    this.rivit = [];
    
    for(let joukkue of lohko.joukkueet){
        let rivi = new Rivi(joukkue);

        for(let ottelu of lohko.ottelut){
            if(ottelu.koti != joukkue && ottelu.vieras != joukkue) continue;

            var tulos = ottelu.parseTulos();
            
            if(ottelu.koti == joukkue) rivi.addKoti(tulos);
            if(ottelu.vieras == joukkue) rivi.addVieras(tulos);
        }

        this.rivit.push(rivi);
    }
};

// Rivi
var Rivi = function(joukkue){
    this.joukkue = joukkue;
    this.nimi =joukkue.nimi;
    this.ottelut=0;
    this.voitot =0;
    this.tappiot =0;
    this.ero=0;

    this.erat = 0;
    this.eraplus = 0;
    this.eraminus = 0;

    this.pisteet = 0;
    this.pisteplus = 0;
    this.pisteminus = 0;

    this.sija=0;

    this.addKoti = function(tulos){
        //  kotierat: 0,
        //  vieraserat: 0,
        //  totalerat: 0,
        //  kotipisteet: [0],
        //  vieraspisteet: [0],
        //  ero: 0,
        //  kotivoitto: 0,
        //  vierasvoitto: 0
        if(tulos.kotierat + tulos.vieraserat > 0) this.ottelut++;

        this.erat += tulos.kotierat - tulos.vieraserat;
        this.eraplus += tulos.kotierat;
        this.eraminus += tulos.vieraserat;

        for(let kp of tulos.kotipisteet){
            let kotipisteet = parseInt(kp, 10);
            this.pisteet += kotipisteet;
            this.pisteplus += kotipisteet;
        }
        for(let vp of tulos.vieraspisteet){
            let vieraspisteet = parseInt(vp, 10);
            this.pisteet -= vieraspisteet;
            this.pisteminus += vieraspisteet;
        }
        
        if(tulos.kotivoitto > 0){
             this.voitot++;
        }
        if(tulos.vierasvoitto > 0){
             this.tappiot++;
        }
    };
    this.addVieras = function(tulos){
        //  kotierat: 0,
        //  vieraserat: 0,
        //  totalerat: 0,
        //  kotipisteet: [0],
        //  vieraspisteet: [0],
        //  ero: 0,
        //  kotivoitto: 0,
        //  vierasvoitto: 0

        if(tulos.kotierat + tulos.vieraserat > 0) this.ottelut++;

        this.erat += tulos.vieraserat - tulos.kotierat;
        this.eraplus += tulos.vieraserat;
        this.eraminus += tulos.kotierat;

        for(let kp of tulos.kotipisteet){
            let kotipisteet = parseInt(kp, 10);
            this.pisteet -= kotipisteet;
            this.pisteminus += kotipisteet;
        }
        for(let vp of tulos.vieraspisteet){
            let vieraspisteet = parseInt(vp, 10);
            this.pisteet += vieraspisteet;
            this.pisteplus += vieraspisteet;
        }
        
        if(tulos.kotivoitto > 0){
             this.tappiot++;
        }
        if(tulos.vierasvoitto > 0){
             this.voitot++;
        }
    };
};