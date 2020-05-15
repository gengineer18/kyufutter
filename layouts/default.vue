<template>
  <v-app>
    <v-app-bar app flat hide-on-scroll color="#00acee" dark>
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2020 Woods At Web</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: '10万円給付ったー'
    }
  }
}
</script>
