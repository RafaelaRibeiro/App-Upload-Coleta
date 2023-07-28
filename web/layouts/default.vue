<template>
  <v-app dark>
    <t-menu />
    <t-content />
    <t-footer />
  </v-app>
</template>

<script>
import TContent from '../components/templates/TContent.vue'
import TFooter from '../components/templates/TFooter.vue'
import TMenu from '../components/templates/TMenu.vue'
export default {
  components: { TMenu, TContent, TFooter },
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
<style>
main {
  background: #d7d8e9;
}
#app {
  font-family: 'Poppins', sans-serif;
}
</style>
