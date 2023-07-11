import { omit } from 'lodash-es'
import { updateUser } from '~/server/database/repositories/userRepository'
import { getTokenInfo } from '~/server/database/service/token'

export default defineEventHandler(async (e) => {
  // 验证权限
  const userInfo = getTokenInfo(e)

  try {
    // 获取更新数据
    const body = await readBody(e)

    if (!body || body.username || body.password) {
      let statusMessage
      if (!body)
        statusMessage = '参数不存在'
      else if (body.username)
        statusMessage = '用户名不能修改'
      else
        statusMessage = '请使用修改密码接口'
      return sendError(e, createError({
        statusCode: 400,
        statusMessage,
      }))
    }

    const user = await updateUser(userInfo!.id, body)
    return {
      statusCode: 200,
      statusMessage: '修改成功',
      data: omit(user, 'password'),
    }
  }
  catch (error) {
    return sendError(e, createError('更新用户信息失败!'))
  }
})
