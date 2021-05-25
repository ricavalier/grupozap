<template>
  <q-layout view="hhh lpR fff">
    <q-page-container v-if="dados !== []">
      <router-view :dadosImoveis="dados" />
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
      dados: []
    }
  },
  watch: {
    dados (d) {
      this.dados = d
    }
  },
  methods: {
    carregaInfo () {
      this.dados = this._props.imoveis
      document.querySelector('title').innerText = 'Grupo Zap'
      const icons = ['128x128', '96x96', '32x32', '16x16']
      icons.forEach(obj => {
        document.querySelector(`link[sizes="${obj}"]`).setAttribute('href', `icons/grupozap/favicon-${obj}.png`)
      })
      document.querySelector('link[type="image/ico"]').setAttribute('href', 'icons/grupozap/favicon.ico')
    }
  },
  mounted () {
    this.carregaInfo()
  }
}
</script>
