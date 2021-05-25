<template>
  <q-carousel
    v-model="slide"
    transition-prev="jump-right"
    transition-next="jump-left"
    swipeable
    animated
    infinite
    control-color="white"
    :autoplay="autoplay"
    :fullscreen.sync="fullscreen"
    :navigation="zoom"
    padding
    arrows
    class="bg-grey-12 text-white shadow-1 rounded-borders carousel-detalhes"
    v-if="listaCarousel.length > 0"
  >
    <q-carousel-slide
      v-for="(item, i) in listaCarousel"
      :key="i"
      :name="`style${i}`"
      class="column no-wrap item-carousel"
      :img-src="item"
    >
    </q-carousel-slide>
      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
          v-if="zoom"
        >
          <q-btn
            push round dense color="white" text-color="grey"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
  </q-carousel>
</template>
<script>
export default {
  props: ['dadosCarousel', 'verZoom'],
  data () {
    return {
      slide: 'style0',
      fullscreen: false,
      listaCarousel: [],
      zoom: false,
      autoplay: false
    }
  },
  mounted () {
    this.listaCarousel = this._props.dadosCarousel
    this.zoom = this._props.verZoom
    this.autoplay = this.zoom ? 6000 : false
  }
}
</script>
