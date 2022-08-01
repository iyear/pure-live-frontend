<template>
  <div>
    <el-row>
      <el-col :span="24">
        <span>
          {{ $store.state.player.title }}
        </span>
        <span>
          {{ $store.state.player.upper }}
        </span>
      </el-col>
      <el-col :span="24">
        <div id="player" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-select 
          v-model="plat"
          placeholder="请选择平台"
        >
          <el-option 
            v-for="plat in $store.state.plats"
            :key="plat.id" 
            :label="plat.name" 
            :value="plat.id"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="room"
          placeholder="RoomID"
        />
      </el-col>
      <el-col :span="2">
        <el-button
          type="primary"
          round
          @click="getRoomInfo"
        >
          Load
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-dropdown
          trigger="hover"
          :show-timeout="100"
          placement="bottom"
          @command="menuHandle"
        >
          <i
            class="el-icon-more"
            style="margin-top: 12px"
          />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              command="goto"
              icon="el-icon-top-right"
            >
              前往直播间
            </el-dropdown-item>
            <el-dropdown-item
              command="get"
              icon="el-icon-link"
            >
              复制直播流地址
            </el-dropdown-item>
            <el-dropdown-item
              command="fav"
              icon="el-icon-star-on"
            >
              收藏
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dialog
          title="直播流"
          :visible.sync="displayOrigin"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="true"
        >
          <el-input
            prefix-icon="el-icon-link"
            :value="origin"
          />
        </el-dialog>
        <el-dialog
          title="收藏直播间"
          :visible.sync="displayFav"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="true"
          width="35%"
        >
          <el-select
            v-model="favSelected"
            placeholder="请选择收藏夹"
            style="margin-right: 20px"
          >
            <el-option
              v-for="list in favLists"
              :key="list.id"
              :label="list.title"
              :value="list.id"
            />
          </el-select>
          <el-button
            type="primary"
            round
            @click="addFav"
          >
            确定
          </el-button>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DPlayer from 'dplayer';
import flvJS from 'flv.js'
import hlsJS from 'hls.js'
import util from "@/utils/util"

