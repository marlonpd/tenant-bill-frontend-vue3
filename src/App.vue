<template>
  <Header />
  <Suspense>
    <template #default>
      <RouterView />
    </template>
    <template #fallback>
      <span>Loading...</span>
    </template>
  </Suspense>
  <Toast position="bottom-right" />
  <ConfirmDialog></ConfirmDialog>
  <Footer />
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';

  @Options({
    components: {
      Header,
      Footer,
    },
  })
  export default class App extends Vue {
    get computedMsg() {
      return true;
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
