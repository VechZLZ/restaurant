import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

/* eslint-disable no-new */
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    httpUrl: "http://haozheng.club:8894/admin",
    isShowLeft: false,
    LeftWidth: "200px",
    LeftCalss: " ",
    isLogin: false,
    token: "",
    kitchen: {},
    storeId: "",
    hostId: ""
  },
  mutations: {
    login(state, kitchen) {
      state.kitchen = kitchen;
      state.isLogin = true;
    },
    ChangeLeft(state) {
      state.isShowLeft = !state.isShowLeft;
      if (!state.isShowLeft) {
        state.LeftWidth = "200px";
        state.LeftCalss = "flexRight";
      } else {
        state.LeftWidth = "57px";
        state.LeftCalss = "flexLeft";
      }
    },
    beginLeft(state) {
      if (!state.isShowLeft) {
        state.LeftWidth = "200px";
      } else {
        state.LeftWidth = "56px";
      }
    }
  },
  modules: {}
});

export default store;
