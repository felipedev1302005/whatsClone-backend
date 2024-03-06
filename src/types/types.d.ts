export interface userBasicInfo {
  name: string
  phone: number
  password: string
}
export interface chatBasicInfo {
  user_1: number
  user_2: number
}
export interface messageBasicInfo {
  chat_id: string
  of_user:number
  message_content:string
  date: Date
}
export interface verifyTokenUser {
  phone: number
  iat: number
}