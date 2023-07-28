<template>
  <div>
    <div class="h-screen flex">
      <div class="flex items-center justify-center w-2/5 mx-10">
        <div class="w-full justify-center mx-10">
          <div class="my-6">
            <img class="w-64 mx-auto" src="~/assets/logo.png" alt="" />
          </div>
          <div class="my-4">
            <h1 class="text-lg font-medium text-center">Olá, Bem-vindo(a)</h1>
            <!-- <h1 class="text-center text-gray-600">
              Faça seu login para acessar a plataforma
            </h1> -->
          </div>

          <v-form>
            <v-container>
              <v-text-field
                v-model="login"
                placeholder="Login"
                prepend-inner-icon="mdi-account"
                outlined
                color="indigo darken-3"
                dense
              ></v-text-field>

              <v-text-field
                v-model="password"
                placeholder="Senha"
                prepend-inner-icon="mdi-lock"
                outlined
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                color="indigo darken-3"
                dense
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
              ></v-text-field>
              <v-row align="center" justify="space-around">
                <v-col class="d-flex justify-center">
                  <v-btn
                    dark
                    block
                    color="#042d65"
                    elevation="4"
                    @click="signin"
                  >
                    <span v-if="loading">
                      <i class="el-icon-loading"></i> Aguarde...
                    </span>
                    <span v-else>Entrar</span>
                  </v-btn>
                </v-col>
              </v-row>
              <div class="text-center mt-5">
                <button type="text" class="text-gray-600">
                  Primeiro acesso
                </button>
              </div>
            </v-container>
          </v-form>
        </div>
      </div>
      <img class="w-3/5 object-fill" src="../../assets/bg.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      show: false,

      login: '',
      password: '',
      loading: false,
    }
  },

  methods: {
    async signin() {
      try {
        this.loading = true
        await this.$auth.loginWith('local', {
          data: { login: this.login, password: this.password },
        })
        this.$router.push('/compras/coleta')
      } catch (error) {
        if (error.response && error.response.data) {
          const { data } = error.response
          this.$toast.error(data.message, { position: 'top-center' })
        } else {
          console.error('Erro de resposta:', error)
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
