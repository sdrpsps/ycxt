<script setup lang="ts">
const route = useRoute()

const menus = ref([
  { label: '首页', path: '/' },
  { label: '专栏', path: '/column' },
  { label: '课程', path: '/course' },
])
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-10 bg-white shadow-md">
    <nav class="container m-auto flex h-[60px] items-center px-4">
      <NButton text strong class="text-xl" @click="navigateTo('/')">
        羊村学堂
      </NButton>
      <div class="flex flex-1 items-center px-4">
        <Menu v-for="menu in menus" :key="menu.label" :active="route.path === menu.path" @click="navigateTo(menu.path)">
          {{ menu.label }}
        </Menu>
      </div>
      <NuxtLink>
        <NButton secondary strong @click="navigateTo('/login')">
          登录
        </NButton>
      </NuxtLink>
    </nav>
  </header>
</template>
