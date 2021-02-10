import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ocultarInicio: true,
  },
  mutations: {
    ocultarInicio(state, payload) {
      state.ocultarInicio = payload;
    },
    ocultarAgregar(state, payload) {
      state.ocultarInicio = payload;
    }
  },
  actions: {
    accionOcultarInicio({ commit }, value) {
      commit('ocultarInicio', value);
    },
    accionOcultarAgregar({ commit }, value) {
      commit('ocultarAgregar', value);
    },
    accionItemMenu({ commit }, objeto) {
      (objeto.ocultarInicio)
        ? commit('ocultarInicio', objeto.ocultarInicio)
        : commit('ocultarAgregar', objeto.ocultarInicio);
    }
  },
  getters: {
    ocultarInicio: state => !!state.ocultarInicio
  },
  modules: {
  }
})
