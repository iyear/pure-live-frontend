import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const Fav = {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {},
  getters: {},
};

const Player = {
  namespaced: true,
  state: () => ({
    baseApi: `${window.location.host}/api/v1`,
    uuid: '',
    plat: '',
    room: '',
    title: '',
    upper: '',
    // 用于收藏夹跳转和普通切换路由的判定
    playStatus: 0,
  }),
  mutations: {
    setTitle(state, data) {
      state.title = data.title;
    },
    setUpper(state, data) {
      state.upper = data.upper;
    },
    setUUID(state, data) {
      state.uuid = data.uuid;
    },
    setRoom(state, data) {
      state.room = data.room;
    },
    setPlat(state, data) {
      state.plat = data.plat;
    },
    setStatus(state, data) {
      state.playStatus = data.playStatus;
    },
  },
  actions: {},
  getters: {
    getHTTP(state) {
      return 'http://' + state.baseApi;
    },
    getWS(state) {
      return 'ws://' + state.baseApi;
    },
  },
};

export default new Vuex.Store({
  state: () => ({
    plats: [
      { id: 'bilibili', name: '哔哩哔哩' },
      { id: 'huya', name: '虎牙' },
      { id: 'douyu', name: '斗鱼' },
      { id: 'egame', name: '企鹅电竞' },
      { id: 'inke', name: '映客' },
    ],
  }),
  mutations: {},
  actions: {},
  getters: {
    getPlat: (state) => (id) => {
      return state.plats.find(plat => plat.id === id);
    },
  },
  modules: {
    player: Player,
    fav: Fav,
  },
});
