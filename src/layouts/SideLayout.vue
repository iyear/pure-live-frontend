<template>
  <el-menu router :default-active="$route.path">
    <el-menu-item v-for="(item, i) in items" :key="i" :index="item.path">
      <i :class="item.icon"></i>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "SideLayout",
  data() {
    return {
      items: [
        { icon: "el-icon-star-off", title: "收藏夹", path: "/" },
        { icon: "el-icon-position", title: "直播", path: "/live" },
      ]
    }
  },
}
</script>

<style scoped>
.item {
  margin: 4px;
}

.el-menu {
  height: calc(100vh-32px);
}
</style>
