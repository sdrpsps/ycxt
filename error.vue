<script setup lang="ts">
import { H3Error } from 'h3'

defineProps({
  error: H3Error,
})
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="pt-[14rem]">
    <NResult v-if="error?.statusCode === 403" status="403" title="403 禁止访问" description="总有些门是对你关闭的">
      <template #footer>
        <NButton @click="handleError">
          回到首页
        </NButton>
      </template>
    </NResult>
    <NResult v-else-if="error?.statusCode === 404" status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <NButton @click="handleError">
          回到首页
        </NButton>
      </template>
    </NResult>
    <NResult v-else-if="error?.statusCode === 500" status="500" title="500 服务器错误" description="程序员祭天了">
      <template #footer>
        <NButton @click="handleError">
          回到首页
        </NButton>
      </template>
    </NResult>
    <NResult v-else status="error" title="我也不知道发生了什么事情" :description="error?.message">
      <template #footer>
        <NButton @click="handleError">
          回到首页
        </NButton>
      </template>
    </NResult>
  </div>
</template>
