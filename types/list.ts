import type { Column, Course } from '@prisma/client'

export interface IColumnsListResponse {
  statusCode: number
  statusMessage: string
  data: {
    list: Column[]
    total: number
  }
}

export interface ICoursesListResponse {
  statusCode: number
  statusMessage: string
  data: {
    list: Course[]
    total: number
  }
}
