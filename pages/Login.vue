<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import type { IUserLoginResponse } from 'types/user'
import { useUser } from '~/store/user'

useHead({
  title: '登录',
})

definePageMeta({
  layout: 'blank',
})

const store = useUser()
const message = useMessage()

const loginFormRef = ref<FormInst | null>(null)
const loginForm = ref({
  username: '',
  password: '',
})
const loginFormRules: FormRules = {
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur',
  }],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: 'blur',
  }],
}
function login() {
  loginFormRef.value!.validate(async (errors) => {
    if (!errors) {
      const { data } = await usePost<IUserLoginResponse>('/api/login', loginForm)
      if (data.value) {
        store.userInfo = data.value.data
        message.success('登录成功')
        navigateTo('/')
      }
    }
  })
}
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
  <NForm ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="w-[340px]" size="large">
    <NFormItem :show-label="false" path="username">
      <NInput v-model:value="loginForm.username" clearable placeholder="用户名" />
    </NFormItem>
    <NFormItem :show-label="false" path="password">
      <NInput v-model:value="loginForm.password" clearable placeholder="密码" type="password" />
    </NFormItem>

    <div>
      <NButton class="w-full" type="primary" @click="login">
        登录
      </NButton>
    </div>
  </NForm>
</template>

<style scoped>

</style>
