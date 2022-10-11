<!--
 * @Author: ecstAsy
 * @Date: 2022-10-11 15:11:17
 * @LastEditTime: 2022-10-11 15:34:18
 * @LastEditors: ecstAsy
-->

<template>
  <el-row>
    <el-table :size="props.size"></el-table>
  </el-row>
</template>

<script setup lang="ts" name="MoTable">
import { MColumnItemType } from "./type";

interface Props {
  aroundBorder?: boolean
  size?: "small" | "default" | "large"
  columns: Array<MColumnItemType>
}

const props = withDefaults(defineProps<Props>(), {
  aroundBorder: false,
  size: "default"
})
</script>