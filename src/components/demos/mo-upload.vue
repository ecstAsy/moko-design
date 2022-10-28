<!--
 * @Author: ecstAsy
 * @Date: 2022-10-28 10:50:05
 * @LastEditTime: 2022-10-28 10:52:12
 * @LastEditors: ecstAsy
-->

<template>
  <mo-upload v-model:value="files" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const files = ref([]);
</script>
