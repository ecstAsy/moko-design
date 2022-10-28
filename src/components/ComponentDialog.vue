<!--
 * @Author: ecstAsy
 * @Date: 2022-10-11 15:54:56
 * @LastEditTime: 2022-10-28 10:51:13
 * @LastEditors: ecstAsy
-->

<template>
  <mo-dialog
    :title="props.title"
    v-model:visible="visible"
    @cancel="props.cancel"
    :showFooter="false"
    :header="false"
    header-align="right"
  >
    <component :is="getComIs()" />
  </mo-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  mobutton,
  moicon,
  mosvg,
  motable,
  moupload,
  mofileinfo,
} from './demos';

interface Props {
  visible: boolean;
  title: string;
  component?: string;
  cancel: () => void;
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

const getComIs = computed(() => {
  const ComMaps: {
    [prop: string]: any;
  } = {
    'mo-button': mobutton,
    'mo-icon': moicon,
    'mo-svg': mosvg,
    'mo-table': motable,
    'mo-upload': moupload,
    'mo-fileinfo': mofileinfo,
  };
  return () => ComMaps[props.component!];
});
</script>
