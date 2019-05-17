<template>
  <transition name="demo">
    <div class="toast" v-show="theToast">
      {{msg}}
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        theToast: false,
        msg: ''
      };
    }
  };
</script>

<style>
  .toast {
    position: fixed;
    top: 40%;
    left: 50%;
    margin-left: -15vw;
    padding: 2vw;
    width: 30vw;
    font-size: 2vw;
    color: #fff;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 5vw;
    z-index: 9999;
  }
</style>
