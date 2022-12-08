<template>
  <PageWrapper title="赛事">
    <div class="flex">
      <div v-for="platform in 3" :key="platform" class="mr-1">
        <Divider class="bg-light-50 dark:bg-dark-50">xx平台</Divider>
        <LeaguetemVue v-for="item in 2" :key="item" />
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup name="Match">
  import { PageWrapper } from '/@/components/Page';
  import LeaguetemVue from './components/Leaguetem.vue';
  import { Divider } from 'ant-design-vue';
</script>
<style lang="less"></style>
