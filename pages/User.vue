<!-- 用户：个人中心页面 -->
<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()
const pageKey = computed(() => route.fullPath)

const menus = [{
  title: '已购课程',
  path: '/user/purchased',
}, {
  title: '修改资料',
  path: '/user/info',
}, {
  title: '修改密码',
  path: '/user/password',
}]

const activePath = computed(() => route.path)
</script>

<template>
  <NGrid :x-gap="20">
    <NGridItem :span="5">
      <ul class="m-0 list-none rounded bg-white p-0">
        <li
          v-for="(item, index) in menus" :key="index"
          class="hover: (bg-blue-50) cursor-pointer p-5 text-sm"
          :class="{ active: (item.path === activePath) }"
          @click="navigateTo(item.path)"
        >
          {{ item.title }}
        </li>
      </ul>
    </NGridItem>
    <NGridItem :span="19">
      <div class="mb-5 min-h-[66vh] rounded bg-white">
        <NuxtPage :page-key="pageKey" />
      </div>
    </NGridItem>
  </NGrid>
</template>

<style>
.active {
  font-weight: bold;
  color: rgba(0, 175, 65);
  background-color: rgba(229, 231, 235);
}
</style>
