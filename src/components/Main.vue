<template>
  <ButtonToggle
    text="Пользователи"
    @click="store.SET_OBJ('view', 'users')"
    :isActive="store.state.view === 'users' ? true : false"/>
  <ButtonToggle
    text="Группы"
    @click="store.SET_OBJ('view', 'groups')"
    :isActive="store.state.view === 'groups' ? true : false"/>
  <div class="menu-content">

    <UsersComponent
      v-if="store.state.view === 'users'"/>
    <GroupsComponent
      v-if="store.state.view === 'groups'"/>
  </div>
</template>

<script lang="ts">
  import {defineAsyncComponent} from 'vue'
  import ButtonToggle from "./elements/ButtonToggle.vue";

  const UsersComponent =
    defineAsyncComponent(() => import("@/components/UsersComponent.vue"));
  const GroupsComponent =
    defineAsyncComponent(() => import("@/components/GroupsComponent.vue"));
  import Pagination from "@/components/elements/Pagination.vue";

  export default {
    name: "Main",
    inject: ['store'],
    components: {GroupsComponent, Pagination, UsersComponent, ButtonToggle},
    data() {
      return {
        userActive: true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "src/assets/vars";

  .menu-content {
    border: 1px solid $light-gray;
    padding: 10px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }

</style>