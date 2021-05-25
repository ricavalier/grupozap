<template>
  <q-page class="home">
    <!-- flex flex-center  -->
    <div class="home-header">
      <div class="logo">
        <img src="/img/logoGrupoZap.png" alt="Zap Imóveis">
      </div>
    </div>
    <div class="box-area">
      <div class="box-portal box-vivareal" @click="abrePortal('/vivareal/')">
        <img src="/img/logoVivaRealBranco.png" alt="Logo Viva Real">
      </div>
      <div class="box-portal box-zapimoveis" @click="abrePortal('/zapimoveis/')">
        <img src="/img/logoZapImoveis.png" alt="Logo Zap Imóveis">
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'HOME',
  props: ['dadosImoveis'],
  data () {
    return {
      dataViva: [],
      dataZap: []
    }
  },
  methods: {
    abrePortal (portal) {
      this.$router.push(portal)
    }
  },
  mounted () {
    console.log(this._props.dadosImoveis)
  }
}
</script>
