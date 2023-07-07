<script setup lang="ts">
import type { PropType } from 'vue'
import type { Column, Course } from '@prisma/client'

const props = defineProps({
  data: { type: Object as PropType<Course | Column>, required: true },
  type: String,
})

function open() {
  if (props.type === 'course')
    navigateTo(`/course/detail/${props.data!.id}`)
  else
    navigateTo(`/column/detail/${props.data!.id}`)
}
</script>

<template>
  <NCard
    class="mb-5 cursor-pointer !border-0 shadow-md"
    footer-style="padding:0;"
    @click="open"
  >
    <template #cover>
      <img
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        class="h-[150px] w-[100%] object-cover"
        alt=""
      >
    </template>
    <div class="pt-2">
      <span class="w-full truncate font-bold">
        {{ data.title }}
      </span>
    </div>
    <div class="mt-2 flex">
      <div v-if="'price' in data">
        <span class="font-bold text-green-600">
          🌱 {{ data.price }}
        </span>
        <span class="ml-2 text-xs text-gray-500 line-through">
          🌱 {{ data.oPrice }}
        </span>
      </div>

      <span v-else>🌱 免费</span>
    </div>
  </NCard>
</template>

<style scoped>

</style>
