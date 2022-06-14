export interface OptionValue {
    label: string
    value: number
  }

  export interface Response<T> {
    data: T
    msg: string
    code: number
  }
  
  export interface Paginator {
    page: number
    limit: number
  }

  export type Role = 'manager' | 'teacher' | 'student'
