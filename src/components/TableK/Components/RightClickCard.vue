<template>
 <div ref="containRef">
  <slot></slot>
  <Teleport to="body">
   <Transition @beforeEnter="handleBeforEnter" @enter="handleEnter" @afterEnter="handleAfterEnter">
    <div class="context-menu" v-if="showMenu" :style="{
     left: x + 'px',
     top: y + 'px'
    }">
     <div class="menu-list">
      <div class="menu-item" @click="handleClcik(item)" v-for="item in menu" :key="item.label">
       {{ item.label }}
      </div>
     </div>
    </div>
   </Transition>
  </Teleport>

 </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useContextMenu from '@/hooks/web/useContextMenu'

defineProps({
 menu: {
  type: Array<any>,
  default: () => [
   {
    label: '添加添加添加添加添加添加添加',
   },
   {
    label: '删除',
   },
   {
    label: '编辑',
   },
   {
    label: '编辑',
   },
   {
    label: '编辑',
   },
   {
    label: '编辑',
   },
   {
    label: '编辑',
   },
   {
    label: '编辑',
   },
   {
    label: '复制',
   }
  ]
 }
})

const emits = defineEmits(['select'])

const containRef = ref(null)

const { x, y, showMenu } = useContextMenu(containRef)

const handleClcik = (item: any) => {
 emits('select', item)
 showMenu.value = false
}

const handleBeforEnter = (el: any) => {
 el.style.height = 0;
}

const handleEnter = (el: any) => {
 el.style.height = 'auto';
 const h = el.clientHeight;
 el.style.height = 0;
 requestAnimationFrame(() => {
  el.style.height = h + 'px';
  el.style.transition = '0.3s';
 })
}

const handleAfterEnter = (el: any) => {
 el.style.transition = 'none';
}

</script>

<style>
.context-menu {
 position: fixed;
 background: #fff;
 box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
 min-width: 100px;
 overflow: hidden;
 border-radius: 5px;
 z-index: 9999;
}

.menu-item {
 padding: 5px;
 color: #1d1d1f;
}

.menu-item:hover {
 background: #3477d9;
 color: #fff;
}

.v-enter-from {
 opacity: 0;
}

.v-enter-to {
 transition: 0.3s;
 opacity: 1;
}
</style>

