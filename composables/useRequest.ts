import type { UseFetchOptions } from 'nuxt/app'
import { useUser } from '~/store/user'

type RequestMethods = 'GET' | 'POST' | 'DELETE' | 'PUT'

export function useRequest<T = any>(
  requestURL: string,
  method: RequestMethods,
  data: any,
  options?: UseFetchOptions<T>,
) {
  const token = useUser().userInfo?.token
  const router = useRouter()
  const route = useRoute()

  const newOptions: UseFetchOptions<T> = {
    method,
    headers: { Authorization: token || '' },
    ...options,
  }

  if (method === 'GET' || method === 'DELETE')
    newOptions.params = data

  if (method === 'POST' || method === 'PUT')
    newOptions.body = data

  return useFetch(requestURL, {
    ...newOptions,
    onResponse({ response }) {
      if (response._data.statusCode === 403) {
        message.error('token 过期，请重新登录')
        router.push(`/login?callback=${route.path}`)
      }
      else if (response._data.statusCode !== 200) {
        message.error(response._data.statusMessage)
      }
    },
  })
}

export function useGet<T = any>(requestURL: string, params?: any, options?: UseFetchOptions<T>) {
  return useRequest<T>(requestURL, 'GET', params, options)
}

export function usePost<T = any>(requestURL: string, data: any, options?: UseFetchOptions<T>) {
  return useRequest<T>(requestURL, 'POST', data, options)
}

export function usePut<T = any>(requestURL: string, data: any, options?: UseFetchOptions<T>) {
  return useRequest<T>(requestURL, 'PUT', data, options)
}

export function useDelete<T = any>(requestURL: string, params: any, options?: UseFetchOptions<T>) {
  return useRequest<T>(requestURL, 'DELETE', params, options)
}
