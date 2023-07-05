<script setup lang="ts">
import type { FormInst } from 'naive-ui'

useHead({
  title: '登录',
})

definePageMeta({
  layout: 'blank',
})

const loginFormRef = ref<FormInst | null>(null)
const loginForm = ref({
  username: '',
  password: '',
})
</script>

<template>
  <div class="flex items-center justify-between">
    <h2>登录羊村</h2>
    <nuxt-link to="/register">
      <NButton quaternary type="primary" size="tiny">
        还未入村？
      </NButton>
    </nuxt-link>
  </div>
  <NForm ref="loginFormRef" class="w-[340px]" size="large">
    <NFormItem :show-label="false" path="username">
      <NInput v-model="loginForm.username" clearable placeholder="用户名" />
    </NFormItem>
    <NFormItem :show-label="false" path="password">
      <NInput v-model="loginForm.password" clearable placeholder="密码" type="password" />
    </NFormItem>

    <div>
      <NButton class="w-full" type="primary">
        登录
      </NButton>
    </div>
  </NForm>
</template>

<style scoped>

</style>
