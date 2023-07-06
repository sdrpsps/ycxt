<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import { useUser } from '~/store/user'
import { usePost } from '~/composabes/useRequest'
import type { IUserRegisterResponse } from '~/types/user'

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
  confirmPass: '',
})
const registerFormRules: FormRules = {
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
  confirmPass: [{
    required: true,
    message: '请再次输入密码',
  }, {
    validator: (rule, value, callback) => {
      if (value !== registerForm.value.password) {
        callback(new Error('两次输入的密码不一致'))
        return false
      }
      else {
        callback()
        return true
      }
    },
    trigger: ['blur', 'input'],
  }],
}

const store = useUser()
const message = useMessage()

function register() {
  registerFormRef.value!.validate(async (errors) => {
    if (!errors) {
      const { data } = await usePost<IUserRegisterResponse>('/register', registerForm)
      if (data.value) {
        // 保存user状态
        store.userInfo = data.value?.data
        message.success('注册成功')
        // 跳转首页
        navigateTo('/')
      }
    }
  })
}
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
  <NForm ref="registerFormRef" :model="registerForm" :rules="registerFormRules" class="w-[340px]" size="large">
    <NFormItem :show-label="false" path="username">
      <NInput v-model:value="registerForm.username" clearable placeholder="用户名" />
    </NFormItem>
    <NFormItem :show-label="false" path="password">
      <NInput v-model:value="registerForm.password" clearable placeholder="密码" type="password" />
    </NFormItem>
    <NFormItem :show-label="false" path="confirmPass">
      <NInput v-model:value="registerForm.confirmPass" clearable placeholder="确认密码" type="password" />
    </NFormItem>

    <div>
      <NButton class="w-full" type="primary" @click="register">
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
