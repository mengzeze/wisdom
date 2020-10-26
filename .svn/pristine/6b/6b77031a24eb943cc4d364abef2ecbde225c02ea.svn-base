<template>
  <div class="errorBox">
    <div>
      <img src="../../assets/errImage/error.png"/>
      <p>我们正在全力搜索中，请点击<label @click="load()">刷新试试</label></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "error",
    data () {
      return {}
    },
    methods: {
        load () {
          window.location.reload()
        }
    }
  }
</script>

<style scoped>
  .errorBox{
    width: 100%;
    height: 100%;
  }
  .errorBox>div{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  img{
    width: 100%;
    height: 100%;
  }
  p {
    position: absolute;
    top: 52%;
    font-size: 18px;
    color: rgba(102,102,102,1);
  }
  label {
    font-size: 20px;
    margin-left: 10px;
    color: rgba(63,155,251,1);
    cursor: pointer;
  }
</style>
