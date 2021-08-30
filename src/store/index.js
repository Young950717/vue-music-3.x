import { createStore, createLogger } from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getter'
import * as actions from './actions'
const notProd = process.env.NODE_ENV !== 'production'
export default createStore({
  state,
  getters,
  mutations,
  actions,
  strict: notProd,
  plugins: notProd ? [createLogger()] : []
})
