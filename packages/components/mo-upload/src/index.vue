<!--
 * @Author: ecstAsy
 * @Date: 2022-10-27 15:39:07
 * @LastEditTime: 2022-11-01 11:40:03
 * @LastEditors: ecstAsy
-->

<template>
  <span>
    <el-upload
      ref="upload"
      class="moko-upload"
      :action="props.uploadUrl"
      :headers="props.headers"
      :limit="props.limit"
      :multiple="props.multiple"
      :show-file-list="props.showFileList"
      :file-list="fileLists"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :on-exceed="uploadExceed"
    >
      <slot name="content">
        <el-button :type="props.btnType">
          {{ props.btnText }}
        </el-button>
      </slot>
      <template #tip>
        <div v-if="props.tipText" class="el-upload__tip">
          {{ props.tipText }}
        </div>
      </template>
      <template #file="{ file }">
        <div class="file-list-item">
          <span class="file-list-item-name">
            {{ file.name }}
          </span>
          <span class="file-list-item-action">
            <mo-icon icon="Close" @click="onRemove(file)" />
            <mo-icon icon="Download" @click="onDownload(file)" />
          </span>
        </div>
      </template>
    </el-upload>
    <el-button
      v-if="fileLists.length > 1 && props.batchDownload"
      size="small"
      type="primary"
      @click="onBattch"
    >
      批量下载
    </el-button>
  </span>
</template>

<script setup lang="ts" name="MoUpload">
import { ref, watch } from 'vue';
import type { ButtonType } from 'element-plus/es/components/button/src/button';
import type { UploadFile } from 'element-plus';
import { ElMessage } from 'element-plus';
import { BlobExport } from 'ecstasy-tools';
import MoIcon from '../../mo-icon';

const upload = ref();
const filtersFileList = (arr: any[]) => {
  if (!Array.isArray(arr)) return [];
  let values: any[] = [];
  arr.map((item) => {
    if (item.response) {
      values = [...values, item.response.data];
    } else {
      values = [...values, item];
    }
    return values;
  });
  return values;
};
interface RawFile {
  id: number;
  name: string;
  url: string;
}
interface Props {
  value: Array<RawFile> | [] | string;
  btnText?: string;
  btnType?: ButtonType;
  tipText?: string;
  limit?: number;
  multiple?: boolean;
  showFileList?: boolean;
  batchDownload?: boolean;
  uploadUrl: string;
  headers?: any;
}

const props = withDefaults(defineProps<Props>(), {
  btnText: '选择文件',
  btnType: 'primary',
  tipText: '',
  limit: 1,
  multiple: false,
  batchDownload: false,
  showFileList: true,
  headers: {},
});

interface Emits {
  (e: 'update:value', val: string): void;
  (e: 'validate'): void;
}
const emit = defineEmits<Emits>();

const fileLists = ref<Array<any>>([]);

watch(
  () => props.value,
  (val) => {
    if (!val) {
      fileLists.value = [];
    } else if (Array.isArray(val)) {
      fileLists.value = val;
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => fileLists.value,
  (val) => {
    if (val.length) {
      emit('update:value', JSON.stringify(val));
    } else {
      emit('update:value', '');
    }
    emit('validate');
  },
  { deep: true, immediate: true }
);

// success
const uploadSuccess = (
  res: any,
  file: UploadFile,
  fileList: Array<UploadFile>
) => {
  fileLists.value = filtersFileList(fileList);
};
// error
const uploadError = (err: any) => {
  ElMessage.error(err);
};
// remove
// const uploadRemove = (file: UploadFile, fileList:Array<UploadFile>) => {
//   fileLists.value = fileList;
// };

const onRemove = (file: RawFile) => {
  fileLists.value = fileLists.value.filter((item) => item.id !== file.id);
};

const onDownload = async ({ url, name }: RawFile) => {
  try {
    return BlobExport({ url, filename: name, options: {} });
  } catch (error) {
    return false;
  }
};
const uploadExceed = (files: Array<UploadFile>) => {
  upload.value.clearFiles();
  upload.value.handleStart(files[0]);
  upload.value.submit();
};
const onBattch = () => {
  fileLists.value.map((item) => onDownload(item));
};
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.moko-upload {
  :deep(.el-upload-list__item .el-upload-list__item-info) {
    width: 95%;
    margin: 0;
  }

  :deep(.el-upload-list__item-name) {
    white-space: pre-line;
    text-align: left;
  }
}

.file-list-item {
  width: 100%;
  @include flex-row();
  line-height: 32px;
  transition: all 0.5s;

  &-name {
    padding-left: 8px;
    color: $primary-hover-color;
    cursor: pointer;
    &:hover {
      color: $primary-color;
    }
  }
  &-action {
    min-width: 50px;
    align-self: start;
    height: 100%;
    margin-left: 16px;
    color: $font-color-info;
    font-weight: 800;
    padding-top: 4px;

    * {
      cursor: pointer;
      font-size: 16px;
      margin-right: 8px;
      &:hover {
        color: $primary-color;
      }
    }
  }
}
</style>
