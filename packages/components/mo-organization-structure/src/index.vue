<!--
 * @Author: ecstAsy
 * @Date: 2022-11-30 10:41:36
 * @LastEditTime: 2022-11-30 17:59:53
 * @LastEditors: ecstAsy
-->
<template>
  <span class="organization-structure">
    <el-button type="primary" @click="onChoose"> 选择 </el-button>
    <mo-dialog v-bind="State.dialogProps" @cancel="onClose">
      <div class="organization-structure-content">
        <div class="organization-structure-content-left">
          <el-input clearable suffix-icon="Search" placeholder="请输入用户名" />
          <el-scrollbar height="400px">
            <ul class="selected-user">
              <li class="selected-user-item" v-for="item in 100">
                <span>王老吉</span>
                <moko-icon icon="Delete" class="delete-icon" />
              </li>
            </ul>
          </el-scrollbar>
        </div>
        <div class="organization-structure-content-right">right</div>
      </div>
    </mo-dialog>
  </span>
</template>

<script setup lang="ts" name="MoOrganizationStructure">
import { reactive } from 'vue';
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
      padding: 8px;
    }
  }
}
</style>
