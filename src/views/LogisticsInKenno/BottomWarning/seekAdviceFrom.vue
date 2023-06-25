<template>
 <div class="seek">
  <div class="title">
   <span>晶科咨询</span>
   <img src="../../../assets/imgs/jinko-logo.png" alt="" />
  </div>
  <div class="body">
   1
  </div>
 </div>
</template>
 
<script lang="ts" setup>

</script>

<style scoped lang="scss">
.seek {
 background-color: #fff;
 border: 1px solid #60ffcf;
 border-radius: 0.5rem;
 height: 100%;
 display: flex;
 flex-direction: column;

 .title,
 .body {
  padding: 1rem;

 }

 .title {
  border-bottom: 1px solid #d1d1d1;
  display: flex;
  align-items: center;
  font-size: 24px;
  padding: .5rem 1rem 0 1rem;
  color: #1da63b;
  font-weight: 700;

  img {
   transform: scale(0.8);
   transform-origin: 0 0;
   margin-left: 1rem;
  }
 }

 .body {
  flex: 1;
  overflow: hidden;
 }
}
</style>
