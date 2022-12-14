/*
 * @Author: ecstAsy
 * @Date: 2022-10-11 15:32:56
 * @LastEditTime: 2022-10-21 16:07:18
 * @LastEditors: ecstAsy
 */
export interface OptionItemType {
  label: string;
  value: string | number;
}
export interface MColumnItemType {
  key?: string;
  title?: string;
  dataIndex?: string;
  align?: 'left' | 'center' | 'right';
  render?: string;
  fixed?: string;
  width?: number;
  children?: Array<MColumnItemType>;
  remark?: string;
  formatter?: any;
  options?: Array<OptionItemType>;
  dictionary?: string;
  origin?: string;
  sortable?: boolean;
  [proppName: string]: any;
}

export interface PaginationTypes {
  total: number;
  pageSize: number;
  currentPage: number;
}

export interface SumMapTypes {
  [proppName: string]: number;
}

export interface MokoTableStateTypes {
  loading: boolean;
  columns: Array<MColumnItemType>;
  dataSource: Array<any>;
  pagination: PaginationTypes;
  [proppName: string]: any;
}
