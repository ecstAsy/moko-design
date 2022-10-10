<!--
 * @Author: ecstAsy
 * @Date: 2022-10-02 14:02:11
 * @LastEditTime: 2022-10-10 11:44:49
 * @LastEditors: ecstAsy
-->

<template>
  <button :class="[classString]" :disabled="disabled || loading">
      <span class="we-button-inner">
          <slot></slot>
      </span>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import classNames from '../../../utils/className'
import './index.scss'

const Props = {
  type: {
      type: String as PropType<string>, // 转为ts类型string
      default: 'default'
  },
  size: {
      type: String as PropType<string>,
      default: 'md'
  },
  disabled: {
      type: Boolean as PropType<boolean>,
      default: false
  },
  loading: {
      type: Boolean as PropType<boolean>,
      default: false
  }
}

export default defineComponent({
  name: 'MoButton',
  props: Props,
  setup(props) {
      const classString = classNames([
          'we-button',
          `we-button-type-${props.type}`,
          props.disabled ? 'we-button-disabled' : ''
      ])
      return {
          classString
      }
  }
})
</script>

