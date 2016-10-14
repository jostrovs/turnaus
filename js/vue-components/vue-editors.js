Vue.component('vue-input', {
                template: `
                    <div class="form-group">
                        <label :for="randomId">{{ label }}:</label>
                        <input :id="randomId" :value="value" @input="onInput" class="form-control">
                    </div>
                `,
                props: ['value', 'label'],
                data: function () {
                    return {
                        randomId: this._uid
                    }
                },
                methods: {
                    onInput: function (event) {
                        this.$emit('input', event.target.value)
                    }
                },
});
Vue.component('vue-joukkuelista', {
              props: ['joukkueet'],
              template: `
                      <div class="panel panel-default joukkuelista">
                          <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" :href="collapseHref">Joukkueet:</a>
                            </h4>
                          </div>
                          <div :id="collapseId" class="panel-collapse collapse">
                            <div v-for="joukkue in joukkueet" class="panel-body">{{joukkue.nimi}} ({{joukkue.lyhenne}})</div>
                            <!--div class="panel-footer">Panel Footer</div-->
                          </div>
              
              `,
              data: function() {
                  return {
                      id: this._uid,
                      collapseId: this._uid,
                      collapseHref: "#" + this._uid.toString()
                  }
              }
});

Vue.component('vue-box', {
              props: ['teksti', 'otsikko'],
              template: `
                      <div class="panel panel-default vue-box">
                          <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" :href="collapseHref">{{otsikko}}</a>
                            </h4>
                          </div>
                          <div :id="collapseId" class="panel-collapse collapse in">
                            <div class="panel-body">{{teksti}}</div>
                          </div>
              
              `,
              data: function() {
                  return {
                      id: this._uid,
                      collapseId: this._uid,
                      collapseHref: "#" + this._uid.toString()
                  }
              }
});

Vue.component('vue-sarja', {
              props: ['sarja'],
              template: `
                  <div> 
                      <h1>{{ sarja.nimi }}</h1> 
                      <vue-input label="Info" v-model="sarja.info"></vue-input>
                      <vue-input label="Pelipaikat" v-model="sarja.pelipaikat"></vue-input>
                      <vue-joukkuelista :joukkueet="sarja.joukkueet()"></vue-joukkuelista>
                      <vue-lohko v-for="lohko in sarja.alkulohkot" :lohko="lohko"></vue-lohko>
                      <vue-lohko v-for="lohko in sarja.sijoituslohkot" :lohko="lohko"></vue-lohko>
                  </div>`
});

Vue.component('vue-lohko', {
              props: ['lohko'],
              data: function() {
                  return {
                      id: this._uid,
                      collapseId: this._uid,
                      collapseHref: "#" + this._uid.toString()
                  }
              },
              template: `<div class="panel panel-default"> 
                             <div class="panel-heading">
                                <h2 class="panel-title">
                                    <a data-toggle="collapse" :href="collapseHref">{{ lohko.nimi }}</a>
                                </h2>
                             </div>
                             <div :id="collapseId" class="panel-collapse collapse">
                                <div class="panel-body">
                                    <p>{{lohko.info}}</p>
                                        <div class="btn-group">
                                            <button @click="lohko.addJoukkue()" type="button" class="btn btn-primary">Lisää joukkue</button>
                                            <button @click="lohko.popJoukkue()" type="button" class="btn btn-danger">Poista joukkue</button>
                                        </div>                                        
                                    <p><h3>Joukkueet:</h3>
                                        <template v-for="joukkue in lohko.joukkueet">
                                            <input v-model="joukkue.nimi" class="form-control kapea-editori">
                                            <input v-model="joukkue.lyhenne" class="form-control kapea-editori" style="width: 80px;">
                                            = {{joukkue.nimi}} ({{joukkue.lyhenne}})
                                            <br>
                                        </template>
                                        <div class="checkbox">
                                            <label><input type="checkbox" v-model="lohko.roundRobin"> Round robin</label>
                                        </div>                                    
                                    </p>

                                    <p><h3>Ottelut:</h3>
                                        <div class="btn-group">
                                            <button @click="lohko.luoOttelut()" type="button" class="btn btn-primary">Luo ottelut</button>
                                            <button @click="lohko.poistaOttelut()" type="button" class="btn btn-danger">Poista ottelut</button>
                                            <button @click="lohko.arvoYksiTulos()" type="button" class="btn btn-default">Arvo yksi</button>
                                            <button @click="lohko.arvoKaikkiTulokset()" type="button" class="btn btn-default">Arvo kaikki</button>

                                        </div>                                        
                                        <vue-ottelut :ottelut="lohko.ottelut"></vue-ottelut>
                                    </p>

                                    <p><h3>Tulostaulu:</h3>
                                        <vue-tulostaulu-rr :lohko="lohko"></vue-tulostaulu-rr>
                                    </p>
                                </div>
                             </div>                             
                         </div>`
});

Vue.component('vue-ottelut', {
              props: ['ottelut'],
              computed: {
                  ottelutSorted: function(){
                      return this.ottelut.sort(function(a,b) {return a.no-b.no;} );
                  }
              },
              template: `<table class="table table-condensed table-responsive">
                             <tr>
                                 <th>No</th>
                                 <th>Koti</th>
                                 <th>Vieras</th>
                                 <th>Tulos</th>
                                 <th>Tuomari</th>
                             </tr>
                             <tr v-for="ottelu in ottelutSorted">
                                 <td><input type="number" v-model="ottelu.no" class="form-control number-input"></td>                             
                                 <td>{{ottelu.koti.lyhenne}}</td>                             
                                 <td>{{ottelu.vieras.lyhenne}}</td>                             
                                 <td><input class="form-control kapea-editori" v-model="ottelu.tulos" @input="ottelu.onChange()">
                                     <span class="label label-warning" v-show="ottelu.onMuuttunut()">Muuttunut</span>
                                 </td>                             
                                 <td>{{ottelu.tuomari.lyhenne}}</td>
                             </tr>
                         </table>`
});

Vue.component('vue-tulostaulu-rr', {
              props: ['lohko'],
              computed: {
                  sorted: function(){
                      return this.lohko.tulosrivit.sort(function(a,b) {return a.sija-b.sija;} );
                  }
              },
              template: `
                    <div>
                        <div class="toolbar">
                            <button @click="lohko.laskeTulokset()" type="button" class="btn btn-primary">Laske tulokset</button>
                        </div>
                        <table class="table table-condensed">
                            <tr>
                                <th>Sija</th>
                                <th>Joukkue</th>
                                <!--<th>Pelattu</th>-->
                                <th>Erät</th>
                                <th>Piste-ero</th>
                            </tr>
                            <tr v-for="rivi in sorted">
                                <td><input type="number" class="form-control number-input" v-model="rivi.sija" ></td>
                                <td>{{rivi.joukkue.lyhenne}}</td>
                                <!--<td>{{rivi.ottelut}}</td>-->
                                <!--<td>{{rivi.eraplus}}</td>-->
                                <!--<td>{{rivi.pisteet}}</td>-->
                                <td>{{rivi.totalErat}}</td>
                                <td>{{rivi.totalPisteet}}</td>
                            </tr>

                        </table>
                        <textarea v-model="lohko.tulostaulu.selitys" style="width: 650px;"></textarea>
                    </div>`
});
