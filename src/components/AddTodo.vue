<script setup>
    import { ref, onMounted } from 'vue'
    const content = ref('')
    const num = ref(0) //作為todolist中的id計數
    const emit = defineEmits(['addTodo'])
    const addTodo = function () {
        if (content.value != "") {
            num.value += 1
            const todo = {
                id: num.value,
                text: content.value,
                temptext: content.value,
                status: false,
                edit: false
            }
            emit('addTodo', todo)
            content.value = ""
        }
    }

</script>
<template>
    <h1 style="border-bottom: 1px dotted">To Do List</h1>
    <br>
    <div class="add_block">
        <input v-focus @keyup.enter="addTodo" v-model="content" type="text" placeholder="請輸入文字"/>
        <button @click="addTodo">加入</button>
    </div>
</template>