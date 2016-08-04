// Joukkue

var Joukkue = function(nimi, lyhenne){
    this.nimi = nimi;
    this._lyh = lyhenne;
    this.lyhenne = ""; // Tämä on vain getteri

    this.getNimi=function(){
        return nimi;
    };

    this.showLyhenne=function(){
        return this._lyh != undefined && this.nimi !== this._lyh;
    }

    if(this.showLyhenne()) this.lyhenne = this._lyh;
    else this.lyhenne = this.nimi;
};
