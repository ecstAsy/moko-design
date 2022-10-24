<!--
 * @Author: ecstAsy
 * @Date: 2022-10-11 15:11:17
 * @LastEditTime: 2022-10-24 13:16:54
 * @LastEditors: ecstAsy
-->

<template>
  <el-row class="moko-table">
    <el-col>
      <el-table
        ref="mokotable"
        fit
        v-loading="State.loading"
        :class="getTableClass()"
        :row-key="props.rowKey"
        :size="props.size"
        :max-height="props.maxHeight"
        :data="props.lazyLoad ? State.dataSource : props.loadData"
        :show-summary="props.showSummary"
        :summary-method="getSummaries"
        :row-class-name="props.rowClassName"
        :default-expand-all="props.defaultExpandAll"
        @selection-change="handleSelectionChange"
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
            :formatter="
              getFormatter(
                column.formatter || (props.formatter ? 'fields' : ''),
                column
              )
            "
          >
            <template v-if="column.render" #default="scope">
              <slot v-bind="scope" :name="column.render" />
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-col>
    <el-col v-if="props.pagination">
      <el-pagination
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
import { ref, reactive, computed, onMounted } from 'vue';
import type {
  TableColumnCtx,
  TableColumn,
} from 'element-plus/es/components/table/src/table-column/defaults';
import type { ElTable } from 'element-plus';
import './index.scss';
import { MColumnItemType, MokoTableStateTypes } from './type';
import {
  MathTool,
  MoneyThousandFormatter,
  ThousandFormatter,
} from 'ecstasy-tools';

const mokotable = ref<InstanceType<typeof ElTable>>();
interface Props {
  aroundBorder?: boolean;
  grayHeader?: boolean;
  size?: 'small' | 'default' | 'large';
  rowKey?: string;
  maxHeight?: any;
  pagination?: boolean;
  columns: Array<MColumnItemType>;
  selectable?: (row: any) => boolean;
  rowClassName?: (row: any) => string;
  load?: (params?: any) => any;
  loadData?: Array<any>;
  lazyLoad?: boolean;
  preload?: boolean;
  showSummary?: boolean;
  sumArry?: Array<string>;
  formatter?: boolean;
  defaultExpandAll?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  aroundBorder: false,
  grayHeader: true,
  size: 'default',
  rowKey: 'id',
  maxHeight: 1800,
  pagination: true,
  selectable: (row: any) => true,
  rowClassName: (row: any) => '',
  load: () => null,
  loadData: () => [],
  lazyLoad: false,
  preload: true,
  showSummary: false,
  sumArry: undefined,
  formatter: true,
  defaultExpandAll: false,
});

interface Emits {
  (e: 'selection', val: Array<any>): void;
}

const emit = defineEmits<Emits>();

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
// 选择
const handleSelectionChange = (val: Array<any>) => {
  emit('selection', val);
};

// 列表求和方法
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
  index: number,
  record: MColumnItemType
) => {
  let formatterStr = '--';
  if (!Object.keys(row).includes(column.property)) {
    formatterStr = '';
  }
  if (!cellValue) return formatterStr;
};
// 获取格式化类型
const getFormatter = computed(() => (type: string, record: MColumnItemType) => {
  const formatterMaps: {
    [proppname: string]: any;
  } = {
    money: MoneyFormatter,
    number: NumberFormatter,
    fields: FieldsFormatter,
    select: (
      row: TableColumn<MColumnItemType>,
      column: TableColumnCtx<any>,
      cellValue: any,
      index: number
    ) => SelectFormatter(row, column, cellValue, index, record),
  };
  return formatterMaps[type];
});
// 获取组件class
const getTableClass = computed(() => () => {
  let classStr = 'moko-table-content';
  if (props.grayHeader) {
    classStr += ' gray-header';
  }
  return classStr;
});

const refresh = (keepAlive: boolean = false) => {
  const { currentPage } = State.pagination;
  return getData(!keepAlive ? 1 : currentPage);
};

const toggleSelection = (rows?: Array<any>) => {
  mokotable.value!.clearSelection();
  if (rows) {
    rows.forEach((row) => {
      mokotable.value!.toggleRowSelection(row, true);
    });
  }
};
defineExpose({
  mokotable,
  refresh,
  toggleSelection,
});
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

  .el-pagination {
    margin: 16px auto;
    justify-content: center;
  }
}
</style>
