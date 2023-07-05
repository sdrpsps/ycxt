<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="mx-1 cursor-pointer rounded px-2 py-1 transition-all duration-200  hover:bg-blue-50 hover:text-blue-700 active:bg-blue-100" :class="{ 'menu-item-active': active }">
    <slot />
  </div>
</template>

<style scoped>
.menu-item-active {
  background-color: rgb(219, 254, 238);
  color: rgb(52, 157, 96);
}
</style>
