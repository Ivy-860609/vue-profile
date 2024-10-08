<script setup>
    import { ref } from 'vue'
    const props = defineProps({
        products: {
            type:Array
        }
    })
    const emit = defineEmits(['sendCount'])
    function sendCount(id) {
        emit("sendCount", id, showCount.value[id - 1])
        //清除介面數量
        showCount.value[id - 1]=0
    }
    //用來裝每個產品在介面顯示的數量
    const showCount = ref([])
    showCount.length = props.products.length
    for (var i = 0; i < showCount.length; i++) {
        showCount.value[i] = 0
    }
    function minusCount(id) {
        if (showCount.value[id] < 1) {
            alert("數量不能為負！")
        } else {
            showCount.value[id] -= 1
        }
    }
    function addCount(id) {
        if (props.products[id].store <= showCount.value[id]) {
            alert("已超出庫存！")
        } else {
            showCount.value[id] += 1
        }
    }
    function checkCount(id) {
        if (showCount.value[id] < 1) {
            showCount.value[id]=0
            alert("數量不能為負！")
        } 
        if (props.products[id].store <= showCount.value[id]) {
            showCount.value[id] = props.products[id].store
            alert("已超出庫存！")
        } 
    }
</script>

<template>
    <div v-for="product in products" :key="product.id" class="singleProduct">
        <div class="imgDiv" :style="{backgroundImage:`url(${product.img})`}">
            <div class="priceDiv">
                <p>{{'$'+product.price}}</p>
            </div>
            <div class="priceBackGround"></div>
        </div>
        <div class="nameDiv">
            <text>{{product.name}}</text>
        </div>
        <div class="countDiv">
            <span>
                <button class="btnMath" @click="minusCount(product.id-1)">–</button>
                <input type="text" @change="checkCount(product.id-1)" v-model="showCount[product.id-1]"/>
                <button class="btnMath" @click="addCount(product.id-1)">+</button>
            </span>
            <button class="btnCart" @click="sendCount(product.id)">加入購物車</button>
        </div>
    </div>
</template>

<style lang="scss" src="@/assets/SCSS/productstyle.scss" scoped></style>

