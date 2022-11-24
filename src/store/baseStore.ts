import { defineStore } from 'pinia'
import { BaseStore } from '@/types/common'

const useUserStore = defineStore<string, BaseStore, {}, {}>('base', {
  state: () => ({
    userInfo: {
      pd: '',
      user_id: '',
      person_id: '',
      userName: '',
      userId: '',
      groupCode: '',
      group_code: '',
      isAdmin: '',
      resultType: '',
      projects: [],
      authorizations: []
    },
    project_id: '',
    authId: []
  }),
  getters: {},
  actions: {
    async getUserInfoByLoginName() {}
  }
})

export default useUserStore
