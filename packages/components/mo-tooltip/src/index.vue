<!--
 * @Author: ecstAsy
 * @Date: 2022-10-31 15:35:56
 * @LastEditTime: 2022-10-31 15:35:59
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
      <moko-icon
        class="tooltip-icon"
        :icon="props.tooltipIcon"
        :style="{
          color: props.tooltipIconColor,
        }"
      />
    </el-tooltip>
    <span>{{ props.minxinText }}</span>
  </div>
</template>

<script setup lang="ts">
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
.tc-mixin-tooltip {
  @include flex-row(flex-start);
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
