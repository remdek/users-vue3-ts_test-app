<template>
  <h2 class="mb-20">Группы</h2>
  <table class="table"
         @mouseover="showTooltip"
         @click="hideTooltip"
         @mouseout="hideTooltip"
         @keydown.enter.prevent="saveDate"
  >
    <thead>
    <tr>
      <th>Группа</th>
      <th>Комментарий</th>
      <th>Время создания</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="g in store.state.groups">
      <td>{{g.name}}</td>
      <td>{{g.comment}}</td>
      <td contenteditable="true"
          class="editable"
          :data-group-id="g.id">
        {{g.createdAt}}
      </td>
    </tr>
    </tbody>
  </table>
  <ToolTip text="Редактировать дату" ref="tooltip"/>
</template>

<script>
  import ToolTip from "./elements/ToolTip";

  export default {
    name: "GroupsComponent",
    components: {ToolTip},
    inject: ['store'],
    methods: {
      showTooltip(e) {
        if (e.target.dataset.groupId) {
          const tooltip = this.$refs.tooltip.$el
          tooltip.style.position = 'fixed'
          tooltip.style.display = 'block'
          tooltip.style.top = e.clientY - 40 + 'px'
          tooltip.style.left = e.clientX + 20 + 'px'

        }
      },
      hideTooltip(e) {
        if (e.target.dataset.groupId) {
          const tooltip = this.$refs.tooltip.$el
          tooltip.style.display = 'none'
        }
      },
      saveDate(e) {
        e.preventDefault()
        e.target.blur()
        const newDate = e.target.textContent
        const groupId = parseInt(e.target.dataset.groupId)
        this.store.updateGroup(groupId, {createdAt: newDate})

      }
    }
  }
</script>

<style scoped>

</style>