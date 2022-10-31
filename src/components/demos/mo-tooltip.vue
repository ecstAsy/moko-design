<!--
 * @Author: ecstAsy
 * @Date: 2022-10-31 15:48:28
 * @LastEditTime: 2022-10-31 16:36:11
 * @LastEditors: ecstAsy
-->

<template>
  <span class="tooltip-wrap">
    <mo-tooltip tooltip-content="tooltip的内容" minxin-text="akakka" />
    <mo-tooltip
      tooltip-content="tooltip的内容"
      tooltip-icon="InfoFilled"
      minxin-text="akakka"
    />
    <mo-tooltip
      tooltip-content="tooltip的内容"
      tooltip-icon="WarnTriangleFilled"
      minxin-text="akakka"
    />
  </span>
</template>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.tooltip-wrap {
  @include flex-row();
}
</style>
