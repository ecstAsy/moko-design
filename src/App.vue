<template>
  <el-row>
    <el-col>
      <a href="/">
        <img src="/logo.svg" class="logo" alt="Moko logo" />
      </a>
    </el-col>
    <el-col>
      <mo-button>按钮</mo-button>
    </el-col>
    <el-col>
      <mo-icon icon="User" />
    </el-col>
    <el-col>
      <!-- <mo-table /> -->
    </el-col>

    <mo-dialog title="组件" v-model:visible="State.visible" />
  </el-row>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const State = reactive<{
  visible: boolean
}>({
  visible: true
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
