<template>
  <el-container>
    <el-header
      height="35px"
      style="margin-top: 10px"
    >
      <nav-bar />
    </el-header>
    <el-container>
      <el-aside
        width="150px"
        style="margin-top: 10px"
      >
        <side-bar />
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
import SideBar from "./SideBar.vue";
import NavBar from "./NavBar.vue";

export default {
  name: 'LayoutIndex',
  components: {
    SideBar,
    NavBar,
  },
}
</script>
