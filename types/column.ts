import type { Column } from '@prisma/client'

export interface IColumnDetailResponse {
  statusCode: number
  statusMessage: string
  data: {
    item: Column
    recommend: Column[]
  }
}
