<!--
 * @Author: ecstAsy
 * @Date: 2022-10-02 14:02:11
 * @LastEditTime: 2022-10-10 14:38:49
 * @LastEditors: ecstAsy
-->

<template>
  <svg
    class="moko-svg"
    aria-hidden="true"
    :style="{
      marginLeft: `${left}px`,
      marginRight: `${right}px`,
      marginTop: `${top}px`,
      color: color,
      fontSize:`${fontSize}px`
    }"
  >
    <use
      :xlink:href="symbolId"
      :fill="color"
    />
  </svg>
</template>

<script setup lang="ts" name="MoSvg">
import { computed } from "vue";

interface Props {
  prefix?: string
  name: string
  color?: string
  left?: number
  right?: number
  top?: number
  fontSize?: number
}
const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  color: '#333',
  left: 0,
  right: 0,
  top: 0,
  fontSize: 14
}) 
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style lang="scss" scoped>
.moko-svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>