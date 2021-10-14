<template>
  <label for="user-name">Имя пользователя</label>
  <input type="text" id="user-name"
         v-model="user.name"
         @input="updateUser">
  <small class="red d-flex"
         v-if="user.name?.length < 1">Поле не должно быть пустым</small>

  <label for="user-email">Емаил</label>
  <input type="text" class="form-control" id="user-email"
         v-model="user.email"
         @input="updateUser">
  <small class="red d-flex"
         v-if="user.email?.length < 1">Поле не должно быть пустым</small>
  <label for="user-balance">Баланс</label>
  <input type="number" class="form-control" id="user-balance"
         v-model="user.balance"
         @input="updateUser">
  <small class="red d-flex"
         v-if="user.balance < 1">Поле не должно быть пустым</small>
  <label for="user-group">Группа</label>
  <select class="form-control" id="user-group"
          v-model="user.groupId"
          @change="updateUser">
    <option :value="group.id"
            v-for="group in store.state.groups">{{group.name}}
    </option>
  </select>
</template>

<script>
  export default {
    name: "UserEditComponent",
    inject: ['store'],
    computed: {
      user() {
        return JSON.parse(JSON.stringify(this.store.state.user))
      }
    },
    methods: {
      updateUser() {
        this.store.SET_OBJ('user', this.user)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "src/assets/vars";

</style>