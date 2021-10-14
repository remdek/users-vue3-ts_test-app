<template>
  <div class="tooltip">{{text}}</div>
</template>

<script>
  export default {
    name: "ToolTip",
    props: {
      text: {
        type: String,
        required: true,
        default: 'ToolTip'
      }
    }
  }
</script>

<style scoped>
  .tooltip {
    position: absolute;
    display: none;
    left: 0;
    top: -100%;
    padding: 6px 8px;
    color: #ffffff;
    background-color: #00000073;
    font-size: 12px;
    white-space: nowrap;
    border-radius: 4px;
  }

</style>