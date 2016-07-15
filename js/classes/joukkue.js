// Joukkue

var Joukkue = function(nimi, lyhenne){
    this.nimi = nimi;
    this.lyhenne = lyhenne;

    this.getNimi=function(){
        return nimi;
    };

    this.showLyhenne=function(){
        return this.lyhenne != undefined && this.nimi !== this.lyhenne;
    }
};
