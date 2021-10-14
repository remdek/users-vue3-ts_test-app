<template>
  <div class="pagination d-flex jstf-center" @click="getPage($event)">
    <button
      class="btn ml-10 mr-10"
      :disabled="p==currentPage"
      v-for="p in Math.ceil(store.state.usersCount/store.state.itemsQtyOnPage)">{{p}}
    </button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    inject: ['store'],
    data() {
      return {
        pageCount: 1
      }
    },
    computed: {
      currentPage() {
        return this.store.state.currentPage
      },
      itemsQtyOnPage() {
        return this.store.state.itemsQtyOnPage
      }
    },
    methods: {
      getPage(e) {
        if (e.target.tagName === 'BUTTON') {
          this.store.SET_OBJ('currentPage', parseInt(e.target.innerText))
          this.store.fetchUsers()
        }
      }
    }

  }
</script>

<style scoped>

</style>