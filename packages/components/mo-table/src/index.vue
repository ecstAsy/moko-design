<!--
 * @Author: ecstAsy
 * @Date: 2022-10-11 15:11:17
 * @LastEditTime: 2022-10-21 11:29:04
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
        :show-summary="props.showSummary"
        :class="
          props.grayHeader
            ? 'moko-table-content gray-header'
            : 'moko-table-content'
        "
        :summary-method="getSummaries"
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
            <template v-if="column.scopedSlots" #default="scope">
              <slot v-bind="scope" :name="column.scopedSlots.customRender" />
            </template>
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
import {
  MathTool,
  MoneyThousandFormatter,
  ThousandFormatter,
} from 'ecstasy-tools';

interface Props {
  aroundBorder?: boolean;
  grayHeader?: boolean;
  size?: 'small' | 'default' | 'large';
  pagination?: boolean;
  columns: Array<MColumnItemType>;
  selectable?: (row: any) => boolean;
  load?: (params?: any) => any;
  loadData?: Array<any>;
  lazyLoad?: boolean;
  preload?: boolean;
  showSummary?: boolean;
  sumArry?: Array<string>;
}

const props = withDefaults(defineProps<Props>(), {
  aroundBorder: false,
  grayHeader: true,
  size: 'default',
  pagination: true,
  selectable: (row: any) => true,
  load: () => null,
  loadData: () => [],
  lazyLoad: false,
  preload: true,
  showSummary: false,
  sumArry: undefined,
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
interface SummaryMethodProps<T = any> {
  columns: TableColumnCtx<T>[];
  data: T[];
}
const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param;
  const sums: Array<string> = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      return (sums[index] = '合计：');
    }
    const values = data.map((item) => Number(item[column.property]));
    if (props.sumArry.includes(column.property)) {
      let sum_index_value = 0;
      values.map((value) => {
        sum_index_value = MathTool.add(sum_index_value, value);
      });
      sums[index] = `${sum_index_value}`;
    } else {
      sums[index] = '';
    }
  });
  return sums;
};
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

<style lang="scss" scoped>
.moko-table {
  &.border {
    border: 1px solid #eaebee;
  }
  &-content {
    font-size: 13px;
    width: 100%;

    &.gray-header {
      :deep(tr th) {
        background-color: #f5f7fa !important;
      }
    }

    :deep(.el-scrollbar__bar) {
      &.is-horizontal {
        height: 10px;
        border-radius: 0 !important;
        background-color: #e4e7ed;
        opacity: 0.5;
      }

      &.is-vertical {
        background-color: transparent;
      }

      .el-scrollbar__thumb {
        border-radius: 0 !important;
      }
    }
  }
}
</style>
