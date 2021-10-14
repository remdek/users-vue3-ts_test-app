<template>
  <div class="modal">
    <div class="modal-header">{{header}}
      <div class="modal-close red"
           @click="store.SET_OBJ('modalWindow', false)">
        &times;
      </div>
    </div>
    <div class="modal-body">
      <slot name="modal-body"></slot>
    </div>
    <div class="modal-action d-flex jstf-end">
      <slot name="modal-action"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "Modal",
    inject: ['store'],
    props: {
      header: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "src/assets/vars";

  .modal {
    position: absolute;
    border-radius: 5px;
    border: 1px solid $light-gray;
    background: white;
    top: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    box-shadow: 0 7px 22px -5px rgb(0 0 0 / 20%);

    &-header {
      position: relative;
      padding: 10px;
      background: $light-gray;
      font-weight: bolder;
    }

    &-close {
      position: absolute;
      top: 7px;
      right: 10px;
      font-size: 20px;
      cursor: pointer;
    }

    &-body {
      padding: 20px;
    }

    &-action {
      border-top: 1px solid $light-gray;
      padding: 10px 20px;
    }

  }

</style>