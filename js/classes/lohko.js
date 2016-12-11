// Lohko

function Lohko(nimi, joukkueet, roundRobin, ylinsija){
    this.nimi = nimi;
    this.id = "lohko" + nimi;
    this.info = "";
    this.print_info = "";   // Tämä on _VAIN_ tulosteella, tulee lohkon alapuolelle, ja tarkoitus on kertoa, miten pelataan seuraavissa lohkoissa ym.

    this.selitys = ""; // Sijoituslohkon sijoitusten selittelyä. Alkulohkoissa on omansa

    this.ylinsija = ylinsija;
    if(ylinsija == undefined) ylinsija = 1;

    this.sijat=["Finaalin voittaja", "Finaalin häviäjä", "Pronssin voittaja", "Pronssin häviäjä"]; // Välierälohkon sijat

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
        let vanhaSelitys = this.tulostaulu.selitys;
        this.tulostaulu = new Tulostaulu(this);
        console.log("Lasken tulokset lohkolle " + this.nimi);
        this.tulosrivit = this.tulostaulu.rivit;
        this.tulostaulu.selitys = vanhaSelitys;
    };

    this.tulostaulu=new Tulostaulu(this);

    this.tulosrivit = [];

    this.laskeAlkutulokset = function(){
        // Lasketaan tulokset latauksen yhteydessä, jotta tulostaulu saadaan näkymään oikein
        if(this.roundRobin || this.joukkueet.length === 3 || this.joukkueet.length === 5){
            this.laskeTulokset();
        } else {
            this.laskeValiera();
        }        
    };

    this.laskeValiera = function(){
        this.sijat = [this.sijat[0], this.sijat[1], this.sijat[2], this.sijat[3]];
        
        var ylinsija = parseInt(this.ylinsija,10);

        // Jos ekan pelin tulos on olemassa, täytetään kahteen vikaan ekat joukkueet
        if(typeof this.ottelut[0].tulos !== 'undefined'){
            var t = this.ottelut[0].parseTulos();
            if(t.kotivoitto > 0){
                // kotivoitto
                this.ottelut[2].koti = this.ottelut[0].vieras;
                this.ottelut[3].koti = this.ottelut[0].koti;
            } else {
                // vierasvoitto
                this.ottelut[2].koti = this.ottelut[0].koti;
                this.ottelut[3].koti = this.ottelut[0].vieras;
            }
        }

        // Jos tokan pelin tulos on olemassa, täytetään kahteen vikaan toiset joukkueet
        if(typeof this.ottelut[1].tulos !== 'undefined'){
            var t = this.ottelut[1].parseTulos();
            if(t.kotivoitto > 0){
                // kotivoitto
                this.ottelut[2].vieras = this.ottelut[1].vieras;
                this.ottelut[3].vieras = this.ottelut[1].koti;
            } else {
                // vierasvoitto
                this.ottelut[2].vieras = this.ottelut[1].koti;
                this.ottelut[3].vieras = this.ottelut[1].vieras;
            }
        }

        // Jos kolmannen pelin tulos on olemassa, täytetään alimmat sijoitukset
        if(typeof this.ottelut[2].tulos !== 'undefined'){
            var t = this.ottelut[2].parseTulos();
            if(t.kotivoitto > 0){
                // kotivoitto
                this.sijat[2] = (ylinsija+2).toString() + ". " + this.ottelut[2].koti.nimi;
                this.sijat[3] = (ylinsija+3).toString() + ". " + this.ottelut[2].vieras.nimi;
            } else {
                // vierasvoitto
                this.sijat[2] = (ylinsija+2).toString() + ". " + this.ottelut[2].vieras.nimi;
                this.sijat[3] = (ylinsija+3).toString() + ". " + this.ottelut[2].koti.nimi;
            }
        }

        // Jos neljännen pelin tulos on olemassa, täytetään ylimmät sijoitukset
        if(typeof this.ottelut[3].tulos !== 'undefined'){
            var t = this.ottelut[3].parseTulos();
            if(t.kotivoitto > 0){
                // kotivoitto
                this.sijat[0] = (ylinsija+0).toString() + ". " + this.ottelut[3].koti.nimi;
                this.sijat[1] = (ylinsija+1).toString() + ". " + this.ottelut[3].vieras.nimi;
            } else {
                // vierasvoitto
                this.sijat[0] = (ylinsija+0).toString() + ". " + this.ottelut[3].vieras.nimi;
                this.sijat[1] = (ylinsija+1).toString() + ". " + this.ottelut[3].koti.nimi;
            }
        }
        this.tulosrivit = this.sijat;
    };

    this.onMuuttunut = function(){
        for(let ottelu of this.ottelut){
            if(ottelu.onMuuttunut()) return true;
        }
        return false;
    }

    this.arvoYksiTulos = function(){
        for(let ottelu of this.ottelut){
            if(ottelu.tulos == undefined || ottelu.tulos.length < 1){
                ottelu.tulos = arvoTulos(0.499);
                ottelu.onChange();
                return;
            }
        }
    }

    this.arvoKaikkiTulokset = function(){
        for(let ottelu of this.ottelut){
            ottelu.tulos = arvoTulos(0.499, 2, /* voittoerät */ false);
            ottelu.onChange();
        }
    }

    this.poistaOttelut = function(){
        this.ottelut = [];
    }

    this.luoOttelut = function(){
        if(this.roundRobin || this.joukkueet.length === 3 || this.joukkueet.length === 5){
            this.ottelut = luoRoundRobin(this.joukkueet);
        } else {
            this.ottelut = luoValiera(this.joukkueet);
        }
    }

    this.numeroiOttelut = function(seed=1){
        // Numeroidaan kaikki ottelut uudelleen
        for(let ottelu of this.ottelut) ottelu.no = seed++;
        return seed;
    }
};