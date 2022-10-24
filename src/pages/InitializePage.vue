<template>
  <el-card>
    <el-steps direction="vertical" :active="active" :space="100" finish-status="success">
      <el-step title="开始配置 sirius" />
      <el-step title="数据库" />
      <el-step title="管理用户" />
      <el-input placeholder="请输入用户名" maxlength="20" v-model="username" />
      <el-input placeholder="请输入密码" show-password v-model="password" />
      <el-input placeholder="请输入密码" show-password v-model="comfirmPassword" />
      <el-step title="步骤 3" />
    </el-steps>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </el-card>
</template>

<script>
// import local modules
import { APP_NAME } from "@/global";

export default {
  name: "InitPage",
  data() {
    return {
      active: 0,
      username: '',
      password: '',
      comfirmPassword: '',
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) {
        this.active = 0;
      }
    }
  },
  mounted() {
    document.title = `初始化 - ${APP_NAME}`
  },
}
</script>

<style scoped>
.el-card {
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
