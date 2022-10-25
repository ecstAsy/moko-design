<template>
  <div class="component-wrap">
    <ul class="component-items">
      <li
        v-for="(item, index) in State.ComponentsArrayA"
        :key="index"
        @click="onClick(item)"
      >
        {{ item.name }}
      </li>
      <li class="mo-logo">
        <a href="/">
          <img src="/logo.svg" class="logo" alt="Moko logo" />
        </a>
      </li>
      <li
        v-for="(item, index) in State.ComponentsArrayB"
        :key="index"
        @click="onClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    <component-dialog v-bind="State.dialogProps" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import ComponentDialog from './components/ComponentDialog.vue';
import { ComponentItemType } from './type';

interface dialogPropType {
  visible: boolean;
  title: string;
  component?: string;
  cancel: () => void;
}
const State = reactive<{
  dialogProps: dialogPropType;
  ComponentsArrayA: Array<ComponentItemType>;
  ComponentsArrayB: Array<ComponentItemType>;
}>({
  dialogProps: {
    visible: false,
    component: undefined,
    title: '',
    cancel: () => {
      State.dialogProps = {
        ...State.dialogProps,
        visible: false,
        component: undefined,
        title: '',
      };
    },
  },
  ComponentsArrayA: [
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: 'Icon',
      component: 'mo-icon',
    },
    {
      name: 'Svg',
      component: 'mo-svg',
    },
    {
      name: '表格',
      component: 'mo-table',
    },
    {
      name: '弹窗',
      component: '',
    },
    {
      name: '上传文件',
      component: 'mo-button',
    },
    {
      name: '文件列表',
      component: 'mo-fileinfo',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
  ],
  ComponentsArrayB: [
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
    {
      name: '按钮',
      component: 'mo-button',
    },
  ],
});

const onClick = ({ component, name }: ComponentItemType) => {
  State.dialogProps = {
    ...State.dialogProps,
    visible: true,
    component,
    title: name,
  };
};
</script>

<style lang="scss" scoped>
.component-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .component-items {
    margin: 16px;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(5, 20%);

    li {
      width: 8rem;
      height: 8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 1px 1px 8px 1px #64c6eeaa;
      border-radius: 16px;
      cursor: pointer;
      color: #64c6eeaa;

      &:hover {
        box-shadow: 1px 1px 8px 1px #3592fbaa;
        transform: scale(1.05);
        color: #3592fbaa;
      }

      &.mo-logo {
        -webkit-perspective: 1000;
        .logo {
          width: 100%;
          height: 100%;
          animation: myfirst 10s linear 1ms 100;

          &:hover {
            filter: drop-shadow(0 0 2em #646cffaa);
          }
        }
      }
    }
  }
}

@keyframes myfirst {
  0% {
    transform: rotatey(0deg);
  }

  25% {
    transform: rotatey(90deg);
  }

  50% {
    transform: rotatey(180deg);
  }

  75% {
    transform: rotatey(270deg);
  }

  100% {
    transform: rotatey(360deg);
  }
}
</style>
