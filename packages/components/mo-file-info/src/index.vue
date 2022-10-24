<!--
 * @Author: ecstAsy
 * @Date: 2022-10-24 13:30:42
 * @LastEditTime: 2022-10-24 13:49:10
 * @LastEditors: ecstAsy
-->

<template>
  <ul>
    <template v-if="props.files.length">
      <li
        v-for="item in props.files"
        :key="item.id"
        class="moko-file-info-item"
        :style="{
          background: props.bgColor,
        }"
      >
        ff
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { MFileItemInfo } from '../type';
import MokoSvg from '../../mo-svg';

interface Props {
  width?: string;
  bgColor?: string;
  files: Array<MFileItemInfo>;
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  bgColor: '#f9f9f9',
});
</script>
