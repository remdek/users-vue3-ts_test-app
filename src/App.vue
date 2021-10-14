<template>
  <div class="container">
    <h1>User admin</h1>
    <Main/>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import store from "@/store";
  import Main from "@/components/Main.vue";


  export default defineComponent({
    name: 'App',
    provide: {
      store
    },
    components: {
      Main
    }
  });
</script>

<style lang="scss">
  @import "./assets/styles";
</style>
