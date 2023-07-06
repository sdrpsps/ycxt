import type { UseFetchOptions } from '#app'
import { message } from '~/composabes/discrete'

export function useRequest<DataT>(requestURL: string, requestOptions?: UseFetchOptions<DataT>) {
  const router = useRouter()
  const route = useRoute()

  const { public: { baseURL } } = useRuntimeConfig()

  return useFetch(requestURL, {
    baseURL,
    ...requestOptions,
    onRequest({ options }) {
    // 设置请求头
      const token = useCookie<string>('token')
      options.headers = { Authorization: `Bearer ${token.value}` || '' }
    },
    onRequestError() {
      message.error('你可能断网了~')
    },
    onResponse({ response }) {
      if (response._data.statusCode === 403) {
        message.error('没有访问权限')
        router.push(`/login?callback=${route.path}`)
      }
      else if (response._data.statusCode !== 200) {
        message.error(response._data.statusMessage)
      }
    },
  })
}

export function useGet<DataT>(requestURL: string, params: any) {
  return useRequest<DataT>(requestURL, { method: 'get', params })
}

export function usePost<DataT>(requestURL: string, body: any) {
  return useRequest<DataT>(requestURL, { method: 'post', body })
}

export function usePut<DataT>(requestURL: string, body: any) {
  return useRequest<DataT>(requestURL, { method: 'put', body })
}

export function useDelete<DataT>(requestURL: string, body: any) {
  return useRequest<DataT>(requestURL, { method: 'delete', body })
}
