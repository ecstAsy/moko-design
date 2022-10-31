<!--
 * @Author: ecstAsy
 * @Date: 2022-10-31 15:35:56
 * @LastEditTime: 2022-10-31 16:37:07
 * @LastEditors: ecstAsy
-->

<template>
  <div class="moko-tooltip">
    <el-tooltip
      :effect="props.tooltipEffect"
      :placement="props.tooltipPlacement"
    >
      <template #content>
        <div class="auto-tooltip-content">
          <span class="title">{{ props.tooltipTitle }}</span>
          <span class="content">{{ props.tooltipContent }}</span>
        </div>
      </template>
      <mo-icon
        class="tooltip-icon"
        :icon="props.tooltipIcon"
        :style="{
          color: props.tooltipIconColor,
        }"
      />
    </el-tooltip>
    <span class="minxin-text">{{ props.minxinText }}</span>
  </div>
</template>

<script setup lang="ts" name="MoTooltip">
import MoIcon from '../../mo-icon';
interface Props {
  tooltipEffect?: string;
  tooltipPlacement?: string;
  tooltipTitle?: string;
  tooltipIcon?: string;
  tooltipIconColor?: string;
  tooltipContent: string;
  minxinText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tooltipEffect: 'light',
  tooltipPlacement: 'top',
  tooltipIcon: 'WarningFilled',
  tooltipIconColor: '#E2975C',
  tooltipTitle: '提示',
});
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.moko-tooltip {
  @include flex-row(flex-start);

  .minxin-text {
    margin-left: 6px;
  }
}
.auto-tooltip-content {
  @include flex-column(flex-start, flex-start);

  span {
    &.title {
      @include f-s-c(13px, $font-color-primary);
      @include f-w-m();
    }

    &.content {
      @include f-s-c(12px, $font-color-info);
      @include f-w-r();
    }
  }
}
</style>
