<template>
  <div id="q-app" v-if="dados.length > 0">
    <router-view :imoveis="dados" />
  </div>
</template>
<script>
const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')
myHeaders.append('Cache-Control', 'no-cache')
myHeaders.append('Expires', '-1')
myHeaders.append('Pragma', 'no-cache')
export default {
  name: 'App',
  data () {
    return {
      dados: []
    }
  },
  methods: {
    async getDados () {
      const url = 'http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json'
      await this.$axios.get(url, myHeaders)
        .then(res => {
          this.dados = res.data
        })
        .catch(() => {
          console.log('Falha ao receber dados 1')
          this.getDados2()
        })
    },
    async getDados2 () {
      const url = 'json/source-1.json'
      await this.$axios.get(url, myHeaders)
        .then(res => {
          this.dados = res.data
        })
        .catch(() => {
          console.log('Falha ao receber dados 2')
        })
    }
  },
  mounted () {
    this.getDados()
  }
}
</script>
