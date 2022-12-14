<!--
 * @Author: ecstAsy
 * @Date: 2022-11-30 10:41:36
 * @LastEditTime: 2022-12-14 13:50:32
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
              <el-tree
                :props="{ label: 'name', children: 'zones', isLeaf: 'leaf' }"
                :load="loadNode"
                lazy
                show-checkbox
              />
            </div>
          </el-scrollbar>
          <!-- 搜索用户 -->
          <div class="structure-search-wrap" v-if="State.keyword">
            <el-scrollbar height="430px">
              <ul class="structure-content">
                <li class="structure-user-item" v-for="item in 100">
                  <div class="structure-user-item-name">
                    <span class="name">王老吉</span>
                    <el-checkbox label="" />
                  </div>
                  <div class="structure-user-item-org">xx公司-xx部门-xx组</div>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </mo-dialog>
  </span>
</template>

<script setup lang="ts" name="MoOrganizationStructure">
import { reactive, computed } from 'vue';
import MoDialog from '../../mo-dialog';
import MokoIcon from '../../mo-icon';
import type Node from 'element-plus/es/components/tree/src/model/node';

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

interface Tree {
  name: string;
  leaf?: boolean;
}
const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve([{ name: 'region' }]);
  }
  if (node.level > 1) return resolve([]);

  setTimeout(() => {
    const data: Tree[] = [
      {
        name: 'leaf',
        leaf: true,
      },
      {
        name: 'zone',
      },
    ];

    resolve(data);
  }, 500);
};
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.organization-structure {
  &-content {
    display: flex;
    height: 430px;
    overflow: hidden;
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
      position: relative;
      .structure-title {
        width: 100%;
        height: 32px;
        @include flex-row(center);
        @include f-s-c(13px, $font-color-primary);
        background-color: #cacaca;
        font-weight: 600;
      }

      .structure-content {
        padding: 8px;
      }

      .structure-search-wrap {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #fff;
        left: 0;
        bottom: 0;
        animation: searchWrap 0.3s ease-in;
        transition: 0.3s all;
        .structure-content {
          .structure-user-item {
            padding: 4px 8px;
            &-name {
              @include flex-row();
              .name {
                @include f-s-c(13px, $font-color-primary);
              }
            }

            &-org {
              @include f-s-c(12px, $font-color-info);
            }
          }
        }
      }
    }
  }
}
@keyframes searchWrap {
  from {
    bottom: -240px;
    opacity: 0;
  }
  to {
    bottom: 0;
    opacity: 1;
  }
}
</style>
