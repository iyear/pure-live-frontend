<template>
  <el-container>
    <el-header height="35px">
      <NavBar />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <SideBar />
      </el-aside>
      <el-main>
        <el-collapse-transition>
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-collapse-transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "./SideBar";
import NavBar from "./NavBar";

export default {
  name: 'PageLayout',
  components: {
    SideBar,
    NavBar,
  },
}
</script>

<style scoped>
.el-aside {
  height: calc(100vh-35px);
}
</style>
