<template>
  <q-page class="zap-detalhes">
    <div class="q-container">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <h3 class="h3-text q-my-xl q-px-md">Detalhes do Imóvel:</h3>
        </div>
      </div>
      <div class="row" v-if="dadosImoveis">
        <!-- {{dadosImoveis.images}} -->
        <div class="col-md-12 col-sm-12 col-xs-12 q-pa-sm">
          <q-card class="my-card">
             <det-carousel :dadosCarousel="dadosImoveis.images" v-if="dadosImoveis.images" :verZoom="true"></det-carousel>
            <q-card-section>
              <div class="text-h5 text-bold" v-if="dadosImoveis.pricingInfos">{{ dadosImoveis.pricingInfos.businessType === 'SALE' ? 'Vende-se' : 'Aluga-se' }}</div>
              <div class="text-h4 text-blue-grey cursor-pointer" v-if="dadosImoveis.address">
                <q-icon name="location_on" style="font-size: 1.5em" />
                Local: {{ !!dadosImoveis.address.neighborhood ? dadosImoveis.address.neighborhood : 'Não Informado' }} - {{ !!dadosImoveis.address.city ? dadosImoveis.address.city : 'Não Informado' }}
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="q-container">
                <div class="row">
                  <div class="col-lg-8 col-md-8 col-sm-6 col-xs-12 q-pa-sm">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-sm" v-if="dadosImoveis.pricingInfos">
                        <h6 class="text-h4 text-negative q-my-sm" v-if="dadosImoveis.pricingInfos.businessType === 'SALE'">
                          <strong>{{ getMoeda(dadosImoveis.pricingInfos.price) }}</strong>
                        </h6>
                        <h6 class="text-h4 text-negative q-my-sm"  v-if="dadosImoveis.pricingInfos.businessType === 'RENTAL'">
                          <strong>{{ getMoeda(dadosImoveis.pricingInfos.rentalTotalPrice) }}</strong> <small class="text-grey"> / mês</small>
                          <small class="text-grey block text-inheirit" v-if="dadosImoveis.pricingInfos.monthlyCondoFee && dadosImoveis.pricingInfos.monthlyCondoFee > 0"> Condomínio: {{ getMoeda(dadosImoveis.pricingInfos.monthlyCondoFee) }}</small>
                        </h6>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                        <q-icon class="q-mr-sm" name="square_foot" style="font-size: 2em" color="grey" />
                        <strong>{{ dadosImoveis.usableAreas }}m<sup>2</sup></strong>
                      </div>
                      <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                        <q-icon class="q-mr-sm" name="king_bed" style="font-size: 2em" color="grey" />
                        <strong>{{ dadosImoveis.bedrooms }} Dormitório(s)</strong>
                      </div>
                      <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                        <q-icon class="q-mr-sm" name="bathtub" style="font-size: 2em" color="grey" />
                        <strong>{{ dadosImoveis.bathrooms }} Banheiro(s)</strong>
                      </div>
                      <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                        <q-icon class="q-mr-sm" name="directions_car" style="font-size: 2em" color="grey" />
                        <strong>{{ dadosImoveis.parkingSpaces > 0 ? `${dadosImoveis.parkingSpaces} vaga(s)` : `Sem vaga` }}</strong>
                      </div>
                      <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 q-pa-sm" v-if="dadosImoveis.createdAt">
                        <q-icon class="q-mr-sm" name="calendar_today" style="font-size: 2em" color="grey" />
                        <strong>{{ getData(dadosImoveis.createdAt) }}</strong>
                      </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-sm">
                      <q-icon class="q-mr-sm" name="fab fa-whatsapp" style="font-size: 2em" color="grey" />
                      <strong><a :href="`https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1,%20tenho%20interesse%20nesse%20imóvel%3A%20C%D3digo%20${dadosImoveis.id}`" target="_blank">Tenho interesse!</a></strong>
                    </div>
                  </div>
                  <form class="col-lg-4 col-md-4 col-sm-6 col-xs-12 q-pa-md bg-grey-2" @submit.prevent.stop="enviaMsg" v-if="!mensagem">
                    <p>
                      <strong>Gostou da oportunidade?</strong><br>
                      <small>Entramos em contato com você!</small>
                    </p>
                    <p>
                      <q-input color="grey" v-model="contato.nome" dense label="Nome" ref="nome" :rules="rules.requerido">
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                      </q-input>
                    </p>
                    <p>
                      <q-input color="grey" v-model="contato.email" dense label="E-mail" ref="email" :rules="rules.email">
                        <template v-slot:prepend>
                          <q-icon name="mail" />
                        </template>
                      </q-input>
                    </p>
                    <p>
                      <q-input color="grey" v-model="contato.telefone" dense label="Telefone" ref="telefone" :mask="maskPhone" :rules="rules.telefone">
                        <template v-slot:prepend>
                          <q-icon name="phone" />
                        </template>
                      </q-input>
                    </p>
                    <p class="text-right">
                      <q-btn unelevated color="grey" type="submit" icon="send" label="Enviar" />
                    </p>
                  </form>
                  <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 q-pa-md bg-grey-2 flex flex-center" v-else>
                    <p> Sua mensagem foi enviada com sucesso!</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 q-pa-sm">
                    <iframe :src="`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d323.2813064176682!2d${dadosImoveis.address.geoLocation.location.lon}!3d${dadosImoveis.address.geoLocation.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1619637003793!5m2!1spt-BR!2sbr`" style="border:0; width: 100%; height: 400px" allowfullscreen="" loading="lazy"></iframe>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import Carousel from '../../components/CarouselDetalhes.vue'
