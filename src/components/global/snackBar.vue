<template>
  <v-snackbar
      v-model="$store.state.snackBar.show"
    >
      {{ $store.state.snackBar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          @click="$store.commit('hideSnackBar')"
          text
          v-bind="attrs"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
  export default {

  }
</script>

<style lang="sass">
  div.v-snack:not(.v-snack--absolute)
    height: 100%
</style>