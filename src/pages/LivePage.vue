<template>
  <div>
    <div class="el-page-header__content title">
      {{ this.$store.state.player.title }}
    </div>
    <div class="el-page-header__content upper">
      {{ this.$store.state.player.upper }}
    </div>
    <Player />
  </div>
</template>
  
<script>
import Player from "@/components/live/Player";

export default {
  name: "LivePage",
  components: {
    Player
  }
}

</script>
  
<style scoped>

</style>
  