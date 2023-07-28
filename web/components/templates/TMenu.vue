<template>
  <div>
    <v-navigation-drawer
      :mini-variant="mini"
      mini-variant-width="70"
      permanent
      app
      width="15vw"
      :responsive="true"
    >
      <v-card flat height="10vh" class="d-flex justify-center m-2">
        <v-responsive aspect-ratio="16/9">
          <v-img
            contain
            :src="require('@/assets/logo.png')"
            alt="Logo Richet"
          ></v-img>
        </v-responsive>
      </v-card>
      <v-divider class="ma-0"></v-divider>
      <el-menu
        style="padding-left: 0"
        router
        :collapse="isCollapse"
        active-text-color=" #323288"
        class="py-2"
      >
        <div v-for="item in items" :key="item.id">
          <el-submenu :index="item.id">
            <template slot="title">
              <v-icon left>{{ item.icon }} </v-icon>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="subItem in item.subItems"
              :index="subItem.id"
              :key="subItem.id"
              :route="item.to"
            >
              <v-icon left>{{ subItem.icon }}</v-icon>
              {{ subItem.title }}
            </el-menu-item>
          </el-submenu>
          <el-menu-item @click="logout">
            <v-icon class="pr-6"> mdi-logout </v-icon>
            <span slot="title">{{ exit }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mini: false,
      isCollapse: false,
      exit: 'Sair',
      items: [
        {
          id: '1',
          icon: 'mdi-cart-minus',
          title: 'Compras',
          to: '/compras/coleta',
          subItems: [{ id: '1-1', icon: 'mdi-account-cash', title: 'Coleta' }],
        },
      ],
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style></style>