export default {
  name: 'HOME',
  components: {
    'det-carousel': Carousel
  },
  props: ['imoveisLista'],
  data () {
    return {
      dadosImoveis: [],
      mensagem: false,
      contato: {
        nome: '',
        telefone: '',
        email: ''
      },
      reg: {
        email: /^[-a-z0-9_}{\\'?]+(\.[-a-z0-9_}{\\'?]+)*@([a-z0-9][-a-z0-9]*(\.[-a-z0-9]+)*\.(com|edu|gov|mil|net|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/ig
      },
      rules: {
        requerido: [
          v => !!v || this.validaCampo('requerido')
        ],
        telefone: [
          v => v.length > 13 || this.validaCampo('invalido')
        ],
        email: [
          v => !!v || this.validaCampo('requerido'),
          v => !v.search(this.reg.email) || this.validaCampo('email')
        ]
      }
    }
  },
  watch: {
    maskPhone () {
      const input = this.$refs.telefone.$refs.input
      requestAnimationFrame(() => {
        input.selectionStart = input.value.length
      })
    }
  },
  computed: {
    maskPhone () {
      switch (true) {
        case this.contato.telefone.length <= 14: return '(##) ####-#####'
        case this.contato.telefone.length === 15: return '(##) #####-####'
        default: return '(##) #####-####'
      }
    }
  },
  methods: {
    chkDados () {
      const imovel = this.$route.params.id
      console.log(imovel)
      console.log(this._props.imoveisLista)
      const dados = this._props.imoveisLista.filter(obj => obj.id === imovel ? obj : false)
      this.dadosImoveis = dados[0]
      console.log(this.dadosImoveis)
    },
    getMoeda (valor) {
      let vlr = parseFloat(valor)
      vlr = vlr.toLocaleString('pt-br', { minimumFractionDigits: 2 })
      return `R$ ${vlr}`
    },
    getData (d) {
      const tempo = d.split('T')
      const data = tempo[0].split('-').reverse().join().replaceAll(',', '/')
      // const hora = tempo[1].split('.').shift()
      return `${data}`
    },
    enviaMsg () {
      this.$refs.nome.validate()
      this.$refs.email.validate()
      this.$refs.telefone.validate()

      this.mensagem = !this.$refs.nome.hasError && !this.$refs.email.hasError && !this.$refs.telefone.hasError
    },
    validaCampo (t) {
      const tipo = t
      if (tipo === undefined || tipo === 'requerido') {
        return 'Campo requerido!'
      } else if (tipo === 'invalido') {
        return 'Campo inválido'
      } else if (tipo === 'email') {
        return 'Email inválido'
      } else {
        return ''
      }
    }

  },
  mounted () {
    this.chkDados()
  }
}
</script>
