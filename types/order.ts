export interface ICreateOrderResponse {
  statusCode: number
  statusMessage: string
  data: {
    orderId: number
  }
}

export interface IOrderDetailResponse {
  statusCode: number
  statusMessage: string
  data: {
    id: number
    courseId: number
    userId: number
    createdAt: string
    status: string
    course: {
      desc: string
      title: string
      cover: string
      price: string
    }
  }
}
