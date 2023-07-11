<script lang="ts" setup>
import type { Column, Course } from '@prisma/client'

defineProps({
  title: {
    type: String,
    default: '标题',
  },
  data: {
    type: Array<Column | Course>,
    required: true,
  },
  type: {
    type: String,
    default: 'course',
  },
})
</script>

<template>
  <div>
    <div class="flex items-center">
      <h2>{{ title }}</h2>
      <NButton quaternary class="ml-auto">
        查看更多
      </NButton>
    </div>
    <ClientOnly>
      <NGrid x-gap="12" cols="1 m:4" responsive="screen" class="mb-6">
        <NGi v-for="item in data" :key="item.id">
          <Prod :data="item" :type="type" />
        </NGi>
      </NGrid>
    </ClientOnly>
  </div>
</template>
