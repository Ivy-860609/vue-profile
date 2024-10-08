<script setup>
    import { computed } from 'vue'
    import { RouterLink, RouterView } from 'vue-router'
    import HelloWorld from './components/HelloWorld.vue'
    import { useMouse } from '@/assets/useJS/useMouse.js'

    import Logo from '@/assets/logo.png'
    import Cursor from '@/assets/cursor.png'


    const { x, y } = useMouse()
    const runStyle = computed(() => {
        return {
            'z-index':'10',
            'width': '28px',
            'position': 'absolute',
            'left': x.value + 2 + 'px',
            'top': y.value + 2 + 'px'
        }
    })
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" :src="Logo" width="150" height="150" />
        <img :style="runStyle" :src="Cursor">
        <div class="wrapper">
            <HelloWorld msg="歡迎參加我的原生JS畢業典禮" />

            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/todolist">ToDoList</RouterLink>
                <RouterLink to="/shoppingcart">ShoppingCart</RouterLink>
            </nav>
        </div>
    </header>

  <RouterView />
</template>

<style>
    * {
        cursor: none!important;
    }
    html, body {
        overflow: hidden
    }
</style>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
