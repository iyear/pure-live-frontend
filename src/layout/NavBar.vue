<template>
  <div class="el-page-header">
    <div class="el-page-header__content title">
      Pure-Live
    </div>
    <el-button round type="primary" icon="el-icon-warning-outline" style="margin-top: -5px;margin-left: 5px"
               @click="githubOpen">
      Github
    </el-button>
    <div class="el-page-header__content title">
      {{ this.$store.state.player.title }}
    </div>
    <div class="el-page-header__content upper">
      {{ this.$store.state.player.upper }}
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    githubOpen() {
      window.open('https://github.com/iyear/pure-live-core', '_blank')
    }

  }
}
</script>

<style scoped>
.title {
  font-size: 25px;
  margin-right: 30px;
}

.upper {
  font-size: 15px;
  margin-top: 5px;
}
</style>
