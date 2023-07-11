import { useUser } from '~/store/user'

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useUser().userInfo.token
  const route = useRoute()

  // 未登录重定向到登录页
  if (!token) {
    if (process.client)
      message.error('请先登录')

    return navigateTo(`/login?from=${route.fullPath}`)
  }
})
