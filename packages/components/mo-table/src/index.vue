<!--
 * @Author: ecstAsy
 * @Date: 2022-10-11 15:11:17
 * @LastEditTime: 2022-10-13 15:53:57
 * @LastEditors: ecstAsy
-->

<template>
  <el-row class="moko-table">
    <el-col>
      <el-table :size="props.size"></el-table>
    </el-col>
    <el-col v-if="props.pagination">
      <el-pagination
        style="margin: 24px auto"
        :size="props.size"
        background
        layout="prev, pager, next, jumper"
        v-bind="State.pagination"
        @current-change="onCurrentChange"
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts" name="MoTable">
import { reactive } from 'vue';
import './index.scss';
import { MColumnItemType, MokoTableStateTypes } from './type';

interface Props {
  aroundBorder?: boolean;
  size?: 'small' | 'default' | 'large';
  pagination?: boolean;
  columns: Array<MColumnItemType>;
}

const props = withDefaults(defineProps<Props>(), {
  aroundBorder: false,
  size: 'default',
  pagination: true,
});

const State = reactive<MokoTableStateTypes>({
  columns: [],
  dataSource: [],
  pagination: {
    total: 0,
    pageSize: 10,
    currentPage: 1,
  },
});

const onCurrentChange = () => {};
</script>
