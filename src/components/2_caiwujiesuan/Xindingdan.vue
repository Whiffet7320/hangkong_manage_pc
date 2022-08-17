<template>
  <div class="index">
    <div class="top">
        <div class="t-tit1" v-html="headerTit"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["headerTit"]),
  },
};
</script>

<style lang="scss" scoped>
.index{}
.t-tit1{
    color: #999;
      .active {
        color: #515a61;
        font-weight: 700;
      }
}
</style>
