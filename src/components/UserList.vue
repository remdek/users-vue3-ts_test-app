<template>
  <table class="table" @click="getUserId">
    <thead>
    <tr>
      <th>id</th>
      <th class="d-flex">
        <SortColumnAction name="name"/>
      </th>
      <th>email</th>
      <th>
        <SortColumnAction name="balance"/>
      </th>
      <th>
        <SortColumnAction name="group"/>
      </th>
      <th>
        <SortColumnAction name="createdAt"/>
      </th>
      <th>edit</th>
      <th>delete</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in store.state.users">
      <td>{{user.id}}</td>
      <td>{{user.name}}</td>
      <td>{{user.email}}</td>
      <td>{{user.balance}}</td>
      <td>{{getGroupName(user.groupId)}}</td>
      <!--      <td>{{user.groupId}}</td>-->
      <td>{{$filters.formatDate(user.createdAt)}}</td>
<!--      <td>{{user.createdAt}}</td>-->
      <td class="text-center">
        <a href="#" :data-user-edit="user.id">Edit</a>
      </td>
      <td>
        <div class="user-delete text-center red" :data-id="user.id">&times;</div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import SortColumnAction from "./elements/SortColumnAction";
  export default {
    name: "UserList",
    components: {SortColumnAction},
    inject: ['store'],
    beforeMount() {
      this.store.fetchUsers()
      this.store.fetchUserGroups()
    },
    methods: {
      getUserId(e) {
        if (e.target.dataset.id) {
          this.store.deleteUser(parseInt(e.target.dataset.id))
        }
        if (e.target.dataset.userEdit) {
          const userId = parseInt(e.target.dataset.userEdit)
          this.store.findUser(userId)
          this.store.SET_OBJ('userAction', 'update')
          this.store.SET_OBJ('modalWindow', true)
        }
      },
      getGroupName(id) {
        if (this.store.state.groups.length) {
          const group = this.store.state.groups.find(g => g.id === id)
          return group.name
        }
        return ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .user-delete {
    cursor: pointer;
  }

</style>