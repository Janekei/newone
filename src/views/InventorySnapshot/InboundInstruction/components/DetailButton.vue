<template>
    <button class="btn">{{ props.title }}</button>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})
</script>
<style lang="scss" scoped>
.btn {
    padding: .625rem 1.25rem;
    background-color: #CEEEFC;
    box-shadow: 5px 5px 5px #ccc;
    border-radius: .625rem;
    margin-right: 1.25rem;
}
</style>
