<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

useHead({ title: '购买记录' })

const { data, pending } = useGet('/api/user/purchased')
</script>

<template>
  <div class="p-3">
    <NSkeleton v-if="pending" height="250px" :sharp="false" />
    <template v-else>
      <NCard
        v-for="item in data!.data"
        :key="item.id"
        class="mb-5 cursor-pointer !border-0 shadow-md"
        footer-style="padding:0;"
      >
        <div class="flex">
          <img
            :src="`/${item.cover}`"
            class="h-[150px]"
            alt=""
          >
          <div class="ml-4">
            <h3 class="pt-2">
              <span class="w-full truncate font-bold">
                {{ item.title }}
              </span>
            </h3>
            <div class="mt-2 flex">
              <NButton @click="navigateTo(`/course/detail/${item.id}`)">
                继续学习
              </NButton>
            </div>
          </div>
        </div>
      </NCard>
    </template>
  </div>
</template>
