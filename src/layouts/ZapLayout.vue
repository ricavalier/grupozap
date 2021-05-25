<template>
  <q-layout view="hHh lpR fff" class="bg-grey-1 zapimoveis">
    <q-header reveal elevated class="bg-white text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-img class="q-ma-sm cursor-pointer" style="max-heigh: 30px; max-width: 120px;" src="img/logoZapImoveis.svg" @click="voltaHome()"></q-img>
        </q-toolbar-title>
        <q-tabs align="left" class="text-grey zap-tab">
          <q-route-tab to="/zapimoveis/venda" label="Venda" />
          <q-route-tab to="/zapimoveis/aluguel" label="Aluguel" />
        </q-tabs>
        <q-btn flat color="grey" icon="arrow_back_ios_new" @click="voltarPag()" />
      </q-toolbar>
    </q-header>
    <q-page-container v-if="dadosFilter.length > 0">
      <router-view :imoveisLista="dadosFilter"/>
    </q-page-container>
    <q-footer class="bg-grey-8 text-white">
      <foo-layout class="q-container q-pa-lg"></foo-layout>
    </q-footer>
  </q-layout>
</template>

<script>
import Footer from '../components/Footer.vue'
export default {
  props: ['imoveis'],
  components: {
    'foo-layout': Footer
  },
  data () {
    return {
      portal: '',
      dadosImoveis: [],
      dadosFilter: [],
      dadosCarousel: [],
      tetoPerc: 30 / 100,
      metQrdMin: 3500,
      areaLimite: {
        minlon: -46.693419,
        minlat: -23.568704,
        maxlon: -46.641146,
        maxlat: -23.546686
      },
      valores: {
        aluguel: 3500,
        venda: 600000
      }
    }
  },
  watch: {
    dadosImoveis (d) {
      this.listaImoveis(d)
    }
  },
  methods: {
    carregaInfo () {
      this.dadosImoveis = this._props.imoveis
      document.querySelector('title').innerText = 'Zap Imóveis'
      const icons = ['128x128', '96x96', '32x32', '16x16']
      icons.forEach(obj => {
        document.querySelector(`link[sizes="${obj}"]`).setAttribute('href', `icons/zapimoveis/favicon-${obj}.png`)
      })
      document.querySelector('link[type="image/ico"]').setAttribute('href', 'icons/zapimoveis/favicon.ico')
    },
    voltarPag () {
      this.$router.go(-1)
    },
    voltaHome () {
      this.$router.push('/zapimoveis')
    },
    listaImoveis (d) {
      let dados = d
      dados.forEach(obj => {
        const latitude = obj.address.geoLocation.lat
        const logitude = obj.address.geoLocation.lon
        obj.boundingBox = logitude > this.areaLimite.minlon && logitude < this.areaLimite.maxlon && latitude > this.areaLimite.minlat && latitude < this.areaLimite.maxlat
      })
      dados = dados.filter(obj => {
        const latitude = obj.address.geoLocation.location.lon !== 0
        const longitude = obj.address.geoLocation.location.lat !== 0
        const area = obj.usableAreas !== 0
        const ativo = obj.listingStatus === 'ACTIVE'
        const metQrd = obj.pricingInfos.price / obj.usableAreas
        const minAluguel = obj.boundingBox ? this.valores.aluguel * 0.9 : this.valores.aluguel
        const minVenda = obj.boundingBox ? this.valores.venda * 0.9 : this.valores.venda
        const aluguel = obj.pricingInfos.businessType === 'RENTAL'
        const aluguelVlr = obj.pricingInfos.rentalTotalPrice
        const venda = obj.pricingInfos.businessType === 'SALE'
        const vendaVlr = obj.pricingInfos.price
        obj.valor = aluguel ? aluguelVlr : vendaVlr
        return (latitude && longitude && area && ativo) && ((aluguel && aluguelVlr >= minAluguel) || (venda && vendaVlr >= minVenda && metQrd > this.metQrdMin)) ? obj : ''
      })
      this.dadosFilter = dados
    }
  },
  mounted () {
    this.carregaInfo()
  }
}
</script>
