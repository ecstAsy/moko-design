<!--
 * @Author: ecstAsy
 * @Date: 2022-10-24 13:30:42
 * @LastEditTime: 2022-10-28 10:48:35
 * @LastEditors: ecstAsy
-->

<template>
  <ul class="moko-file-info">
    <template v-if="props.files.length">
      <li
        v-for="item in props.files"
        :key="item.id"
        class="moko-file-info-item"
        :style="{
          background: props.bgColor,
        }"
        @click.stop="onPreview(item)"
      >
        <div class="moko-file-info-item-left">
          <moko-icon icon="link" class="file-icon" />
          <span class="file-name">{{ item.name }}</span>
        </div>
        <moko-icon
          class="action-icon"
          icon="download"
          @click.stop="onDownload(item)"
        />
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts" name="MoFileInfo">
import { MFileItemInfo } from '../type';
import MokoIcon from '../../mo-icon';
import { BlobExport } from 'ecstasy-tools';

interface Props {
  width?: string;
  bgColor?: string;
  files: Array<MFileItemInfo>;
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  bgColor: '#f9f9f9',
});

const onPreview = ({ url, name }: MFileItemInfo) => {
  window.open(url);
};
const onDownload = async ({ url, name }: MFileItemInfo) => {
  try {
    await BlobExport({ url, filename: name, options: {} });
    return true;
  } catch (error) {
    return false;
  }
};
</script>

<style lang="scss" scoped>
.moko-file-info {
  padding: 0;
  margin: 0;
  cursor: pointer;

  li {
    list-style: none;
    min-height: 24px;
    padding: 4px 16px;
    border-radius: 4px;
    margin-bottom: 16px;
    line-height: 24px;
  }

  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .file-icon {
        width: 12px;
        height: 24px;
        margin-right: 12px;
        min-width: 12px;
        color: #3f6de9;
      }

      .file-name {
        font-size: 13px;
        color: #333;
      }
    }

    .action-icon {
      width: 12px;
      height: 24px;
      min-width: 12px;
      padding-left: 16px;
      color: #8d939d;
    }

    &:hover {
      .file-name,
      .action-icon {
        color: #3f6de9;
      }
    }
  }
}
</style>
