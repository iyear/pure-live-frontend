import { BASE_URL } from "@/global"

const Player = {
    namespaced: true,
    state: () => ({
        baseApi: `${BASE_URL}/api/v1`,
        uuid: '',
        plat: '',
        room: '',
        title: '',
        upper: '',
        playStatus: 0
    }),
    getters: {
        getHTTP(state) {
            return "http://" + state.baseApi
        },
        getWS(state) {
            return "ws://" + state.baseApi
        }
    },
    mutations: {
        setTitle(state, data) {
            state.title = data.title
        },
        setUpper(state, data) {
            state.upper = data.upper
        },
        setUUID(state, data) {
            state.uuid = data.uuid
        },
        setRoom(state, data) {
            state.room = data.room
        },
        setPlat(state, data) {
            state.plat = data.plat
        },
        setStatus(state, data) {
            state.playStatus = data.playStatus
        }
    },
    actions: {},

}

export default Player;
