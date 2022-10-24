<template>
  <div>
    <div class="el-page-header__content title">
      {{ this.$store.state.player.title }}
    </div>
    <div class="el-page-header__content upper">
      {{ this.$store.state.player.upper }}
    </div>
    <Player></Player>
  </div>
</template>

<script>
import Player from "@/views/live/Player";

export default {
  name: "Live",
  components: {
    Player
  }
}

</script>

<style scoped>

</style>
