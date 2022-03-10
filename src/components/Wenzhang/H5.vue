<template>
  <div class="index">
    <div v-html="h5Val"></div>
    <!-- <u-parse :html="h5Val"></u-parse> -->
  </div>
</template>

<script>
export default {
    data(){
        return{
            h5Val:'',
        }
    },
  mounted(){
      console.log(sessionStorage.getItem('h5Val'))
      this.h5Val = sessionStorage.getItem('h5Val')
  },
};
</script>