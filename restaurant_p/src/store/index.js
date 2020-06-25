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
    admin: {},
    storeId: "",
    hostId: "",
    isRefesh: true,
    scheduleList: []
  },

  mutations: {
    login(state, admin) {
      state.admin = admin;
      state.isLogin = true;
    },
    setStoreId(state, storeId) {
      state.storeId = storeId;
    },
    setHostId(state, hostId) {
      state.hostId = hostId;
    },
    signOut(state) {
      state.isLogin = false;
      state.admin = {};
      state.token = "";
      state.storeId = "";
      state.hostId = "";
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
