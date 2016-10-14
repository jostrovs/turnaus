$(document).ready(function () {
    var app = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue!',
            turnaus: new Turnaus(),
            alertShown: false,
            alertText: "eipä tässä...",
            alertTimeout: null
        },
        created: function () {
            this.loadAjax();
        },
        methods: {
            save: function(){
                let cbThis=this;
                let s = JSON.stringify(this.turnaus);
                josSaveJson(JOS_TURNAUS_2017, s, function(){
                    cbThis.showAlert("Turnaus ladattu.", 2000);
                });
            },
            showAlert: function(message, timeout){
                let cbThis=this;
                if(cbThis.alertTimeout != null) clearTimeout(cbThis.alertTimeout); // Estetään edellisiä sulkemasta tätä
                this.alertText = message;
                this.alertShown = true;
                if(timeout !== undefined){
                    cbThis.alertTimeout = setTimeout(function(){
                        cbThis.alertShown=false;
                    }, timeout);
                }
            },
            loadAjax: function () {
                let cbThis=this;
                josLoadJson(JOS_TURNAUS_2017, function (d) {
                    let s = JSON.parse(d);
                    //let s = luoTurnaus();
                    cbThis.turnaus = luoTurnausS(s);
                    cbThis.showAlert("Turnaus ladattu.", 2000);
                });
            }
        }
    });
});

