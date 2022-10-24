<template>
  <el-container>
    <el-header>
      <HeaderLayout />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <SideLayout />
      </el-aside>
      <el-container>
        <el-main>
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-main>
        <el-footer>
          <FooterLayout />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import FooterLayout from "./FooterLayout";
import HeaderLayout from "./HeaderLayout";
import SideLayout from "./SideLayout";

export default {
  name: 'PageLayout',
  components: {
    FooterLayout,
    HeaderLayout,
    SideLayout,
  },
}
</script>

<style scoped>

</style>
