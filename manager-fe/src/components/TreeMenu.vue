<!--
 * @Author: zxy
 * @Date: 2021-10-09 18:48:23
 * @LastEditTime: 2021-12-08 22:02:15
 * @FilePath: /manfe-t/src/components/TreeMenu.vue
-->
<template>
  <template v-for="menu in userMenu">
    <el-submenu
      v-if="
        menu.children &&
        menu.children.length > 0 &&
        menu.children[0].menuType == 1
      "
      :key="menu._id"
      :index="menu.path"
    >
      <template #title>
        <i :class="menu.icon"></i>
        <span>{{ menu.menuName }}</span>
      </template>
      <tree-menu :userMenu="menu.children" />
    </el-submenu>
    <el-menu-item
      v-else-if="menu.menuType == 1"
      :index="menu.path"
      :key="`${menu._id}`"
      >{{ menu.menuName }}</el-menu-item
    >
  </template>
</template>
<script>
export default {
  name: "TreeMenu",
  props: {
    userMenu: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>