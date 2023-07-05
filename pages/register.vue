<script setup lang="ts">
import type { FormInst } from 'naive-ui'

useHead({
  title: '注册',
})

definePageMeta({
  layout: 'blank',
})

const registerFormRef = ref<FormInst | null>(null)
const registerForm = ref({
  username: '',
  password: '',
  repassword: '',
})
</script>

<template>
  <div class="flex items-center justify-between">
    <h2>注册羊村</h2>
    <nuxt-link to="/login">
      <NButton quaternary type="primary" size="tiny">
        已经入村？
      </NButton>
    </nuxt-link>
  </div>
  <NForm ref="registerFormRef" class="w-[340px]" size="large">
    <NFormItem :show-label="false" path="username">
      <NInput v-model="registerForm.username" clearable placeholder="用户名" />
    </NFormItem>
    <NFormItem :show-label="false" path="password">
      <NInput v-model="registerForm.password" clearable placeholder="密码" type="password" />
    </NFormItem>
    <NFormItem :show-label="false" path="repassword">
      <NInput v-model="registerForm.repassword" clearable placeholder="确认密码" type="password" />
    </NFormItem>

    <div>
      <NButton class="w-full" type="primary">
        注册
      </NButton>
    </div>

    <div class="mt-5 flex w-full items-center justify-center text-xs text-gray-600">
      注册即同意
      <NButton quaternary type="primary" size="tiny">
        《服务协议》
      </NButton>
      和
      <NButton quaternary type="primary" size="tiny">
        《隐私政策》
      </NButton>
    </div>
  </NForm>
</template>

<style scoped>

</style>
