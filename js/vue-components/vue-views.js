Vue.component('vue-joukkuelista', {
              props: ['joukkueet'],
              template: `
                      <div class="panel panel-default joukkuelista">
                          <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" :href="collapseHref">Joukkueet:</a>
                            </h4>
                          </div>
                          <div :id="collapseId" class="panel-collapse collapse in">
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
                      <div class="info">{{sarja.info}}</div>
                      <vue-joukkuelista :joukkueet="sarja.joukkueet()"></vue-joukkuelista>
                      <vue-box otsikko="Pelipaikat:" teksti="Pelipaikat on mitä sattuu"></vue-box>
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
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" :href="collapseHref">{{ lohko.nimi }}</a>
                                </h4>
                             </div>
                             <div :id="collapseId" class="panel-collapse collapse in">
                                <div class="panel-body">
                                    <p>{{lohko.info}}</p>
                                    <p>Joukkueet:<br>
                                        <template v-for="joukkue in lohko.joukkueet">
                                            {{joukkue.nimi }}
                                            ({{joukkue.lyhenne}})
                                            <br>
                                        </template>
                                    </p>

                                    <p>Ottelut:<br>
                                        <vue-ottelut :ottelut="lohko.ottelut"></vue-ottelut>
                                    </p>
                                </div>
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
                                 <th>Tulos</th>
                                 <th>Tuomari</th>
                             </tr>
                             <tr v-for="ottelu in ottelut">
                                 <td>{{ottelu.no}}</td>                             
                                 <td>{{ottelu.koti.lyhenne}}</td>                             
                                 <td>{{ottelu.vieras.lyhenne}}</td>                             
                                 <td>{{ottelu.tulos}}</td>                             
                                 <td>{{ottelu.tuomari.lyhenne}}</td>
                             </tr>
                         </table>`
});
