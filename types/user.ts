import type { JwtPayload } from 'jsonwebtoken'

export interface IUserLogin {
  username: string
  password: string
}

export interface JWTResponse {
  id: number
  avatar: string
  username: string
  nickname: string
  sex: string
  token: string
}

export interface IUserLoginResponse {
  data?: JWTResponse
  statusCode: number
  statusMessage: string
}

export interface IUserRegisterBody {
  username: string
  password: string
  confirmPass: string
}

export interface IUserRegister {
  username: string
  password: string
}

export interface IUserRegisterResponse extends IUserLoginResponse {

}

export interface UserInfo extends JwtPayload {
  exp: number
  username: string
  id: number
}
