<template>
  <div>
    <el-page-header @back="goBack" content="直播" />
    <el-card shadow="never">
      <LiveTitle />
      <LivePlayer />
    </el-card>
  </div>
</template>
  
<script>
import LivePlayer from "@/components/Live/Player";
import LiveTitle from "@/components/Live/Title";

export default {
  name: "LivePage",
  components: {
    LivePlayer,
    LiveTitle
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
}
</script>
  
<style scoped>
.el-page-header {
  margin: 16px;
}

.el-card {
  border-radius: 1rem;
}
</style>
  