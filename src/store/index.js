import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否认证通过
  SET_USER: 'SET_USER', // 用户信息
}


const state = {
  isAutnenticated: false,  // 是否认证
  user: {
    permissions: [],
    roles: [],
  },  // 存储用户信息


};
const getters = {
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user,
};
const mutations = {
  [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
    if (isAutnenticated)
      state.isAutnenticated = isAutnenticated
    else
      state.isAutnenticated = false
  },
  [types.SET_USER](state, user) {
    if (user) {
      state.user = user;
      state.user.permissions = user.permissions;
      state.user.roles = user.roles;
    } else {
      state.user = {};
    }
  },
};
const actions = {
  setIsAutnenticated: ({ commit }, isAutnenticated) => {
    commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_IS_AUTNENTIATED, false)
    commit(types.SET_USER, null)
  },
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})