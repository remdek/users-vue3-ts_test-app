<template>
  <span class="mr-10 cursor-pointer" @click="changeSort">{{name}}</span>
  <span v-if="sort[name] === 'asc'">👆</span>
  <span v-if="sort[name] === 'desc'">👇</span>
</template>

<script>
  export default {
    name: "SortColumnAction",
    inject: ['store'],
    props: {
      name: {
        type: String,
        required: true
      }
    },
    computed: {
      sort() {
        return this.store.state.sort
      }
    },
    methods: {
      changeSort() {
        console.log(this.sort)
      let val
        switch (this.sort[this.name]) {
          case null:
            val = 'asc'
            break;
          case 'asc':
            val = 'desc'
            break;
          case 'desc':
            val = null
            break;
        }
        this.store.changeSort(this.name, val)
      }
    }
  }
</script>

<style scoped>

</style>