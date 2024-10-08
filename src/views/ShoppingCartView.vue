<script setup>
    import Product from '@/components/Product.vue'
    import Cart from '@/components/Cart.vue'
    import { ref, computed } from 'vue'
    const products = ref([
        {
            id: 1,
            name: '純淨的牛奶',
            price: 60,
            count:0,
            img: './milk.jpg',
            store: 20
        },
        {
            id: 2,
            name: '下班的救贖',
            price: 250,
            count: 0,
            img: './beer.jpg',
            store: 12
        },
        {
            id: 3,
            name: '上班的快樂',
            price: 75,
            count: 0,
            img: './boba.jpg',
            store: 10
        },
        {
            id: 4,
            name: '心痛的滋味',
            price: 40,
            count: 0,
            img: './water.jpg',
            store: 50
        },
    ])
    //用於改變圖案顯示
    const imgAdd=ref('')

    //處理新增要購買的商品數量
    const handleSendCount = (id, count) => {
        products.value = products.value.map(product => product.id === id ? { ...product, count: count, store: product.store - count } : product)
        //有商品加入購物車，需要改變圖示
        imgAdd.value = "Add"
        lightCart()
    }
    //處理購物車裡面新增商品
    const handleaAddCount = (id) => {
        products.value = products.value.map(product => product.id === id ? { ...product, count: product.count + 1, store: product.store -1 } : product)
    }
    //處理購物車裡面減少商品
    const handleaMinusCount = (id) => {
        products.value = products.value.map(product => product.id === id ? { ...product, count: product.count - 1, store: product.store + 1 } : product)
    }

    //用來存放加進購物車的內容
    const buys = computed(() => {
        //檢查當前有沒有商品在購物車
        if (products.value.filter(product => product.count > 0).length == 0) {
            imgAdd.value = ""
        }
        return products.value.filter(product => product.count > 0)
    })

    const imgSrc = ref('./cartIcon.svg')
    function darkCart() {
        imgSrc.value = './cartIcon2' + imgAdd.value +'.svg'
    }
    function lightCart() {
        imgSrc.value = './cartIcon' + imgAdd.value + '.svg'
        chatShow.value = false
    }
    //用來控管，切換是否顯示購物車內容
    const cartShow = ref(false)
    //用來控管是否顯示提示文字
    const chatShow=ref(false)
    //點擊購物車觸發開啟購物車
    function checkCart() {
        if (imgAdd.value != "") {
            cartShow.value = true
        } else {
            chatShow.value = true
            cartShow.value = false
        }
    }
</script>

<template>
    <div class="product">
        <div v-show="chatShow" class="remindChat"><text>還沒有商品喔！</text></div>
        <img class="iconStyle" v-if="!cartShow" @click="checkCart" @mouseover="darkCart" @mouseout="lightCart" :src="imgSrc">
        <img class="iconStyle" v-else @click="cartShow=!cartShow" src="/back.svg">
        <Product v-if="!cartShow" :products="products" @send-count="handleSendCount" />
        <Cart v-else :buys="buys" @add-count="handleaAddCount" @minus-count="handleaMinusCount" />
    </div>
</template>

<style lang="scss" scoped>
    .iconStyle {
        z-index: 5;
        position: fixed;
        right: 3%;
        bottom: 4%;
    }
    .remindChat {
        z-index: 8;
        position: fixed;
        right: 2%;
        bottom: 9%;
        width: 120px;
        height: 120px;
        background-image: url(./chattingPic.svg);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        padding-bottom: 15px;
    }
    .product {
        min-height: 100vh;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between
    }       
</style>