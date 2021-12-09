<template>
  <div class="" :style="{color:color}">
    {{countTime}}
  </div>
</template>
<script>
export default {
  name: "countDown",
  props:{
    startTime:{
      type:Number,
      default:null
    },
    endTime:{
      type:Number,
      default:null
    },
    color:{
      type:String,
      default:'white'
    }
  },
  data() {
    return {
      countTime:'00:00:00',
    }
  },
  created(){
    this.showTime();
  },
  methods:{
    showTime(){
    let startTime = this.startTime ;
    let endTime = this.endTime;
    let timestamp;
    let leadTime;
    let timer;
    let that=this;   
    let status;
    timer = setInterval(function () {
      timestamp = parseInt(new Date().getTime() / 1000);
      leadTime = startTime - timestamp;
      if(leadTime > 0){
        status = 'begin';
      } else if (endTime - timestamp > 0){
        leadTime = endTime - timestamp;
        status = 'left';
      } else{
        clearInterval(timer);
        that.countTime = '00:00:00 left';
        return;
      }
      that.countTime = that.$tools.formatSecond(leadTime )+" "+status;
    },1000)
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
