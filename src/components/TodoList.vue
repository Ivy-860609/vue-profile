<script setup>
    import { ref, computed, watch } from 'vue'
    const action = ref("all")
    const navitem = ref([
        { name: "全部", value: "all" },
        { name: "進行中", value: "now" },
        { name: "已完成", value: "pass" }
    ])
    const props = defineProps({
        todos: {
            type: Array
        }
     })
    const emit = defineEmits(['deleteTodo','changeTodo', 'editTodo', 'cancleTodo', 'saveTodo'])
    const filtertodo = computed(function () {
        switch (action.value) {
            case "all": {
                return props.todos.filter(todo => true)
            }
            case "now": {
                return props.todos.filter(todo => !todo.status)
            }
            case "pass": {
                return props.todos.filter(todo => todo.status)
            }
            default: {
                return props.todos
            }
        }
    })
    const deleteTodo = (id) => {
        emit('deleteTodo',id)
    }
    const changeTodo = (id) => {
        emit('changeTodo', id)
    }
    const editTodo = (id) => {
        emit('editTodo', id)
    }
    const cancleTodo = (id) => {
        emit('cancleTodo', id)
    }
    const saveTodo = (id) => {
        emit('cancleTodo', id)
    }

    const mouseOnTodo = ref()
    const mouseDownTodo = ref()

    function handleDargStart(e, id) {
        //取得拖曳元素
        mouseOnTodo.value = id-1
    }
    function handleDargOver(e, id) {
        //取得目標元素
        //if (mouseOnTodo.value == (id-1)) {
        //    return
        //}
        mouseDownTodo.value = id - 1
    }
    function handleDragEnd(e) {
        const newTodo = props.todos[mouseOnTodo.value]
        props.todos[mouseOnTodo.value] = props.todos[mouseDownTodo.value]
        props.todos[mouseDownTodo.value] = newTodo
    }

</script>
<template>
    <div class="nav_block">
        <button v-for="item in navitem" :class="{'active' : action == item.value}" @click="action=item.value">{{item.name}}</button>
    </div>
    <ul v-if="filtertodo.length > 0"> 
        <li v-for="todo in filtertodo" :key="todo.id" @dblclick="editTodo(todo)" draggable="true" @dragstart="handleDargStart($event,todo.id)" @dragover.prevent="handleDargOver($event,todo.id)" @dragend="handleDragEnd($event)">
            <!--draggable="true" @dragstart="handleDargStart($event,todo)" @dragover.prevent="handleDargOver($event,todo)" @dragenter="handleDragEnter($event,todo)" @dragend="handleDragEnd($event,todo)"-->
            <button @click.stop="changeTodo(todo.id)" v-if="todo.status" class="btn_finish">&#10004;</button> <!--完成button-->
            <button @click.stop="changeTodo(todo.id)" v-else v-if="!todo.edit" class="btn_check">&#9744;</button> <!--未完成button-->
            <input type="text" v-if="todo.edit" v-model="todo.temptext" />
            <label :class="{ 'line-through': todo.status }" v-else>{{todo.text}}</label>
            <span v-if="todo.edit">
                <!--編輯狀態下的button-->
                <button @click.stop="saveTodo(todo.id)" class="btn_save">&#10004;</button> <!--存檔button-->
                <button @click.stop="cancleTodo(todo.id)" class="btn_cancle">&#10008;</button> <!--取消button-->
            </span>
            <button @click.stop="deleteTodo(todo.id)" v-else class="btn_delete">&#10008;</button> <!--刪除button-->
        </li>
    </ul>
    <ul class="todo_item" v-else>
        <li>沒有資料</li>
    </ul>
</template>