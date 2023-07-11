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
const { data: columnData, error: columnError } = await useGet<IColumnsResponse>('/api/index/columns')
const { data: courseData, error: courseError } = await useGet<ICoursesResponse>('/api/index/courses')
if (process.server && (columnError.value || courseError.value))
  showError('获取数据失败！')
</script>

<template>
  <div>
    <NCarousel show-arrow>
      <div v-for="item in slides" :key="item.label" class="h-[150px] w-full cursor-pointer rounded text-center leading-[400px] text-white lg:h-[400px]" :style="{ backgroundColor: item.bgColor }">
        {{ item.label }}
      </div>
    </NCarousel>

    <ProdList
      :data="columnData!.data"
      title="最新专栏"
      type="column"
    />

    <ProdList
      :data="courseData!.data"
      title="最新课程"
      type="course"
    />
  </div>
</template>
