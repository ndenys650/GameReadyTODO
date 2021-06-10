<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      :mobile-breakpoint="768"
    >
      <v-img
      src="presid.jpg"
      height="170"
      gradient="to bottom left, rgba(236, 103, 54, 0.8), rgba(77, 77, 77, 0.66)"
      class="pa-4 pt-7"
      >
        <v-avatar
          size="70"
          class="mb-2"
        >
          <img
            src="sflogo.jpg"
            alt="SF Giants Logo"
          >
        </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">Nate Denys</div>
        <div class="white--text text-subtitle-2">2021</div>
      </v-img>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    
    
    <v-app-bar
      app
      color="primary"
      dark
      prominent
      src="attpark.jpg"
      :height="$route.path === '/' ? '238' : '170'"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top left, rgba(236, 103, 54, 0.8), rgba(77, 77, 77, 0.66)"
        ></v-img>

      </template>


      <v-container class="header-container pa-1">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search />
        </v-row>
        <v-row>
          <v-app-bar-title class="ml-3 text-h4 truncate custom-title">
            {{$store.state.appTitle}}
          </v-app-bar-title>
        </v-row>
        <v-row>
          <live-date-time />
        </v-row>
        <v-row
        v-if="$route.path === '/'">
          <field-add-task />
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snack-bar />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      items: [
          { title: 'ToDo', icon: 'mdi-format-list-checks', to: '/' },
          { title: 'About', icon: 'mdi-help-box', to: '/about' },
        ],
        right: null,
      }),
      mounted() {
        this.$store.dispatch('getTasks')
      },
      components: {
        'snack-bar': require('@/components/global/snackBar.vue').default,
        'live-date-time': require('@/components/tools/liveDateTime.vue').default,
        'field-add-task': require('@/components/todo/fieldAddTask.vue').default,
        'search': require('@/components/tools/search.vue').default
      }
  }
</script>

<style lang="sass">
  .header-container
    max-width: none !important
  .truncate
    .v-app-bar-title__content
      width: 300px !important
      font-family: 'Staatliches'
      font-size: 48px
  .custom-title
    
</style> 