// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// 按照慣例，組合式函數名以“use”開頭
export function useMouse() {
    // 被組合式函數封裝和管理的狀態
    const x = ref(0)
    const y = ref(0)

    // 組合式函數可以隨時更改其狀態。
    function update(event) {
        x.value = event.pageX
        y.value = event.pageY
    }

    // 一個組合式函數也可以掛靠在所屬組件的生命週期上
    // 來啟動和卸載副作用
    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update))

    // 通過返回值暴露所管理的狀態
    return { x, y }
}