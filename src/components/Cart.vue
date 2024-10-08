<script setup>
    const props = defineProps({
        buys: {
            type: Array
        }
    })
    const emit = defineEmits(['addCount', 'minusCount'])
    function addCount(id) {
        if (props.buys.find(buy => buy.id === id).store == 0) {
            alert("已超出庫存！")
        } else {
            emit('addCount', id)
        }
    }
    function minusCount(id) {
        emit('minusCount', id)
    }
</script>

<template>
    <div class="cart">
        <div v-for="buy in buys" v-if="buys.length > 0" :key="buy.id" class="buyList">
            <img :src="`${buy.img}`" />
            <div class="buyCount">
                <text>{{buy.name + ' / $' + buy.price}}</text>
                <span>
                    <button class="btnMath" @click="minusCount(buy.id)">–</button>
                    <input type="text" v-model="buy.count" readonly/>
                    <button class="btnMath" @click="addCount(buy.id)">+</button>
                </span>
            </div>
            <div class="buyTotal">
                <text>{{'$'+ buy.price * buy.count}}</text>
            </div>
        </div>
        <div v-else>
             <h1>還沒有商品，快去選購吧！</h1>
        </div>
    </div>
</template>
<style lang="scss" src="@/assets/SCSS/cartstyle.scss" scoped></style>