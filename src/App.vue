<template>
  <div id="app">
    <el-row>
      <el-col>
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script>

</script>

<style scoped>
.el-col {
  max-width: 1920px;
  height: 100vh;
}

.el-row {
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
