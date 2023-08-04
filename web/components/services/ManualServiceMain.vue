<template>
  <base-card icon="mdi-text-box-outline" text="Manual do Exame">
    <loading :isLoading="isLoading" class="z-50" />
    <div class="grid grid-cols-12">
      <div class="col-span-7 px-4">
        <span class="my-4">Exame:</span>
        <v-autocomplete
          outlined
          dense
          :items="exams"
          item-text="SMK_NOME"
          item-value="SMK_COD"
          @input="updateSelectedExam"
        >
        </v-autocomplete>
      </div>
      <div class="ml-6 mt-2 col-span-4">
        <v-checkbox label="Validado" v-model="isChecked"> </v-checkbox>
      </div>
    </div>

    <div class="grid grid-cols-12">
      <div class="col-span-7 px-4">
        <span class="my-4">Manual do exame:</span>
        <v-textarea outlined v-model="selectedExam.SMK_DESCRICAO"></v-textarea>
        <v-btn dark color="#323288" @click="updateExam">Salvar</v-btn>
      </div>

      <div class="ml-6 col-span-5">
        <div class="max-h-60 overflow-y-auto pr-7 mb-6">
          <span class="font-semibold" v-show="selectedExam.SMK_INST"
            >Instruções para o paciente:</span
          >
          <v-card flat class="text-justify pa-1">
            {{ selectedExam.SMK_INST }}
          </v-card>
        </div>
        <div class="max-h-60 overflow-y-auto pr-7">
          <span class="font-semibold" v-show="selectedExam.smk_inst_operador"
            >Instruções para o Operador:</span
          >
          <v-card class="text-justify pa-1">
            {{ selectedExam.smk_inst_operador }}
          </v-card>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
import Loading from '../loading/Loading.vue'
import BaseCard from '../UI/BaseCard.vue'
export default {
  components: { BaseCard, Loading },
  data() {
    return {
      exams: [],
      selectedExam: {},
      isLoading: false,
    }
  },

  computed: {
    isChecked: {
      get() {
        return this.selectedExam.SMK_IND_DESCR_VALID === 'S'
      },
      set(value) {
        this.selectedExam.SMK_IND_DESCR_VALID = value ? 'S' : 'N'
      },
    },
  },

  methods: {
    async getExams() {
      try {
        this.isLoading = true
        const response = await this.$axios.$get(`/exams/`)
        this.exams = response
      } catch (error) {
        const { data } = error.response
        this.$toast.error(data.message, {
          position: 'top-center',
        })

        console.log(data.message)
      } finally {
        this.isLoading = false
      }
    },

    updateSelectedExam(value) {
      this.selectedExam = this.exams.find((exam) => exam.SMK_COD === value) || {
        SMK_DESCRICAO: '',
      }
    },

    async updateExam() {
      if (!this.selectedExam.SMK_COD) {
        this.$toast.error('Exame não encontrado', { position: 'top-center' })
      } else {
        try {
          await this.$axios.$put(`/exams/${this.selectedExam.SMK_COD}`, {
            description: this.selectedExam.SMK_DESCRICAO,
            validated: this.selectedExam.SMK_IND_DESCR_VALID,
          })

          this.$toast.success('Dados salvos com sucesso', {
            position: 'top-center',
          })
          this.getExams()
        } catch (error) {
          if (error.response && error.response.data) {
            const { data } = error.response
            this.$toast.error(data.message, { position: 'top-center' })
          } else {
            console.error('Erro de resposta:', error)
          }
        }
      }
    },
  },

  mounted() {
    this.getExams()
  },
}
</script>

<style></style>
