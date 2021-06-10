<template>
  <v-list
      flat
      class="pt-0"
      light
    > 
        <draggable
            v-model="tasks"
            handle=".handle"
        >
            <task 
                v-for="task in tasks"
                :key="task.id"
                :task="task"
            />
        </draggable>
    </v-list>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    computed: {
        tasks: {
            get() {
                return this.$store.getters.tasksFiltered
            },
            set(value) {
                this.$store.dispatch('setTasks', value)
            }
        }
    },
    components: {
        'task': require('@/components/todo/task.vue').default,
        draggable
    }
}
</script>
