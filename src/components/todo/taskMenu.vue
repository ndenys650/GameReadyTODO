<template>
    <div>
        <v-menu
            bottom
            left
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                icon
                v-bind="attrs"
                v-on="on"
                >
                <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="handleClick(index)"
                >
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <dialog-delete 
            v-if="dialogs.delete"
            @close="dialogs.delete = false"
            :task="task" 
        />
        <dialog-due-date 
            v-if="dialogs.dueDate"
            @close="dialogs.dueDate = false"
            :task="task" 
        />
         <dialog-edit 
            v-if="dialogs.edit"
            @close="dialogs.edit = false"
            :task="task" 
        />
    </div>
</template>

<script>
export default {
    props: ['task'],
    data: () => ({
        items: [
        { 
            title: 'Edit', 
            icon: 'mdi-pencil',
            click() {
                this.dialogs.edit = true
            }
        },
        { 
            title: 'Due Date', 
            icon: 'mdi-calendar',
             click() {
                this.dialogs.dueDate = true
            }
        },
        { 
            title: 'Delete', 
            icon: 'mdi-delete',
             click() {
                this.dialogs.delete = true
            }
        },
        { 
            title: 'Sort', 
            icon: 'mdi-drag-horizontal-variant',
             click() {
                 if (!this.$store.state.search) {
                     this.$store.commit('toggleSorting')
                 }
                 else {
                     this.$store.commit('showSnackBar' , 'not at the same time please!')
                 }
            }
        }
        ],
        dialogs: {
            delete: false,
            dueDate: false,
            edit: false,
            sort: false
        }
    }),
    methods: {
        handleClick(index) {
            this.items[index].click.call(this)
        }
    },
    components: {
        'dialog-delete' : require('@/components/todo/dialogs/dialogDelete.vue').default,
        'dialog-edit' : require('@/components/todo/dialogs/dialogEdit.vue').default,
        'dialog-due-date' : require('@/components/todo/dialogs/dialogDueDate.vue').default
   }
}
</script>

<style>

</style>