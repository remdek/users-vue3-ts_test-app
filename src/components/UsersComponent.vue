<template>
  <div class="d-flex mb-20"><h2>Пользователи</h2>
    <button class="btn ml-20"
            @click="
            store.SET_OBJ('modalWindow', true),
            store.SET_OBJ('userAction', 'create')
">
      Добавить
    </button>
  </div>
  <!--  User list-->
  <UserList/>

  <!--  Pagination-->
  <Pagination/>
  <!--  Modal window-->
  <div class="p-rel" v-if="store.state.modalWindow">
    <Modal header="Редактировать пользователя">
      <template v-slot:modal-body>
        <UserEditComponent/>
      </template>
      <template v-slot:modal-action>
        <button class="btn red mr-20"
                @click="
                store.SET_OBJ('modalWindow', false),
                store.SET_OBJ('user', {})
">
          Закрыть
        </button>
        <button class="btn green"
                :disabled="toggleButton"
                @click="store.updateOrCreateUser">
          {{store.state.userAction === 'update' ? 'Обновить' : 'Создать'}}
        </button>
      </template>
    </Modal>
  </div>

</template>

<script>
  import Modal from "@/components/Modal.vue";
  import UserEditComponent from "@/components/UserEditComponent.vue";
  import Pagination from "@/components/elements/Pagination";
  import UserList from "@/components/UserList";

  export default {
    name: "UsersComponent",
    inject: ['store'],
    components: {UserList, Pagination, UserEditComponent, Modal},
    computed: {
      toggleButton() {
        const user = this.store.state.user
        for (const [key, value] of Object.entries(user)) {
          if (key !== 'id' && key !== 'createdAt'){
            if (!value) return true
          }
        }
        return false
      }
    }

  }
</script>

<style scoped>
  .p-rel {
    position: relative;
  }
</style>