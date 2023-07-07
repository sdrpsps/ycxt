<script setup lang="ts">
import type { IColumnsResponse, ICoursesResponse } from '~/types'

useHead({
  title: '羊村学堂',
})

const slides = [
  { label: '1', bgColor: 'cadetblue' },
  { label: '2', bgColor: 'cornflowerblue' },
  { label: '3', bgColor: 'blueviolet' },
  { label: '4', bgColor: 'brown' },
]
const { data: columnData } = await useGet<IColumnsResponse>('/api/index/columns')
const { data: courseData } = await useGet<ICoursesResponse>('/api/index/courses')
</script>

<template>
  <NCarousel show-arrow>
    <div v-for="item in slides" :key="item.label" class="h-[400px] w-full cursor-pointer rounded text-center leading-[400px] text-white" :style="{ backgroundColor: item.bgColor }">
      {{ item.label }}
    </div>
  </NCarousel>

  <ProdList
    :data="courseData!.data"
    title="最新课程"
    type="course"
  />
  <ProdList
    :data="columnData!.data"
    title="最新专栏"
    type="column"
  />
</template>

<style scoped>

</style>
