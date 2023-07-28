<template>
  <div>
    <v-footer :absolute="!fixed" app>
      <span class="text-gray-500">
        &copy; {{ currentYear }} {{ companyName }} - V. {{ appVersion }}
      </span>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
      companyName: 'Exato Consultoria',
      appVersion: '1.0',
      currentYear: new Date().getFullYear(),
    }
  },
}
</script>

<style></style>
