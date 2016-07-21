// Sarja
var id=1;

var Sarja = function(nimi, lyhenne){
    this.nimi = nimi;
    this.lyhenne = lyhenne;
    
    this.id="sarja" + (id++).toString();

    this.toggle=function(){
        $("#" + this.id).toggle();
    }

    this.joukkueet = function(){
        var ret = [];
        for(var i=0;i<this.alkulohkot.length;i++) ret = ret.concat(this.alkulohkot[i].joukkueet);
        return ret;   
    }

    this.alkulohkot = [];
    this.sijoituslohkot = [];

    this.addAlkuLohko = function(){
        this.alkulohkot.push(new Lohko("** lohkon nimi puuttuu **", []));
    };
    this.addSijoitusLohko = function(){
        this.sijoituslohkot.push(new Lohko("** lohkon nimi puuttuu **", []));
    };

    this.popAlkuLohko = function(){
        this.alkulohkot.pop();
    };
    this.popSijoitusLohko = function(){
        this.sijoituslohkot.pop();
    };
};
