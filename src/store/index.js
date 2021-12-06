import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Fav = {
    namespaced: true,
    state: () => ({}),
    mutations: {},
    actions: {},
    getters: {}
}

const Player = {
    namespaced: true,
    state: () => ({
        baseApi: "localhost:8081/api/v1",
        uuid: '',
        title: '',
        upper: '',
    }),
    mutations: {
        setTitle(state, data) {
            state.title = data.title
        },
        setUpper(state, data) {
            state.upper = data.upper
        },
        setUUID(state, data) {
            state.uuid = data.uuid
        }
    },
    actions: {},
    getters: {
        getHTTP(state) {
            return "http://" + state.baseApi
        },
        getWS(state) {
            return "ws://" + state.baseApi
        }
    }
}

export default new Vuex.Store({
    state: () => ({
        plats: [
            {id: "bilibili", name: "哔哩哔哩"},
            {id: "huya", name: "虎牙"},
            {id: "douyu", name: "斗鱼"}
        ]
    }),
    mutations: {},
    actions: {},
    getters: {
        getPlat: (state) => (id) => {
            return state.plats.find(plat => plat.id === id)
        }
    },
    modules: {
        player: Player,
        fav: Fav
    }
})
