<!--
 * @Author: ecstAsy
 * @Date: 2022-10-13 15:54:48
 * @LastEditTime: 2022-10-24 13:18:41
 * @LastEditors: ecstAsy
-->

<template>
  <mo-table v-bind="tableProps">
    <template #action>
      <el-button link type="primary"> 编辑 </el-button>
      <el-button link type="danger"> 删除 </el-button>
    </template>
  </mo-table>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { tableDatas } from './data-source';

const tableProps = reactive({
  columns: [
    {
      key: 'id',
      title: '#',
      dataIndex: 'id',
    },
    {
      key: 'name',
      title: '姓名',
      dataIndex: 'name',
    },
    {
      key: 'age',
      title: '年龄',
      dataIndex: 'age',
    },
    {
      key: 'sex',
      title: '性别',
      dataIndex: 'sex',
    },
    {
      key: 'address',
      title: '地址',
      dataIndex: 'address',
    },
    {
      key: 'action',
      title: '操作',
      render: 'action',
    },
  ],
  loadData: tableDatas,
  lazyLoad: false,
});
</script>
