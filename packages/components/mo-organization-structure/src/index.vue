<!--
 * @Author: ecstAsy
 * @Date: 2022-11-30 10:41:36
 * @LastEditTime: 2022-12-02 09:37:54
 * @LastEditors: ecstAsy
-->
<template>
  <span class="organization-structure">
    <el-button type="primary" @click="onChoose"> 选择 </el-button>
    <mo-dialog v-bind="State.dialogProps" @cancel="onClose">
      <div class="organization-structure-content">
        <div class="organization-structure-content-left">
          <el-input
            clearable
            suffix-icon="Search"
            v-model="State.keyword"
            placeholder="请输入用户名"
          />
          <el-scrollbar height="400px">
            <ul class="selected-user">
              <li class="selected-user-item" v-for="item in 100">
                <span>王老吉</span>
                <moko-icon icon="Delete" class="delete-icon" />
              </li>
            </ul>
          </el-scrollbar>
        </div>
        <div class="organization-structure-content-right">
          <div class="structure-title">{{ getSelectToastTitle() }}</div>
          <el-scrollbar height="400px">
            <div class="structure-content">
              <li class="selected-user-item" v-for="item in 100">
                <span>王老吉</span>
                <moko-icon icon="Delete" class="delete-icon" />
              </li>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </mo-dialog>
  </span>
</template>

<script setup lang="ts" name="MoOrganizationStructure">
import { reactive, computed } from 'vue';
import MoDialog from '../../mo-dialog';
import MokoIcon from '../../mo-icon';

interface Props {
  title?: string;
  selectTypes: Array<string>; // company | dep | user
}
const props = withDefaults(defineProps<Props>(), {
  title: '选择成员',
});
const State = reactive<{
  keyword: string;
  dialogProps: any;
}>({
  keyword: '',
  dialogProps: {
    title: props.title,
    visible: false,
    width: '800px',
    destroyOnClose: true,
    appendToBody: true,
  },
});
const getSelectToastTitle = computed(() => () => {
  const selectTypeMaps: {
    [prop: string]: string;
  } = {
    company: '公司',
    dep: '部门',
    user: '人员',
  };
  let arr: Array<string> = [];
  props.selectTypes.map((item) => {
    arr = [...arr, selectTypeMaps[item]!];
  });
  return `选择${arr.join('、')}`;
});
const onChoose = () => {
  State.dialogProps = {
    ...State.dialogProps,
    visible: true,
  };
};
const onClose = () => {
  State.dialogProps = {
    ...State.dialogProps,
    visible: false,
  };
};
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.organization-structure {
  &-content {
    display: flex;
    height: 430px;
    overflow: hidden;
    // background-color: #ccc;
    &-left {
      flex: 1;
      margin-right: 16px;
      border-radius: 6px;
      padding: 9px;
      padding-top: 0;
      .selected-user {
        &-item {
          @include flex-row();
          padding: 8px;
          padding-right: 16px;
          font-size: 14px;
          color: $font-color-primary;
          .delete-icon {
            color: $font-color-regular;
            font-size: 16px;
            cursor: pointer;
            &:hover {
              color: $danger-color;
            }
          }
        }
      }
    }
    &-right {
      flex: 1;
      border: 1px solid #ccc;
      border-radius: 6px;
      overflow: hidden;
      .structure-title {
        width: 100%;
        background-color: #cacaca;
        height: 32px;
        color: $font-color-primary;
        @include flex-row(center);
      }

      .structure-content {
        padding: 8px;
      }
    }
  }
}
</style>
