<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
        <p><img src="img/logoGrupoZapBrc.svg" class="img-responsive cursor-pointer" alt="Grupo Zap" @click="goHome()"></p>
        <p>Todo conteúdo é fornecido pelo Grupo Zap / OLX</p>
      </div>
      <div class="col-xs-12 col-sm-3 col-md-3 q-pa-sm">
        <p><strong> INSTITUCIONAL: </strong></p>
        <p><a class="text-white" href="https://www.grupozap.com/" target="_blank">- Quem Somos</a></p>
        <p><a class="text-white" href="https://careers.smartrecruiters.com/OLXBrasil" target="_blank">- Trabalhe Conosco</a></p>
      </div>
      <div class="col-xs-12 col-sm-3 col-md-3 q-pa-sm float-right">
        <p><strong> INFORMAÇÕES: </strong></p>
        <p>Teste Desenvolvido por Ricardo da Cunha Cavalier</p>
        <p><a class="text-white" href="http://www.ricavalier.com.br" target="_blank">RiCavalier Desenvolvimento Web</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
  a {
    text-decoration: none;
  }
</style>
