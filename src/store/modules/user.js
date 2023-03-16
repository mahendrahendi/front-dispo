import { login, logout, getUser, getTokenRefresh } from '@/api/user'
import { getToken, setToken, removeToken, setRefreshToken, getRefreshToken, removeRefreshToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  status: '',
  id: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_FIRST_NAME: (state, first_name) => {
    state.first_name = first_name
  },
  SET_LAST_NAME: (state, last_name) => {
    state.last_name = last_name
  },
  SET_PHONE_NUMBER: (state, phone_number) => {
    state.phone_number = phone_number
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_STATUS: (state, status) => {
    state.status = status
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
  // SET_REGNUMBER: (state, regNumber) => {
  //   state.regNumber = regNumber
  // }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: username.trim(), password: password }).then(response => {
        const { data } = response
        setToken(data.access_token)
        // setRefreshToken(data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      // getUser().then(response => {
      //   const { adm_usr_first_name, adm_usr_last_name, adm_usr_role_title, adm_usr_email, adm_usr_mobile, adm_usr_id, adm_usr_active } = response.data
      //   const data = { 
      //     name: adm_usr_first_name + ' ' + adm_usr_last_name, 
      //     roles: adm_usr_role_title, 
      //     first_name: adm_usr_first_name, 
      //     last_name: adm_usr_last_name, 
      //     phone_number: adm_usr_mobile, 
      //     email: adm_usr_email,
      //     id: adm_usr_id,
      //     status: adm_usr_active
      //   }

      //   // roles must be a non-empty array
      //   if (!adm_usr_role_title || adm_usr_role_title.length <= 0) {
      //     reject('getInfo: roles must be a non-null array!')
      //   }

      //   // commit('SET_REGNUMBER',adm_usr_reg_number)
      //   commit('SET_ROLES', adm_usr_role_title)
      //   commit('SET_EMAIL', adm_usr_email)
      //   commit('SET_NAME', adm_usr_first_name + ' ' + adm_usr_last_name)
      //   commit('SET_FIRST_NAME', adm_usr_first_name)
      //   commit('SET_LAST_NAME', adm_usr_last_name)
      //   commit('SET_PHONE_NUMBER', adm_usr_mobile)
      //   commit('SET_STATUS', adm_usr_active)
      //   commit('SET_ID', adm_usr_id)
      //   // commit('SET_AVATAR', adm_usr_picurl)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })


      const adm_usr_first_name = "HENDI"
      const adm_usr_last_name = "MAHENDRA"
      const adm_usr_role_title = [
        "SUPERADMIN"
      ]
      const adm_usr_email = "admin@email.com"
      const adm_usr_mobile = "91238213"
      const adm_usr_id = "1"
      const adm_usr_active = "Active"

      const data = { 
        name: adm_usr_first_name + ' ' + adm_usr_last_name, 
        roles: adm_usr_role_title, 
        first_name: adm_usr_first_name, 
        last_name: adm_usr_last_name, 
        phone_number: adm_usr_mobile, 
        email: adm_usr_email,
        id: adm_usr_id,
        status: adm_usr_active
      }
      // commit('SET_REGNUMBER',adm_usr_reg_number)
      commit('SET_ROLES', adm_usr_role_title)
      commit('SET_EMAIL', adm_usr_email)
      commit('SET_NAME', adm_usr_first_name + ' ' + adm_usr_last_name)
      commit('SET_FIRST_NAME', adm_usr_first_name)
      commit('SET_LAST_NAME', adm_usr_last_name)
      commit('SET_PHONE_NUMBER', adm_usr_mobile)
      commit('SET_STATUS', adm_usr_active)
      commit('SET_ID', adm_usr_id)
      // commit('SET_AVATAR', adm_usr_picurl)
      resolve(data)
    })
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_NAME', '')
      commit('SET_FIRST_NAME', '')
      commit('SET_LAST_NAME', '')
      commit('SET_PHONE_NUMBER', '')
      commit('SET_STATUS', '')
      removeToken()
      // removeRefreshToken()
      resetRouter()
      
      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })
      
      resolve()
    })
  },

  // refresh token
  refreshToken({ commit }) {
    return new Promise(resolve => {
      getTokenRefresh().then(response => {
        const { data } = response
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token)
        setRefreshToken(data.refresh_token)
        resolve(data)
      })
    })
  },

  // reset token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeRefreshToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
