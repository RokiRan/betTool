<template>
  <div class="">
    <CollapseContainer title="英超联赛" class="min-w-200px">
      <MatchItemVue v-for="item in 10" :key="item" />
    </CollapseContainer>
  </div>
</template>
<script lang="ts" setup>
  import MatchItemVue from './MatchItem.vue';
  import { CollapseContainer } from '/@/components/Container';
</script>
<style lang="less"></style>
