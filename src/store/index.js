import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [],
    snackBar: {
      show: false,
      text: ''
    },
    sorting: false
  },
  mutations: {
    setSearch(state, value) {
      state.search = value
    },
    addTask(state, newTask) {
  
      state.tasks.push(newTask)
    },
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.title = payload.title
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.dueDate = payload.dueDate
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    showSnackBar(state, text) {
      let timeout = 0
      if (state.snackBar.show) {
        state.snackBar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackBar.show = true
        state.snackBar.text = text
      }, timeout)
    },
    hideSnackBar(state) {
      state.snackBar.show = false
    },
    toggleSorting(state) {
      state.sorting = !state.sorting
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
      db.collection('tasks').add(newTask).then(()  => {
        commit('addTask', newTask)
        commit('showSnackBar', 'Task Added!')
      })
    },
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      db.collection('tasks').doc({ id: id}).update({
        done: !task.done
      }).then(() => {
        commit('doneTask', id)
      })
    },
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id}).delete().then(() => {
        commit('deleteTask', id)
        commit('showSnackBar', 'Task Deleted!')
      })
    },      
    updateTaskTitle({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackBar', 'Task Updated!')
      })
      
    },
    updateTaskDueDate({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateTaskDueDate', payload)
        commit('showSnackBar', 'Due Date Updated!')
      })
    },
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks)
      commit('setTasks', tasks)
    },
    getTasks({ commit }) {
      db.collection('tasks').get().then(tasks => {
        if (tasks.length === 0) {
          let taskOne = {
            id: 1,
            title: 'Wake Up!',
            done: false,
            dueDate: null
          }
          let taskTwo = {
            id: 2,
            title: 'Grab Tickets!!',
            done: false,
            dueDate: null
          }
          let taskThree = {
            id: 3,
            title: 'Get on the Train!!!',
            done: false,
            dueDate: null
          }
          db.collection('tasks').add(taskOne).then(()  => {
            commit('addTask', taskOne)
          })
          db.collection('tasks').add(taskTwo).then(()  => {
            commit('addTask', taskTwo)
          })
          db.collection('tasks').add(taskThree).then(()  => {
            commit('addTask', taskThree)
          })
        }
        else {
          commit('setTasks', tasks)
        }
      })
    }
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks
      }
      return state.tasks.filter(task => 
        task.title.toLowerCase().includes(state.search.toLowerCase())
      )
    }
  }
})
