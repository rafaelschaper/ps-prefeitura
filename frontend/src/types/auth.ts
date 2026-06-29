import { userType } from "./users"

export type authType = 
  | (userType & {
      token: string
  })
  | null