import { hash, verify } from 'argon2'
import type { UserInfo } from '~/types/user'
import { getUserByUsername, updateUser } from '~/server/database/repositories/userRepository'
import { getTokenInfo } from '~/server/database/service/token'

export default defineEventHandler(async (e) => {
  const userinfo = getTokenInfo(e) as UserInfo

  try {
    // 获取更新数据
    const body = await readBody(e)

    if (!body || !body.oldPwd || !body.newPwd) {
      return sendError(e, createError({
        statusCode: 400,
        statusMessage: '参数错误',
      }))
    }

    // 验证原密码
    const user = await getUserByUsername(userinfo.username)

    // 校验密码
    const result = await verify(user!.password, body.oldPwd)

    if (!result) {
      return sendError(e, createError({
        statusCode: 400,
        statusMessage: '原密码错误!',
      }))
    }

    // 加密
    const password = await hash(body.newPwd)

    await updateUser(userinfo.id, { password })
    return {
      statusCode: 200,
      statusMessage: '密码修改成功',
    }
  }
  catch (error) {
    console.error(error)
    return sendError(e, createError('更新密码失败!'))
  }
})
