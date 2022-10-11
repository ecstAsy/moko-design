<!--
 * @Author: ecstAsy
 * @Date: 2022-10-11 15:54:56
 * @LastEditTime: 2022-10-11 16:10:34
 * @LastEditors: ecstAsy
-->

<template>
  <mo-dialog
    title="组件"
    v-model:visible="visible"
  >
    <div>ddd</div>
  </mo-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  visible: boolean
  name: string
}

const props = defineProps<Props>();

interface Emits {
  (e: 'update:visible', val: boolean): void;
}

const emit = defineEmits<Emits>();

const visible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val),
});
</script>
