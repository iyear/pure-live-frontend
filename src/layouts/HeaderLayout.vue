<template>
  <div>
    <el-row>
      <el-col :span="8">
        <h1>
          {{ appName }}
        </h1>
      </el-col>

      <el-col :span="8">
      </el-col>

      <el-col :span="8">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { APP_NAME } from '@/global'

export default {
  name: "NavBar",
  data() {
    return {
      appName: APP_NAME,
    }
  },
}
</script>

<style scoped>
div {
  height: 4rem;
  border-bottom: 1px solid #409EFF;
}

h1 {
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
