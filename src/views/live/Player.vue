<template>
  <div>
    <div id="player"></div>
    <el-container style="margin-top: 15px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select v-model="plat" placeholder="请选择平台">
            <el-option v-for="plat in this.$store.state.plats" :key="plat.id" :label="plat.name" :value="plat.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="room" placeholder="RoomID"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="getRoomInfo" type="primary" round>Load</el-button>
        </el-col>
        <el-col :span="2">
          <el-dropdown trigger="hover" :show-timeout="100" placement="bottom" @command="menuHandle">
            <i class="el-icon-more" style="margin-top: 12px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="goto" icon="el-icon-top-right">前往直播间</el-dropdown-item>
              <el-dropdown-item command="get" icon="el-icon-link">复制直播流地址</el-dropdown-item>
              <el-dropdown-item command="fav" icon="el-icon-star-on">收藏</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dialog title="直播流" :visible.sync="displayOrigin" :close-on-click-modal="false"
                     :close-on-press-escape="false" :show-close="true">
            <el-input prefix-icon="el-icon-link" :value="origin"></el-input>
          </el-dialog>
          <el-dialog title="收藏直播间" :visible.sync="displayFav" :close-on-click-modal="false"
                     :close-on-press-escape="false" :show-close="true" width="35%">
            <el-select v-model="favSelected" placeholder="请选择收藏夹" style="margin-right: 20px">
              <el-option
                  v-for="list in favLists"
                  :key="list.id"
                  :label="list.title"
                  :value="list.id">
              </el-option>
            </el-select>
            <el-button @click="addFav" type="primary" round>确定</el-button>
          </el-dialog>
        </el-col>
        <el-col :span="6">
          <el-alert
              :title="getHot"
              type="error"
              :closable="false">
          </el-alert>
        </el-col>
      </el-row>
    </el-container>
  </div>

</template>

<script>
import DPlayer from 'dplayer';
import flvJS from 'flv.js'
import hlsJS from 'hls.js'
import util from "./util"

export default {
  name: "Player",
  computed: {
    getHot() {
      return "热度: " + util.transformNum(this.hot)
    }
  },
  watch: {
    room: function (val) {
      this.room = val
      this.$store.commit("player/setRoom", {room: val})
    },
    plat: function (val) {
      this.plat = val
      this.$store.commit("player/setPlat", {plat: val})
    }
  },
  methods: {
    init() {
      const options = {
        container: document.getElementById('player'),
        live: true,
        hotkey: true,
        screenshot: true,
        danmaku: true,
        video: {
          // url:"https://usher.ttvnw.net/api/channel/hls/tsm_imperialhal.m3u8?allow_source=true&dt=2&fast_bread=true&player_backend=mediaplayer&playlist_include_framerate=true&reassignments_supported=true&sig=d0385e3ce933c8fe76ff6a9a4d9ce01e29b04f6b&supported_codecs=vp09%2Cavc1&token=%7B%22adblock%22%3Afalse%2C%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22blackout_enabled%22%3Afalse%2C%22channel%22%3A%22tsm_imperialhal%22%2C%22channel_id%22%3A146922206%2C%22chansub%22%3A%7B%22restricted_bitrates%22%3A%5B%5D%2C%22view_until%22%3A1924905600%7D%2C%22ci_gb%22%3Afalse%2C%22geoblock_reason%22%3A%22%22%2C%22device_id%22%3Anull%2C%22expires%22%3A1638161547%2C%22extended_history_allowed%22%3Afalse%2C%22game%22%3A%22%22%2C%22hide_ads%22%3Afalse%2C%22https_required%22%3Atrue%2C%22mature%22%3Afalse%2C%22partner%22%3Afalse%2C%22platform%22%3A%22web%22%2C%22player_type%22%3A%22site%22%2C%22private%22%3A%7B%22allowed_to_view%22%3Atrue%7D%2C%22privileged%22%3Afalse%2C%22role%22%3A%22%22%2C%22server_ads%22%3Atrue%2C%22show_ads%22%3Atrue%2C%22subscriber%22%3Afalse%2C%22turbo%22%3Afalse%2C%22user_id%22%3Anull%2C%22user_ip%22%3A%22203.175.12.116%22%2C%22version%22%3A2%7D&cdm=wv&player_version=1.4.0",
          // type:"hls"
        },
        apiBackend: {
          read: function (option) {
            option.success();
          },
          send: this.sendDanmaku
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

      this.$store.commit('player/setTitle', {title: d.data.title});
      this.$store.commit('player/setUpper', {upper: d.data.upper});
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
        this.$store.commit('player/setUUID', {uuid: util.getCookie('uuid')})
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
    sendDanmaku(options) {
      const data = options.data
      this.$axios.post(`${this.$store.getters["player/getHTTP"]}/live/danmaku/send`, {
        id: this.$store.state.player.uuid,
        content: data.text,
        type: data.type,// 1:顶部 0:滚动 2:底部
        color: data.color,
      }).then(resp => {
        console.log(resp);
        const d = resp.data;
        if (d.code !== 0) {
          this.$message.error(`发送失败!错误: ${d.msg}`);
          return;
        }
        this.$message.success('发送成功!')
      })

    }
  },
  mounted() {
    window.flvjs = flvJS
    window.hlsjs = hlsJS
    this.init();
  },
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
  activated() {
    this.player.danmaku.clear();
    if (this.ws !== null) {
      this.player.play();
    }
    this.room = this.$store.state.player.room
    this.plat = this.$store.state.player.plat
    if (this.$store.state.player.playStatus === 1) {
      this.getRoomInfo()
      this.$store.commit("player/setStatus", {playStatus: 0})
    }
  },
  deactivated() {
    this.player.danmaku.clear();
    if (this.ws !== null) {
      this.player.pause();
    }
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
