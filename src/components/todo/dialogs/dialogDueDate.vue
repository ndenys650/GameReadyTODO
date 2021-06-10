<template>
<v-dialog
    ref="dialog"
    :value="true"
    :return-value.sync="date"
    persistent
    width="290px"
    >
    <v-date-picker
        v-model="date"
        scrollable
    >
        <v-spacer></v-spacer>
        <v-btn
        @click="$emit('close')"
        text
        color="primary"
        
        >
        Cancel
        </v-btn>
        <v-btn
        @click="saveTaskDate"
        text
        color="primary"
        >
        OK
        </v-btn>
    </v-date-picker>
    </v-dialog>
  
</template>

<script>
export default {
    props: ['task'],
    data() {
        return {
            date: null
        }
    },
    methods: {
        saveTaskDate() {
            let payload = {
                id: this.task.id,
                dueDate: this.date
            }
            this.$store.dispatch('updateTaskDueDate', payload)
            this.$emit('close')
        }
    },
    mounted() {
        if (this.task.dueDate) {
            this.date = this.task.dueDate
        }
    }
}
</script>

<style>

</style>