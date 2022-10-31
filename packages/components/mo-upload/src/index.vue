<!--
 * @Author: ecstAsy
 * @Date: 2022-10-27 15:39:07
 * @LastEditTime: 2022-10-31 13:29:21
 * @LastEditors: ecstAsy
-->

<template>
  <span>
    <el-upload ref="upload" class="moko-upload">dd</el-upload>
  </span>
</template>

<script setup lang="ts" name="MoUpload">
import { reactive, ref, watch } from 'vue';
import type { ButtonType } from 'element-plus/es/components/button/src/button';
import type { UploadFile } from 'element-plus';
import { ElMessage } from 'element-plus';
import { BlobExport } from 'ecstasy-tools';

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
  batchDownload?: boolean;
  config: {
    limit?: number;
    multiple?: boolean;
    action: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  btnText: '选择文件',
  btnType: 'primary',
  tipText: '',
  limit: 1,
  multiple: false,
  batchDownload: false,
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
