import { post } from '@/utils/http'

export const login = post<any>('/EMS_SaaS_Web/Spring/MVC/entrance/unifier/getPersonByUserNameService', {})
