<!--
 * @Author: ecstAsy
 * @Date: 2022-10-11 15:35:07
 * @LastEditTime: 2022-10-13 15:44:29
 * @LastEditors: ecstAsy
-->

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="props.title"
    :width="props.width"
    :close-on-click-modal="props.closeOnClickModal"
    :close-on-press-escape="props.closeOnPressEscape"
    :destroy-on-close="props.destroyOnClose"
    :append-to-body="props.appendToBody"
    @closed="emit('closed')"
    @close="emit('cancel')"
    @open="emit('open')"
  >
    <template v-if="props.headerOptions.custom" #header>
      <div
        class="moko-dialog-header"
        :style="{
          justifyContent: props.headerOptions.align,
        }"
      >
        <span>
          {{ props.title }}
        </span>
        <span class="extra">
          <slot name="header-extra" />
        </span>
      </div>
    </template>
    <div v-loading="props.loading">
      <slot />
    </div>
    <template v-if="props.showFooter" #footer>
      <span class="moko-dialog-footer">
        <slot name="footer">
          <el-button @click="emit('cancel')">{{ props.cancelText }}</el-button>
          <el-button
            v-debounce="() => emit('confirm')"
            :loading="props.loading"
            type="primary"
          >
            {{ props.confirmText }}
          </el-button>
        </slot>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="MoDialog">
import { computed } from 'vue';
import { MheaderOptionsType } from './type';

export interface Props {
  visible: boolean;
  loading?: boolean;
  title: string;
  width?: string | number;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  destroyOnClose?: boolean;
  appendToBody?: boolean;
  headerOptions?: MheaderOptionsType;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  loading: false,
  title: '名称',
  width: '700px',
  closeOnClickModal: false,
  closeOnPressEscape: false,
  destroyOnClose: false,
  appendToBody: false,
  headerOptions: () => ({
    custom: false,
    align: 'left',
  }),
  showFooter: true,
  confirmText: '确认',
  cancelText: '取消',
});
interface Emits {
  (e: 'open'): void;
  (e: 'closed'): void;
  (e: 'cancel'): void;
  (e: 'confirm'): void;
  (e: 'update:visible', val: boolean): void;
}
const emit = defineEmits<Emits>();
const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val),
});
</script>

<style lang="scss" scoped>
.moko-dialog {
  &-header {
    line-height: var(--el-dialog-font-line-height);
    font-size: var(--el-dialog-title-font-size);
    color: var(--el-text-color-primary);
    display: flex;
    flex-direction: row;
    align-items: center;
    .extra {
      margin-left: 24px;
    }
  }
  &-footer {
    justify-content: center;
  }
}
</style>
