<template>
  <div class="el-page-header">
    <div class="el-page-header__content title">
      Pure-Live
    </div>
    <div class="el-page-header__content title">
      {{ this.$store.state.player.title }}
    </div>
    <div class="el-page-header__content upper">
      {{ this.$store.state.player.upper }}
    </div>
  </div>
</template>

<script>
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
