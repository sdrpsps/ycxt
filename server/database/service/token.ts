import type { JwtPayload } from 'jsonwebtoken'
import type { H3Event } from 'h3'
import jwt from 'jsonwebtoken'

interface userInfo extends JwtPayload {
  exp: number
  username: string
  id: number
}
export function getTokenInfo(e: H3Event): Omit<userInfo, 'exp'> {
  let userInfo: userInfo

  const token = getHeader(e, 'Authorization')

  // 令牌不存在
  if (!token) {
    return createError({
      statusCode: 401,
      statusMessage: 'token不存在!',
    })
  }

  try {
    // 解析token
    userInfo = jwt.verify(token, process.env.SECRET_TOKEN!) as userInfo
    const currentTime = Date.now() / 1000

    if (userInfo.exp < currentTime) {
      return createError({
        statusCode: 403,
        statusMessage: 'token 过期',
      })
    }

    return userInfo
  }
  catch (error) {
    return createError({
      statusCode: 401,
      statusMessage: 'token 不合法',
    })
  }
}
