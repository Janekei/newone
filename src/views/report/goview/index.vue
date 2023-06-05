<template>
  <ContentWrap>
    <IFrame :src="src" />
  </ContentWrap>
</template>
<script setup lang="ts" name="GoView">
const src = 'http://bidding-bi.s.itcat.fun'
</script>
