import { onUnmounted } from "vue"
import { ref } from "vue"
import { onMounted } from "vue"

const useContextMenu = (containerRef: any) => {
 const showMenu = ref(false)
 const x = ref(0)
 const y = ref(0)

 const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  console.log(windowWidth, windowHeight);
  setTimeout(() => {
   const dom: any = document.querySelector('.context-menu')
   const domW = dom && dom.offsetWidth
   const domH = dom && parseInt(dom.style.height)
   console.log(domW, domH, 20);

   x.value = windowWidth - e.clientX < domW ? e.clientX - domW : e.clientX
   y.value = windowHeight - e.clientY < domH ? e.clientY - domH : e.clientY
  })
  showMenu.value = true
 }

 const closeMenu = () => {
  showMenu.value = false
 }

 onMounted(() => {
  const div = containerRef.value as HTMLElement;
  div.addEventListener("contextmenu", handleContextMenu);
  window.addEventListener("contextmenu", closeMenu, true);
  window.addEventListener('click', closeMenu, true)
 })

 onUnmounted(() => {
  const div = containerRef.value as HTMLElement;
  div && div.removeEventListener('contextmenu', handleContextMenu)
  window.removeEventListener("contextmenu", closeMenu);
  window.removeEventListener('click', closeMenu)
 })

 return {
  x,
  y,
  showMenu
 }
}

export default useContextMenu
