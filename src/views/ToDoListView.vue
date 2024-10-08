<script setup>
    import AddTodo from '@/components/AddTodo.vue' 
    import TodoList from '@/components/TodoList.vue' 
    import { ref } from 'vue'
    const todos = ref([])
    const handleAddTodo = (todo) => {
        todos.value.push(todo)
    }
    const handleDeleteTodo = (id) => {
        todos.value = todos.value.filter(todo => todo.id !== id)
    }
    const handleChangeTodo = (id) => {
        todos.value = todos.value.map(todo => todo.id === id ? { ...todo, status: !todo.status } : todo)
    }
    const handleEditTodo = (todo) => {
        if (!todo.edit && !todo.status) //尚未編輯且尚未完成才會觸發
            todos.value = todos.value.map(onetodo => onetodo.id === todo.id ? { ...onetodo, edit: !onetodo.edit } : onetodo)
    }
    const handleCancleTodo = (id) => {
        todos.value = todos.value.map(todo => todo.id === id ? { ...todo, temptext: todo.text, edit: !todo.edit } : todo)
    }
    const handleSaveTodo = (id) => {
        todos.value = todos.value.map(todo => todo.id === id ? { ...todo, text: todo.temptext, edit: !todo.edit } : todo)
    }

</script>

<template>
    <div class="todolist">
        <div class="todo_wrapper">
            <AddTodo @add-todo="handleAddTodo" />
            <TodoList :todos="todos" @delete-todo="handleDeleteTodo" @change-todo="handleChangeTodo" @edit-todo="handleEditTodo" @cancle-todo="handleCancleTodo" @save-todo="handleSaveTodo" />
        </div>
    </div>
</template>

<style lang="scss" src="@/assets/SCSS/todoliststyle.scss">
</style>