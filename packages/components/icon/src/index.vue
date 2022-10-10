<!--
 * @Author: ecstAsy
 * @Date: 2022-10-10 11:38:24
 * @LastEditTime: 2022-10-10 13:23:17
 * @LastEditors: ecstAsy
-->

<template>
  <el-icon class="moko-icon">
    <component
      :is="icon"
    />
  </el-icon>
</template>

<script setup lang="ts" name="MoIcon">
interface Props {
  icon: string
}
defineProps<Props>();
</script>