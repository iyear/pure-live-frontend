// import third-party modules
import Vue from 'vue'
import Vuex from 'vuex'
// import local modules
import Favourite from './favourite';
import Player from "./player";

Vue.use(Vuex)

export default new Vuex.Store({
    state: () => ({
        plats: [
            { id: "bilibili", name: "哔哩哔哩" },
            { id: "huya", name: "虎牙" },
            { id: "douyu", name: "斗鱼" },
            { id: "inke", name: "映客" }
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
        favourite: Favourite
    }
})
