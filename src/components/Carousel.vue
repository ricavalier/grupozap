<template>
<div>
  <q-carousel
    v-model="slide"
    transition-prev="jump-right"
    transition-next="jump-left"
    swipeable
    animated
    infinite
    control-color="white"
    :autoplay="6000"
    navigation
    padding
    arrows
    class="bg-grey-12 text-white shadow-1 rounded-borders carousel"
    v-if="listaCarousel.length > 0"
  >
    <q-carousel-slide
      v-for="(item, i) in listaCarousel"
      :key="i"
      :name="`style${i}`"
      class="column no-wrap cursor-pointer item-carousel"
        @click="abreImovel(item.id)"
    >
      <q-img
        class="img-carousel"
        :src="item.images[0]"
        spinner-color="grey"
        spinner-size="100px"
      />
      <div class="absolute-bottom custom-caption">
        <div class="text-h4 text-shadow q-my-xl q-mx-md table">
          <div class="q-py-md q-px-lg bg-carousel">
            Local: {{ !!item.address.neighborhood ? item.address.neighborhood : 'Não Informado' }} - {{ !!item.address.city ? item.address.city : 'Não Informado' }}
          </div>
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>
  <div class="bg-grey-12 carousel flex-center" v-else>
    <q-spinner
      color="grey"
      size="100px"
      :thickness="10"
    />
  </div>
</div>
</template>
<script>
export default {
  props: ['dadosCarousel', 'portal'],
  data () {
    return {
      slide: 'style0',
      listaCarousel: []
    }
  },
  methods: {
    abreImovel (id) {
      const local = this._props.portal
      this.$router.push(`/${local}/detalhes/${id}`)
    }
  },
  mounted () {
    this.listaCarousel = this._props.dadosCarousel
  }
}
</script>
