import { mutationTree } from 'nuxt-typed-vuex'

export const state = () => ({
  hasUserInfo: false,
  userInfo: {
    uid: '',
    userName: '',
  },
})

export const mutations = mutationTree(state, {
  setUserInfo(state, userInfoBase: firebase.User) {
    const userInfo = {
      userName: userInfoBase.displayName || '',
      uid: userInfoBase.uid,
    }
    if (userInfo.userName === '') {
      throw new Error('Showing name does not exist')
    }
    state.userInfo = userInfo
    state.hasUserInfo = true
  },
})