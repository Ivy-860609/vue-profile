<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>To Do List</template>

    簡單代辦清單的練習，除了基本的CRUD還能針對項目元素進行拖曳
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Shopping Cart
    </template>
      商品清單與購物車練習
  </WelcomeItem>
</template>
