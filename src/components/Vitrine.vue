<template>
    <div class="q-container" v-if="dadosImoveis.length > 0">
      <div class="row q-my-xl flex items-center">
        <div class="col-md-10 col-sm-12 col-xs-12 q-px-md">
          <h3 class="h3-text q-my-none">{{ _props.titulo }}:</h3>
        </div>
        <div class="col-md-2 col-sm-12 col-xs-12 text-right q-pa-md">
          <q-btn color="grey" icon="sync_alt" outline label="Ordenar">
            <q-menu anchor="bottom left" self="top left">
              <q-list style="min-width: 150px">
                <q-item clickable v-close-popup @click="orderImoveis('maior_valor')">
                  <q-item-section> Maior Valor</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="orderImoveis('menor_valor')">
                  <q-item-section> Menor Valor</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="orderImoveis('maior_area')">
                  <q-item-section> Maior Área</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="orderImoveis('menor_area')">
                  <q-item-section> Menor Área</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="orderImoveis('maior_quartos')">
                  <q-item-section> Mais Quartos</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="orderImoveis('maior_vagas')">
                  <q-item-section> Mais Vagas</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
      <div class="row flex justify-center">
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm" v-for="(imovel, i) in listaImoveis" :key="i">
          <q-card class="my-card cursor-pointer">
            <det-carousel class="zap-vitrine" :dadosCarousel="imovel.images" v-if="imovel.images" :verZoom="false"></det-carousel>
            <!-- <q-img style="heigh: 150px; width: 100%;" :src="imovel.images[0]" :ratio="16/9"></q-img> -->
            <q-card-section  @click="abreImovel(imovel.id)">
              <div class="text-h6">
                {{ imovel.pricingInfos.businessType === 'SALE' ? 'Vende-se' : 'Aluga-se' }}
              </div>
              <div class="text-subtitle2">Local: {{ !!imovel.address.neighborhood ? imovel.address.neighborhood : 'Não Informado' }} - {{ !!imovel.address.city ? imovel.address.city : 'Não Informado' }} </div>
              <strong>
                {{ imovel.usableAreas }}m<sup>2</sup><br>
                {{ imovel.bedrooms }} Dormitório(s) <br>
                {{ imovel.bathrooms }} Banheiro(s)<br>
                {{ imovel.parkingSpaces > 0 ? `${imovel.parkingSpaces} vaga(s)` : `Sem vaga` }} <br>
              </strong>
              <h6 class="text-h6 text-negative q-my-sm" v-if="!!imovel.pricingInfos.price && imovel.pricingInfos.businessType === 'SALE'">R$ {{ getMoeda(imovel.pricingInfos.price) }}</h6>
              <h6 class="text-h6 text-negative q-my-sm"  v-if="!!imovel.pricingInfos.rentalTotalPrice && imovel.pricingInfos.businessType === 'RENTAL'">R$ {{ getMoeda(imovel.pricingInfos.rentalTotalPrice) }} <small class="text-grey"> / mês</small></h6>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row bg-grey-3 q-my-sm">
        <div class="col-md-12 col-sm-12 col-xs-12 flex flex-center">
          <span>Navergar entre os imoveis:</span>
          <q-pagination
            v-model="pagAtual"
            :max="paginacao.maximo"
            direction-links
            flat
            color="grey-7"
            active-color="primary"
            input
            input-class="text-black"
            size="20px"
            input-style="font-size: 16px"
          />
           <span class="q-ml-lg">Total de Imóveis: {{ dadosImoveis.length }}</span>
        </div>
      </div>
    </div>
</template>
<script>
import Carousel from './CarouselDetalhes.vue'
export default {
  components: {
    'det-carousel': Carousel
  },
  props: ['dadosVitrine', 'portal', 'titulo'],
  data () {
    return {
      dadosImoveis: [],
      listaImoveis: [],
      linkPortal: '',
      orderacao: '',
      pagAtual: 1,
      paginacao: {
        atual: 1,
        maximo: 0,
        porpage: 20,
        inicio: 0,
        fim: 19
      }
    }
  },
  watch: {
    dadosImoveis (d) {
      this.paginacao.maximo = parseInt(d.length / this.paginacao.porpage) + 1
      this.getListaImoveis()
    },
    pagAtual (pag) {
      const ppage = this.paginacao.porpage
      this.paginacao.inicio = (pag - 1) * ppage
      this.paginacao.fim = (pag * ppage) - 1
      this.getListaImoveis()
    }
  },
  methods: {
    orderImoveis (o) {
      const ord = o
      if (ord === 'maior_valor') {
        this.dadosImoveis.sort((a, b) => { return b.valor - a.valor })
      }
      if (ord === 'menor_valor') {
        this.dadosImoveis.sort((a, b) => { return a.valor - b.valor })
      }
      if (ord === 'maior_area') {
        this.dadosImoveis.sort((a, b) => { return b.usableAreas - a.usableAreas })
      }
      if (ord === 'menor_area') {
        this.dadosImoveis.sort((a, b) => { return a.usableAreas - b.usableAreas })
      }
      if (ord === 'maior_quatos') {
        this.dadosImoveis.sort((a, b) => { return b.bedrooms - a.bedrooms })
      }
      if (ord === 'maior_vagas') {
        this.dadosImoveis.sort((a, b) => { return a.parkingSpaces - b.parkingSpaces })
      }
      this.getListaImoveis()
    },
    chkDados () {
      this.dadosImoveis = this._props.dadosVitrine
      this.linkPortal = this._props.portal
    },
    getListaImoveis () {
      let cont = -1
      this.listaImoveis = this.dadosImoveis.filter(obj => {
        cont++
        return cont >= this.paginacao.inicio && cont <= this.paginacao.fim ? obj : ''
      })
    },
    getMoeda (valor) {
      const vlr = parseFloat(valor)
      const vlr2 = vlr.toLocaleString('pt-br', { minimumFractionDigits: 2 })
      return vlr2
    },
    abreImovel (id) {
      this.$router.push(`/${this.linkPortal}/detalhes/${id}`)
    }
  },
  mounted () {
    this.chkDados()
  }
}
</script>
