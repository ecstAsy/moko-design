<!--
 * @Author: ecstAsy
 * @Date: 2022-10-11 15:35:07
 * @LastEditTime: 2022-10-12 14:20:55
 * @LastEditors: ecstAsy
-->

<template>
  <el-dialog
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="props.destroyOnClose"
    :title="props.title"
    :width="props.width"
    :append-to-body="props.appendToBody"
    @closed="emit('closed')"
    @close="emit('cancel')"
    @open="emit('open')"
  >
    <template v-if="!props.header" #header>
      <div
        class="moko-dialog-header"
        :style="{
          justifyContent: props.headerAlign,
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

interface Props {
  visible: boolean;
  loading?: boolean;
  title: string;
  header?: boolean;
  headerAlign?: string;
  width?: string | number;
  appendToBody?: boolean;
  confirmText?: string;
  cancelText?: string;
  destroyOnClose?: boolean;
  showFooter?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  loading: false,
  title: '名称',
  header: true,
  headerAlign: 'flex-start',
  appendToBody: false,
  width: '700px',
  confirmText: '确认',
  cancelText: '取消',
  destroyOnClose: false,
  showFooter: true,
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
