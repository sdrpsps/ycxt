<script setup lang="ts">
import { useUser } from '~/store/user'
import { dialog } from '~/composables/discrete'

const route = useRoute()

const menus = ref([
  { label: '首页', path: '/' },
  { label: '专栏', path: '/list/column' },
  { label: '课程', path: '/list/course' },
])

const options = [
  {
    label: '用户中心',
    key: 'center',
  },
  {
    label: '退出',
    key: 'logout',
  },
]

const store = useUser()
const { userInfo } = storeToRefs(store)
function onSelect(key: string) {
  switch (key) {
    case 'logout':
      dialog.info({
        title: '提示',
        content: '确定退出登录吗？',
        positiveText: '退出',
        negativeText: '取消',
        onPositiveClick: () => store.onLogout(),
      })
      break
    case 'center':
      navigateTo('/user/purchased')
      break
  }
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-10 bg-white shadow-md">
    <nav class="container m-auto box-border flex h-[60px] items-center px-2 lg:px-4">
      <NButton text strong class="text-xl" @click="navigateTo('/')">
        羊村学堂
      </NButton>
      <div class="flex flex-1 items-center px-4">
        <Menu
          v-for="menu in menus"
          :key="menu.label"
          :active="route.path === menu.path"
          @click="navigateTo(menu.path)"
        >
          {{ menu.label }}
        </Menu>
      </div>
      <!-- 标识只在客户端渲染 -->
      <ClientOnly>
        <NuxtLink v-if="!userInfo" to="/login">
          <NButton secondary strong>
            登录
          </NButton>
        </NuxtLink>
        <NDropdown v-else :options="options" @select="onSelect">
          <NAvatar
            round
            size="small"
            :src="userInfo.avatar ? userInfo.avatar : '/avatar.png'"
          />
        </NDropdown>
      </ClientOnly>
    </nav>
  </header>
</template>
store/userStore
store/user
