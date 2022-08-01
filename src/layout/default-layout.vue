<script setup>
// import local modules
import NavBar from "./nav-bar.vue";
import SideBar from "./side-bar.vue";
</script>

<template>
  <el-container>
    <el-aside>
      <SideBar />
    </el-aside>
    <el-container>
      <el-header>
        <nav-bar />
      </el-header>
      <el-main>
        <el-collapse-transition>
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-collapse-transition>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<style scoped>
</style>