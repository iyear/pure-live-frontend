<template>
  <div>
    <h2>
      {{ this.$store.state.player.title }}
    </h2>
    <span @click="handleClick">前往直播间</span>
    <p>
      主播：{{ this.$store.state.player.upper }}
    </p>
  </div>
</template>

<script>
export default {
  name: "LiveTitle",
  methods: {
    handleClick() {
      window.open(this.roomLink, '_blank')
    },
    getRoomInfoSucc(resp) {
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
      document.title = `${d.data.title} - sirius`

      this.roomLink = d.data.link
    },
  }
}
</script>

<style scoped>
div {
  margin-left: 20px;
}

span {
  margin-left: 20px;
}

h2 {
  display: inline-block;
}
</style>