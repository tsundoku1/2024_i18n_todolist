<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item>
          <router-link to="/todo" class="d-flex">
            <v-icon class="mdi mdi-text-box-check-outline"></v-icon>
            <v-list-item-title>待辦清單</v-list-item-title>
          </router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/test1" class="d-flex">
            <v-icon class="mdi mdi-cat"></v-icon>
            <v-list-item-title>測試頁1</v-list-item-title>
          </router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/test2" class="d-flex">
            <v-icon class="mdi mdi-dog"></v-icon>
            <v-list-item-title>測試頁2</v-list-item-title>
          </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>i18n ToDoList - DEMO</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({ drawer: null }),
};
</script>
<style lang="scss">
@import "@/assets/style";
</style>
<style lang="scss">
.v-main__wrap > div {
  padding: 10px 5px;
}
a {
  text-decoration: none;
  display: flex !important;
  align-items: center;
  div {
    display: flex;
    height: 1em;
    margin-left: 0.5em;
  }
  .v-icon {
    display: flex;
    height: 1.3em;
    width: 1.3em;
  }
}
a:not(.nuxt-link-exact-active) {
  color: #fff;
}
</style>
