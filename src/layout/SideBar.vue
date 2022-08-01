<template>
  <el-menu
    router
    :default-active="$route.path"
  >
    <el-menu-item
      v-for="(item,i) in items"
      :key="i"
      :index="item.path"
    >
      <i :class="item.icon" />
      <span>{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "SideBar",
  props: {},
  data() {
    return {
      items: [
        {icon: "el-icon-position", title: "直播间", path: "/live"},
        {icon: "el-icon-star-off", title: "收藏夹", path: "/fav/manage"}
      ]
    }
  },
  methods: {},
}
</script>

<style scoped>
.item {
  margin: 4px;
}
</style>
