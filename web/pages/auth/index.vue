<template>
  <div>
    <div class="h-screen flex">
      <div class="flex items-center justify-center w-2/5 mx-10">
        <div class="w-full justify-center mx-10">
          <div class="my-6">
            <img class="w-64 mx-auto" src="~/assets/logo.png" alt="logo" />
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
                <v-col class="flex justify-center">
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
                <button
                  type="text"
                  class="text-gray-600"
                  @click.prevent="dialog = true"
                >
                  Primeiro acesso
                </button>
              </div>
            </v-container>
          </v-form>
        </div>
      </div>
      <img
        class="w-3/5 object-fill hidden md:block"
        src="../../assets/bg.jpg"
        alt="background"
      />
    </div>

    <v-dialog
      v-model="dialog"
      persistent
      :overlay="false"
      max-width="400px"
      transition="dialog-transition"
    >
      <v-card>
        <div class="my-4">
          <h1 class="text-xl font-medium text-center">PRIMEIRO ACESSO</h1>
        </div>

        <v-form ref="form">
          <v-container>
            <span>Login:</span>
            <v-text-field
              v-model="user.login"
              outlined
              dense
              placeholder="Digite seu login do smart"
              :rules="[rules.required]"
            ></v-text-field>
            <span>Senha:</span>
            <v-text-field
              v-model="user.password"
              outlined
              dense
              placeholder="Digite sua senha"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :rules="[rules.required]"
            ></v-text-field>
            <span>Confirme sua senha:</span>
            <v-text-field
              v-model="user.confirmPassword"
              outlined
              dense
              placeholder="Repita sua senha"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showConfirmPassword ? 'text' : 'password'"
              @click:append="showConfirmPassword = !showConfirmPassword"
              :rules="[rules.required, rules.passwordMatch]"
            ></v-text-field>

            <v-btn dark color="#042d65" @click="savePassword">Salvar</v-btn>
            <v-btn color="error" @click="onCancel">Cancelar</v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      show: false,
      showPassword: false,
      showConfirmPassword: false,
      dialog: false,
      login: '',
      password: '',
      user: {
        login: '',
        password: '',
        confirmPassword: '',
      },
      loading: false,
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
        passwordMatch: () =>
          this.user.password === this.user.confirmPassword ||
          'As senhas não correspondem.',
      },
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

    async savePassword() {
      try {
        await this.$axios.$put(`/auth/first`, {
          login: this.user.login,
          password: this.user.password,
          confirmPassword: this.user.confirmPassword,
        })

        this.$toast.success('Senha Registrada com sucesso')
        this.dialog = false
      } catch (error) {
        if (error.response && error.response.data) {
          const { data } = error.response
          this.$toast.error(data.message, { position: 'top-center' })
        } else {
          console.error('Erro de resposta:', error)
        }
      }
    },
    onCancel() {
      this.dialog = false
      this.user = {
        login: '',
        password: '',
        confirmPassword: '',
      }
      this.$refs.form.reset()
    },
  },
}
</script>

<style></style>
