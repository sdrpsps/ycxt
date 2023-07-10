<script setup lang="ts">
import type { Catalogue } from '@prisma/client'

defineProps({
  data: Array<Catalogue>,
})
</script>

<template>
  <ul class="list-none">
    <li
      v-for="(item, index) in data"
      :key="item.id"
      class="hover: ( !bg-gray-100) active:( !bg-gray-200) flex cursor-pointer border-b p-5 text-sm"
      @click="navigateTo(item.source, { external: true })"
    >
      <NTag :bordered="false" type="info" size="small" class="mr-3">
        第{{ index + 1 }}节
      </NTag>
      <span>{{ item.title }}</span>
    </li>
  </ul>
</template>
