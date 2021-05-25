<template>
  <q-page class="viva-aluguel">
    <home-carousel class="viva-slide" :dadosCarousel="listaCarousel" portal="vivareal" v-if="listaCarousel.length > 0"></home-carousel>
    <home-vitrine class="viva-vitrine" :dadosVitrine="dadosImoveis" portal="vivareal" titulo="Imóveis para Alugar" v-if="listaCarousel.length > 0"></home-vitrine>
  </q-page>
</template>

<script>
import Carousel from '../../components/Carousel.vue'
import Vitrine from '../../components/Vitrine.vue'
export default {
  name: 'HOME',
  components: {
    'home-carousel': Carousel,
    'home-vitrine': Vitrine
  },
  props: ['imoveisLista', 'sessao'],
  data () {
    return {
      dadosImoveis: [],
      listaCarousel: []
    }
  },
  watch: {
    dadosImoveis (d) {
      if (d.length > 0) this.getCarousel()
    }
  },
  methods: {
    chkDados () {
      this.dadosImoveis = this._props.imoveisLista.filter(obj => obj.pricingInfos.businessType === 'RENTAL' ? obj : '')
    },
    getRandomInt () {
      let min = 0
      let max = this.dadosImoveis.length
      min = Math.ceil(min)
      max = Math.floor(max)
      const rand = Math.floor(Math.random() * (max - min)) + min
      return rand
    },
    getCarousel () {
      for (let i = 0; i < 4; i++) {
        let cont = -1
        const num = this.getRandomInt()
        this.dadosImoveis.forEach(obj => {
          cont++
          if (cont === num) this.listaCarousel.push(obj)
        })
      }
    }
  },
  mounted () {
    this.chkDados()
  }
}
</script>
