<template>
  <PageWrapper
    title="示例：进程间通信"
    contentBackground
    contentClass="p-4"
    content="在这里将演示如何在主进程与渲染进程间进行通信"
  >
    <Divider>向主进程发送消息</Divider>
    <Alert
      class="mt-4"
      type="info"
      message="点击按钮后请查看编译器(Visual Code)控制台消息"
      show-icon
    />
    <div class="mt-4">
      <a-input v-model:value="sendMsg" />
      <a-button type="primary" size="small" @click="hanleSendMessageToMain">
        向主进程发送消息
      </a-button>
    </div>

    <Divider>向主进程发送消息并接收主进程的消息</Divider>
    <div class="mt-4">
      <a-button type="primary" size="small" @click="hanleSendMessageToMainNeedReply">
        向主进程发送消息并接收主进程的消息
      </a-button>
      <p> 主进程返回的消息: {{ dataFromMain }} </p>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Alert, Divider, Input } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  const { ipcRenderer } = require('electron');
  //import { ipcRenderer } from 'electron'; // 这样引用，打包后报错,请使用：require('electron')

  export default defineComponent({
    components: { PageWrapper, Alert, Divider, [Input.name]: Input },
    setup() {
      const dataFromMain = ref('');
      const sendMsg = ref('newWin');
      const hanleSendMessageToMain = () => {
        ipcRenderer.send('event_from_renderer', { param: sendMsg.value });
      };
      // 渲染进程发送消息到主进程
      const hanleSendMessageToMainNeedReply = () => {
        ipcRenderer.send('event_from_renderer_need_replay', { param: 'abc' });
      };
      // 监听来自主进程的响应消息
      const registerEvents = () => {
        ipcRenderer.on('event_from_main_replay', (_, data) => {
          console.log('In renderer:event_from_main_replay-->data:', data);
          dataFromMain.value += data;
        });
      };

      onMounted(() => {
        registerEvents();
      });

      return {
        hanleSendMessageToMain,
        hanleSendMessageToMainNeedReply,
        dataFromMain,
        sendMsg,
      };
    },
  });
</script>

<style lang="less" scoped></style>
