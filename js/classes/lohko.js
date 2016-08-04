// Lohko

function Lohko(nimi, joukkueet, roundRobin){
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
        this.ottelut = luoRoundRobin(this.joukkueet);
    }

    this.numeroiOttelut = function(seed=1){
        // Numeroidaan kaikki ottelut uudelleen
        for(let ottelu of this.ottelut) ottelu.no = seed++;
        return seed;
    }
};