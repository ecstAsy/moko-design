<!--
 * @Author: ecstAsy
 * @Date: 2022-10-11 15:11:17
 * @LastEditTime: 2022-10-21 10:12:02
 * @LastEditors: ecstAsy
-->

<template>
  <el-row class="moko-table">
    <el-col>
      <el-table
        :size="props.size"
        v-loading="State.loading"
        fit
        :data="props.lazyLoad ? State.dataSource : props.loadData"
      >
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
import { reactive, onMounted } from 'vue';
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
  load?: (params?: any) => any;
  loadData?: Array<any>;
  lazyLoad?: boolean;
  preload?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  aroundBorder: false,
  size: 'default',
  pagination: true,
  selectable: false,
  load: () => null,
  loadData: () => [],
  lazyLoad: false,
  preload: true,
});

const State = reactive<MokoTableStateTypes>({
  loading: false,
  columns: [],
  dataSource: [],
  pagination: {
    total: 0,
    pageSize: 10,
    currentPage: 1,
  },
});

const getData = async (current = 1) => {
  try {
    State.loading = true;
    const res: any = await props.load({
      current,
      pageSize: 10,
    });
    // fields 自定义 header 项
    const { data, pageSize, total, currentPage } = res.data;
    State.dataSource = data;
    State.pagination = {
      ...State.pagination,
      total,
      currentPage,
      pageSize,
    };
  } catch (error) {
    return (State.loading = false);
  }
};
onMounted(() => {
  // 如果懒加载 并且 需要预加载
  props.lazyLoad && props.preload && getData();
});
const onCurrentChange = (current: number) => getData(current);

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
