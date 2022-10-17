<!--
 * @Author: ecstAsy
 * @Date: 2022-10-11 15:11:17
 * @LastEditTime: 2022-10-17 13:12:18
 * @LastEditors: ecstAsy
-->

<template>
  <el-row class="moko-table">
    <el-col>
      <el-table :size="props.size">
        <template
          v-for="column in [...State.columns, ...props.columns]"
          :key="column.key"
        >
          <el-table-column
            :prop="column.key"
            :label="column.title"
            :align="column.align"
            :fixed="column.fixed"
            :width="column.width"
            :type="column.type"
            :sortable="column.sortable"
            :reserve-selection="column.reserveselection"
            :selectable="props.selectable"
          >
            dd
          </el-table-column>
        </template>
      </el-table>
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
import type {
  TableColumnCtx,
  TableColumn,
} from 'element-plus/es/components/table/src/table-column/defaults';
import './index.scss';
import { MColumnItemType, MokoTableStateTypes } from './type';
import { MoneyThousandFormatter, ThousandFormatter } from 'ecstasy-tools';

interface Props {
  aroundBorder?: boolean;
  size?: 'small' | 'default' | 'large';
  pagination?: boolean;
  columns: Array<MColumnItemType>;
  selectable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  aroundBorder: false,
  size: 'default',
  pagination: true,
  selectable: false,
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

// 金额格式化
const MoneyFormatter = (
  row: TableColumn<MColumnItemType>,
  column: TableColumnCtx<any>,
  cellValue: any,
  index: number
) => {
  if (!cellValue && cellValue !== 0) return '--';
  return MoneyThousandFormatter(cellValue);
};
// 数值格式化
const NumberFormatter = (
  row: TableColumn<MColumnItemType>,
  column: TableColumnCtx<any>,
  cellValue: any,
  index: number
) => ThousandFormatter(cellValue);
// 文本格式化
const FieldsFormatter = (
  row: TableColumn<MColumnItemType>,
  column: TableColumnCtx<any>,
  cellValue: any,
  index: number
) => cellValue || '--';
// 数组值转换并格式化（下拉、支持【单选、多选】）
const SelectFormatter = (
  row: TableColumn<MColumnItemType>,
  column: TableColumnCtx<any>,
  cellValue: any,
  index: number
) => {
  let formatterStr = '--';
  if (!Object.keys(row).includes(column.property)) {
    formatterStr = '';
  }
  if (!cellValue) return formatterStr;
};
</script>
