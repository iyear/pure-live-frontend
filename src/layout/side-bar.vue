<script setup>
// import third-party modules
import { ref } from 'vue';
// import local modules
import {APP_NAME} from "../utils/constants";

const items = ref([
  { icon: "el-icon-position", title: "直播间", path: "/live" },
  { icon: "el-icon-star-off", title: "收藏夹", path: "/fav/manage" }
]);
const isCollapse = ref(true);

const AppName = ref(APP_NAME);

function handleOpen(key, keyPath) {
  console.log(key, keyPath);
}

function handleClose(key, keyPath) {
  console.log(key, keyPath);
}
</script>

<template>
  <div>
    <el-radio-group
      v-model="isCollapse"
      style="margin-bottom: 20px;"
    >
      <el-radio-button :label="false">
        展开
      </el-radio-button>
      <el-radio-button :label="true">
        收起
      </el-radio-button>
    </el-radio-group>
    <span>
      {{ AppName }}
    </span>
    <el-menu
      :collapse="isCollapse"
      :default-active="$route.path"
      mode="vertical"
      router
      @close="handleClose"
      @open="handleOpen"
    >
      <el-menu-item
        v-for="(item, i) in items"
        :key="i"
        :index="item.path"
      >
        <i :class="item.icon" />
        <span>{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.item {
  margin: 4px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
