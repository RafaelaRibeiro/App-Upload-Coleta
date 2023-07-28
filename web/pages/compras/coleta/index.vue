<template>
  <base-card icon="mdi-account-cash" text="Coleta de preço">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-2">
      <span class="mx-2 mt-2">Coleta:</span>
      <v-text-field
        outlined
        dense
        v-model="collectSerie"
        label="Serie"
      ></v-text-field>
      <v-text-field
        outlined
        dense
        v-model="collectNum"
        label="Numero"
      ></v-text-field>

      <input
        class="col-span-1 md:col-span-5 mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-[#323288] hover:file:bg-violet-10"
        type="file"
        ref="fileInput"
        @change="handleFileUpload"
      />
      <div class="col-span-1 md:col-span-2">
        <v-btn dark color="#323288" @click="uploadFile">
          <v-icon left dark> mdi-upload </v-icon> Upload</v-btn
        >
      </div>
    </div>

    <div class="mx-2 my-4">
      <v-data-table
        :headers="headers"
        :items="selectedFile"
        :loading="loadingFile"
        loading-text="Carregando arquivo..."
        hide-default-footer
        :items-per-page="99999"
      >
      </v-data-table>
    </div>
  </base-card>
</template>

<script>
import BaseCard from '../../../components/UI/BaseCard.vue'

export default {
  components: { BaseCard },
  data() {
    return {
      selectedFile: [],
      loadingFile: false,
      collectSerie: null,
      collectNum: null,
      headers: [
        {
          text: 'Cod. Material',
          align: 'start',
          sortable: true,
          value: 'collectMaterial',
          width: '15%',
        },
        { text: 'Material', value: 'collectMaterialName.MAT_DESC_RESUMIDA' },

        { text: 'Fornecedor', value: 'collectSuppliersName.FNE_NOME_FANTASIA' },
        { text: 'Quantidade', value: 'collectQuantity', align: 'end' },
      ],
    }
  },
  methods: {
    async handleFileUpload() {
      this.loadingFile = true
      const { files } = this.$refs.fileInput
      const file = files?.[0]

      if (!file) {
        console.log('Nenhum arquivo selecionado')
        this.loadingFile = false
        this.selectedFile = []
        return
      }

      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await this.$axios.post('/collect/list', formData)
        console.log(response.data)
        this.selectedFile = response.data
      } catch (error) {
        this.$toast.error('Erro ao carregar o arquivo', {
          position: 'top-center',
        })
        console.error(error)
      } finally {
        this.loadingFile = false
      }
    },

    async uploadFile() {
      this.loadingFile = true
      const { files } = this.$refs.fileInput
      const file = files?.[0]

      if (!file) {
        this.$toast.error('Nenhum arquivo selecionado', {
          position: 'top-center',
        })
        this.loadingFile = false
        this.selectedFile = []
        return
      }

      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await this.$axios.post(
          `collect?collectSerie=${this.collectSerie}&collectNum=${this.collectNum}`,
          formData
        )

        console.log(response.data)
        this.$toast.success('Arquivos importados', {
          position: 'top-center',
        })
        this.selectedFile = []
      } catch (error) {
        console.error(error)
        this.$toast.error('Erro ao importar o arquivo', {
          position: 'top-center',
        })
      } finally {
        this.loadingFile = false
      }
    },
  },
}
</script>

<style>
.v-label {
  font-size: 13px !important;
}
</style>
