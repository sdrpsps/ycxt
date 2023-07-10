import type { Catalogue, Course } from '@prisma/client'

interface CourseDetailItem extends Course {
  Catalogue: Catalogue[]
}
export interface ICourseDetailResponse {
  statusCode: number
  statusMessage: string
  data: {
    item: CourseDetailItem
    recommend: Course[]
  }
}
