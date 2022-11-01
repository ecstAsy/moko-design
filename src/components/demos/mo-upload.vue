<!--
 * @Author: ecstAsy
 * @Date: 2022-10-28 10:50:05
 * @LastEditTime: 2022-11-01 11:38:50
 * @LastEditors: ecstAsy
-->

<template>
  <mo-upload v-model:value="files" upload-url="upload" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const files = ref([
  {
    id: 1,
    name: 'demo1.png',
    url: 'www.demo1.png',
  },
  {
    id: 2,
    name: 'demo2.png',
    url: 'www.demo2.png',
  },
  {
    id: 3,
    name: 'demo3.png',
    url: 'www.demo3.png',
  },
]);
</script>
