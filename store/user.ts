import type { JWTResponse } from 'types/user'

export const useUser = defineStore(
  'user',
  () => {
    // 用户信息
    const userInfo = ref<undefined | JWTResponse>(undefined)

    // 登出
    function onLogout() {
      userInfo.value = undefined
      message.success('退出登录成功')
    }

    return { userInfo, onLogout }
  },
  {
    persist: true,
  },
)