export default {
  name: "PlayerIndex",
  data() {
    return {
      ws: null,
      player: null,
      plat: "",
      hot: 0,
      room: "",
      origin: "",
      roomLink: "",
      displayOrigin: false,
      displayFav: false,
      favSelected: 1,
      favLists: []
    }
  },
  watch: {
    room: function (val) {
      this.room = val
      this.$store.commit("player/setRoom", { room: val })
    },
    plat: function (val) {
      this.plat = val
      this.$store.commit("player/setPlat", { plat: val })
    }
  },
  mounted() {
    window.flvjs = flvJS
    window.hlsjs = hlsJS
    this.init();
    const q = this.$route.query
    if (q.room !== undefined && q.plat !== undefined) {
      this.$store.commit("player/setRoom", { room: q.room })
      this.room = q.room
      this.plat = q.plat
      this.$store.commit("player/setPlat", { plat: q.plat })
      this.getRoomInfo()
    }
  },
  activated() {
    this.player.danmaku.clear();
    if (this.ws !== null) {
      this.player.play();
    }
  },
  deactivated() {
    this.player.danmaku.clear();
    if (this.ws !== null) {
      this.player.pause();
    }
  },
  methods: {
    init() {
      const options = {
        container: document.getElementById('player'),
        airplay: false,
        apiBackend: {
          read: function (option) {
            option.success();
          },
        },
        danmaku: true,
        hotkey: true,
        live: true,
        volume: 0.7,
        video: {
        },

      }
      this.player = new DPlayer(options);
      this.player.on("play", this.onPlay)
    },
    onPlay() {
      if (this.ws === null) {
        this.player.pause();
      }
    },
    addFav() {
      this.$axios.post(`${this.$store.getters["player/getHTTP"]}/fav/add`, {
        fid: this.favSelected,
        order: 1,
        plat: this.$store.state.player.plat,
        room: this.$store.state.player.room,
        upper: this.$store.state.player.upper
      }).then(resp => {
        const d = resp.data
        if (d.code !== 0) {
          this.$message.error(`添加收藏失败: ${d.msg}`)
          return
        }
        this.$message.success(`添加成功! ID: ${d.data.id}`)
        this.displayFav = false
      })
    },
    menuHandle(cmd) {
      switch (cmd) {
        case "goto": {
          window.open(this.roomLink, '_blank')
          break
        }
        case "get": {
          this.displayOrigin = true
          break
        }
        case "fav": {
          this.getFavLists()
          this.displayFav = true
          break
        }
      }
    },
    getRoomInfo() {
      if (this.ws !== null) {
        this.$router.replace(`/live?room=${this.$store.state.player.room}&plat=${this.$store.state.player.plat}`)
        location.reload()
        return
      }
      this.$axios.get(`${this.$store.getters["player/getHTTP"]}/live/room_info`, {
        params: {
          plat: this.$store.state.player.plat,
          room: this.$store.state.player.room
        }
      }).then(this.getRoomInfoSucc)
    },
    getFavLists() {
      this.$axios.get(`${this.$store.getters["player/getHTTP"]}/fav/list/get_all`)
        .then(resp => {
          const d = resp.data
          console.log(d);
          if (d.code !== 0) {
            this.$message.error(`获取收藏夹列表失败: ${d.msg}`)
            return
          }
          this.favLists = d.data
          this.favLists.sort(function (a, b) {
            return b.order - a.order
          })
          console.log(this.favLists);
        })
    },
    getRoomInfoSucc(resp) {
      console.log(resp.data);
      const d = resp.data;
      if (d.code !== 0) {
        this.$message.error(`获取直播间信息失败: ${d.msg}`);
        return;
      }
      if (d.data.status === 0) {
        this.$message.warning(`${d.data.upper}的直播间未开播`);
        return;
      }

      this.$store.commit('player/setTitle', { title: d.data.title });
      this.$store.commit('player/setUpper', { upper: d.data.upper });
      document.title = `pure-live - ${d.data.title}`

      this.room = d.data.room
      this.roomLink = d.data.link
      console.log(this.roomLink);
      this.getPlayURL()
    },
    getPlayURL() {
      this.$axios.get(`${this.$store.getters["player/getHTTP"]}/live/play_url`, {
        params: {
          plat: this.$store.state.player.plat,
          room: this.$store.state.player.room
        }
      }).then(this.getPlayURLSucc)
    },
    getPlayURLSucc(resp) {
      console.log(resp.data);
      const d = resp.data
      if (d.code !== 0) {
        this.$message.error(`获取直播流失败: ${d.msg}`);
        return
      }
      this.origin = d.data.origin
      this.play(d.data.origin, d.data.type, d.data.cors)
    },
    play(url, type, cors) {
      this.player.danmaku.clear()
      this.hot = 0
      this.player.switchVideo({
        url: cors ? `${this.$store.getters["player/getHTTP"]}/live/play?url=${escape(url)}&type=${type}` : url,
        // url: `${this.$store.getters["player/getHTTP"]}/live/play?url=${escape(url)}&type=${type}`,
        type: type
      })
      this.player.play()
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        console.log('ws close');
        this.ws.close();
      }

      this.ws = new WebSocket(`${this.$store.getters["player/getWS"]}/live/serve?room=${this.room}&plat=${this.plat}`)
      // console.log(document.cookie);
      this.ws.onopen = () => {
        this.$store.commit('player/setUUID', {
          uuid: util.getCookie('uuid')
        })
      }
      this.ws.onmessage = this.wsOnMsg;
    },
    wsOnMsg(evt) {
      let msg = JSON.parse(evt.data);
      switch (msg.type) {
        case 'hot': {
          // console.log(msg.data);
          this.hot = msg.data.hot
          break;
        }
        case 'danmaku': {
          const dm = msg.data;
          const mode = {
            "1": 'top',
            "0": 'right',
            "2": 'bottom',
          }
          // console.log(mode[dm['send_mode']]);
          this.player.danmaku.draw({
            text: dm['content'],
            color: `#${parseInt(dm['color'], 10).toString(16)}`,
            // type: mode[dm['send_mode']],
            type: mode[dm['type']],
          });
          break;
        }
        case 'check': {
          console.log('server check');
        }
      }
    },
  }
}
</script>

<style>
.dplayer-danmaku .dplayer-danmaku-item {
  text-shadow: 1px 1px 1.5px rgba(0, 0, 0, 1);
}

@media screen and (min-width: 0px) and (max-width: 500px) {
  .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
    animation: danmaku 1s linear;
  }
}

@media screen and (min-width: 500px) and (max-width: 800px) {
  .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
    animation: danmaku 5s linear;
  }
}

@media screen and (min-width: 800px) and (max-width: 1000px) {
  .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
    animation: danmaku 8s linear;
  }
}

@media screen and (min-width: 1000px) and (max-width: 1400px) {
  .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
    animation: danmaku 10s linear;
  }
}

@media screen and (min-width: 1400px) and (max-width: 1800px) {
  .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
    animation: danmaku 14s linear;
  }
}

@media screen and (min-width: 1800px) and (max-width: 2200px) {
  .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
    animation: danmaku 18s linear;
  }
}

@media screen and (min-width: 2200px) and (max-width: 2600px) {
  .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
    animation: danmaku 20s linear;
  }
}

@media screen and (min-width: 2600px) and (max-width: 3000px) {
  .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
    animation: danmaku 23s linear;
  }
}

@media screen and (min-width: 3000px) and (max-width: 3400px) {
  .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
    animation: danmaku 28s linear;
  }
}

@media screen and (min-width: 3400px) and (max-width: 4000px) {
  .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
    animation: danmaku 32s linear;
  }
}

@media screen and (min-width: 4000px) and (max-width: 4500px) {
  .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
    animation: danmaku 36s linear;
  }
}
</style>
