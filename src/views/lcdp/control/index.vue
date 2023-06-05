<template>
  <ContentWrap>
    <IFrame :src="src" />
  </ContentWrap>
</template>
<script setup lang="ts" name="LcdpControl">
import { getAccessToken } from '@/utils/auth'
const BASE_URL = import.meta.env.VITE_BASE_URL
let token = getAccessToken()
const src = ref(
  BASE_URL + `/lcdp/control/index.html?headerName=Authorization&headerValue=Bearer%20${token}`
)
</script>
