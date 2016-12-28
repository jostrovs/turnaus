Vue.component('vue-joukkuelista', {
              props: ['joukkueet'],
              template: `
                      <div class="panel panel-default joukkuelista">
                          <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" :href="collapseHref">Joukkueet ({{joukkueet.length}}):</a> 
                            </h4>
                          </div>
                          <div :id="collapseId" class="panel-collapse collapse in">
                            <div v-for="joukkue in joukkueet" class="panel-body">{{joukkue.nimi}} <span v-if="joukkue.lyhenne">({{joukkue.lyhenne}})</span></div>
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
                            <div class="panel-body" v-html="teksti"></div>
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

Vue.component('vue-formatted-text', {
              props: ['text'],
              data: function () {
                  return {
                      lines: this.text.split("<br>")
                  }
              },
              template: `
                  <p v-for="line in lines">{{line}}</p> 
`

});

Vue.component('vue-sarja', {
              props: ['sarja'],
              template: `
                  <div> 
                      <h1>XXVII Keimola Lentis</h1>
                      <h2>{{ sarja.nimi }}-sarja</h2> 
                      <div class="info" v-html="sarja.info"></div>
                      <vue-joukkuelista :joukkueet="sarja.joukkueet()"></vue-joukkuelista>
                      <vue-box otsikko="Pelipaikat:" :teksti="sarja.pelipaikat"></vue-box>
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
              template: `<div>
                            <div class="panel panel-default" style="page-break-before: always"> 
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a data-toggle="collapse" :href="collapseHref">{{ lohko.nimi }} <span class="no-print" style="float: right; font-size: 10px; color: #777;">avaa/sulje</span></a>
                                    </h4>
                                </div>
                                <div :id="collapseId" class="panel-collapse collapse in">
                                    <div class="panel-body">
                                        <p v-html="lohko.info"></p>
                                        <p>Joukkueet:<br>
                                            <template v-for="joukkue in lohko.joukkueet">
                                                {{joukkue.nimi }}
                                                <span v-if="joukkue.lyhenne">({{joukkue.lyhenne}})</span>
                                                <br>
                                            </template>
                                        </p>

                                        <p>Ottelut:<br>
                                            <vue-ottelut :ottelut="lohko.ottelut"></vue-ottelut>
                                        </p>

                                        <p>
                                            <vue-tulostaulu-rr v-if="lohko.onkoTuloksia()" :lohko="lohko"></vue-tulostaulu-rr>
                                        </p>                                    
                                    </div>
                                </div>                             
                            </div>
                            <div v-if="lohko.print_info" class="panel panel-default print-only">
                                <p v-html="lohko.print_info"></p>
                            </div>
                        </div>`

});

Vue.component('vue-ottelut', {
              props: ['ottelut'],
              template: `<table class="table table-condensed table-responsive">
                             <tr>
                                 <th>No</th>
                                 <th>Koti</th>
                                 <th>Vieras</th>
                                 <!--th>Tulos</th-->
                                 <th>Tuomari</th>
                             </tr>
                             <tr v-for="ottelu in ottelut">
                                 <td>{{ottelu.no}}</td>                             
                                 <td>{{ottelu.getKoti()}}</td>                             
                                 <td>{{ottelu.getVieras()}}</td>                             
                                 <!--td>{{ottelu.tulos}}</td-->                             
                                 <td>{{ottelu.getTuomari()}}</td>
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
              methods: {
                  isShown: function() {
                      return this.lohko.tulosrivit.length > 0;
                  }
              },
              template: `
                    <div v-if="isShown()">
                        <p>Tulostaulu:<br>
                            <table class="table table-condensed">
                                <tr>
                                    <th>Sija</th>
                                    <th>Joukkue</th>
                                    <!--<th>Pelattu</th>-->
                                    <th>Erät</th>
                                    <th>Piste-ero</th>
                                </tr>
                                <tr v-for="rivi in sorted">
                                    <td>{{rivi.sija}}</td>
                                    <td>{{rivi.joukkue.lyhenne}}</td>
                                    <!--<td>{{rivi.ottelut}}</td>-->
                                    <!--<td>{{rivi.eraplus}}</td>-->
                                    <!--<td>{{rivi.pisteet}}</td>-->
                                    <td>{{rivi.totalErat}}</td>
                                    <td>{{rivi.totalPisteet}}</td>
                                </tr>

                            </table>
                            <p v-html="lohko.tulostaulu.selitys"></p>
                        </p>
                    </div>`
});