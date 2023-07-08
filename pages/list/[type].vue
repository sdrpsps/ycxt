<script setup lang="ts">
import type { IColumnsListResponse, ICoursesListResponse } from '~/types/list'

const route = useRoute()
const type = route.params.type as string
const title = type === 'course' ? '课程' : '专栏'
useHead({ title })

const requestURL = type === 'course' ? '/api/list/courses' : '/api/list/columns'
const page = ref(1)
const size = ref(4)

const { data, refresh } = useGet<IColumnsListResponse | ICoursesListResponse>(requestURL, { page, size })

function onPageChange(pageNum: number) {
  page.value = pageNum
  refresh()
}
</script>

<template>
  <div>
    <NBreadcrumb class="mb-5">
      <NBreadcrumbItem>
        <nuxt-link to="/">
          首页
        </nuxt-link>
      </NBreadcrumbItem>
      <NBreadcrumbItem>
        {{ title }}
      </NBreadcrumbItem>
    </NBreadcrumb>
    <!-- 课程渲染 -->
    <NGrid :x-gap="20" :cols="4">
      <NGi v-for="item in data?.data.list" :key="item.id">
        <Prod :data="item" :type="type" />
      </NGi>
    </NGrid>
    <!-- 分页组件 -->
    <div class="mb-10 mt-5 flex items-center justify-center">
      <NPagination
        size="large" :item-count="data?.data.total" :page="page" :page-size="size"
        :on-update:page="onPageChange"
      />
    </div>
  </div>
</template>
