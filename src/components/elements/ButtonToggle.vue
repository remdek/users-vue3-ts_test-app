<template>
  <button class="btn-toggle" :class="{'active': isActive}">
    {{text}}
  </button>
</template>

<script lang="ts">
  export default {
    name: "ButtonToggle",
    props: {
      text: {
        type: String,
        required: true,
        default: 'Button'
      },
      isActive: {
        type: Boolean,
        required: true,
        default: false
      }
    },

  }
</script>

<style scoped lang="scss">
  @import "./src/assets/vars";

.btn-toggle {
  position: relative;
  top: 1px;
  padding: 5px 10px;
  font-size: 12px;
  color: black;
  background: white;
  border-left: 1px solid $light-gray;
  border-right: 1px solid $light-gray;
  border-top: 1px solid $light-gray;
  border-bottom: unset;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  transition: all .3s;
  &:hover {
    background: $blue;
    cursor: pointer;
    color: white;
  }
  &.active {
    background: $blue;
    color: white;
  }

}
</style>