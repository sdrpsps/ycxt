<script setup lang="ts">
import type { ICourseDetailResponse } from '~/types/course'
import type { ICreateOrderResponse } from '~/types/order'

const route = useRoute()
const { id, type } = route.params

const { data } = await useGet<ICourseDetailResponse>(`/api/${type}/${id}`)
useHead({ title: data.value?.data.item.title || '详情' })

const tabs = ref([{
  label: '详情',
  value: 'detail',
}])
const currentTab = ref('detail')

if (type === 'course') {
  tabs.value.push({
    label: '目录',
    value: 'catalogue',
  })
}

async function subscribe() {
  // 创建订单
  const { data } = await usePost<ICreateOrderResponse>('/api/order/create', { courseId: id })

  if (data.value) {
    // 然后跳转订单确认页面
    navigateTo(`/order/confirm?id=${data.value.data.orderId}`)
  }
}
</script>

<template>
  <div>
    <section class="my-2 flex rounded bg-white p-5">
      <NImage
        :src="`/${data?.data.item.cover}`" object-fit="cover"
        class="mr-5 h-[210px] w-[380px] rounded"
      />
      <div class="flex flex-1 flex-col py-2">
        <div class="flex flex-col items-start">
          <div class="flex items-center">
            <span class="mr-2 text-xl">{{ data?.data.item.title }}</span>
          </div>
          <p class="my-2 ml-[0.1rem] text-sm text-gray-400">
            {{ data?.data.item.desc }}
          </p>
          <div v-if="type === 'course'">
            <span class="font-bold text-green-600">
              🌱 {{ data?.data.item.price }}
            </span>
            <span class="ml-2 text-xs text-gray-500 line-through">
              {{ data?.data.item.oPrice }}
            </span>
          </div>
        </div>

        <div v-if="type === 'course'" class="mt-auto">
          <NButton type="primary" @click="subscribe">
            快到碗里来
          </NButton>
        </div>
      </div>
    </section>

    <NGrid :x-gap="20" class="pt-2">
      <NGridItem :span="18">
        <section class="mb-5 rounded bg-white shadow-white">
          <Tabs
            :data="tabs"
            :state="currentTab"
            @change="currentTab = $event"
          />
          <div
            v-if="currentTab === 'detail'"
            class="content px-10 pb-10 pt-4"
            v-html="data?.data.item?.detail"
          />
          <Catalogue v-else :data="data?.data.item.Catalogue" />
        </section>
      </NGridItem>
      <NGridItem :span="6">
        <section class="mb-5 rounded bg-white shadow">
          <div class="border-b p-3 ">
            <h4>精品推荐</h4>
          </div>
          <div class="p-3">
            <Prod v-for="prod in data?.data.recommend" :key="prod.id" :data="prod" />
          </div>
        </section>
      </NGridItem>
    </NGrid>
  </div>
</template>

<style>
.content img {
  max-width: 100% !important;
}
</style>
