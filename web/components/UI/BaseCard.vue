<template>
  <div class="mt-3">
    <div>
      <h1 class="headline font-weight-light mb-4">
        <i>
          <v-icon size="30" class="px-3">{{ icon }}</v-icon
          >{{ text }}
        </i>
      </h1>
    </div>
    <div class="min-h-[82vh] bg-white px-3 py-5">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['text', 'icon'],
}
</script>

<style></style>
