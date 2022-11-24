interface BaseResponse<T> {
  [x: string]: any
  result: string
  code: string
  traceId: string
  timestamp: string
  data: T
  message?: string
}
export type HttpResponse<T> = Promise<BaseResponse<T>>
