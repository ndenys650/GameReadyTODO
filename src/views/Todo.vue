<template>
  <div class="home">
    <list-tasks
      v-if="$store.state.tasks.length"
    />
    <no-tasks v-else/>

    <button-done-sorting 
      v-if="$store.state.sorting"
    />
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    
    'list-tasks': require('@/components/todo/listTasks.vue').default,
    'no-tasks': require('@/components/todo/noTasks.vue').default,
    'button-done-sorting': require('@/components/todo/buttonDoneSorting.vue').default
    
  }
}
</script>
