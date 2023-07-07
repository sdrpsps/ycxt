import type { Column, Course } from '@prisma/client'

export interface IColumnsResponse {
  statusCode: number
  statusMessage: string
  data: Column[]
}

export interface ICoursesResponse {
  statusCode: number
  statusMessage: string
  data: Course[]
}
