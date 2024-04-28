<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item>
          <router-link to="/todo" class="d-flex">
            <v-icon class="mdi mdi-text-box-check-outline"></v-icon>
            <v-list-item-title>{{ $t("todolist") }}</v-list-item-title>
          </router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/test1" class="d-flex">
            <v-icon class="mdi mdi-cat"></v-icon>
            <v-list-item-title>{{ $t("testpage1") }}</v-list-item-title>
          </router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/test2" class="d-flex">
            <v-icon class="mdi mdi-dog"></v-icon>
            <v-list-item-title>{{ $t("testpage2") }}</v-list-item-title>
          </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <div style="display: flex; align-items: center">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>i18n ToDoList</v-toolbar-title>
      </div>
      <div style="position: absolute; right: 1em">
        <v-hover v-slot="{ hover }" style="margin-right: 0.5em">
          <v-list dense style="background-color: transparent">
            <v-subheader
              style="
                width: 10rem;
                font-weight: bold;
                font-size: 1.2em;
                border-bottom: 1px solid #eeeeee;
              "
              @mouseover="showMenu = true"
              @click="showMenu = true"
            >
              <span style="display: flex; align-items: center"
                ><v-img
                  :width="32"
                  :height="32"
                  :src="require(`~/assets/imgs/flags/${langs[index].img}.png`)"
                  style="margin-right: 0.6em !important"
                ></v-img>
                {{ currentLang }}</span
              ></v-subheader
            >
            <v-list-item-group
              color="primary"
              v-show="hover && showMenu"
              style="position: absolute"
            >
              <v-list-item
                v-for="(item, i) in langs"
                :key="i"
                @click="
                  selectedLang = item.lang;
                  showMenu = false;
                "
                style="border-top: 1px solid #e2e2e2"
              >
                <v-list-item-icon>
                  <!-- <v-icon>mdi-heart-box</v-icon> -->
                  <v-img
                    :width="28"
                    :height="28"
                    :src="require(`~/assets/imgs/flags/${item.img}.png`)"
                    style="margin-right: 0.6em !important"
                  ></v-img>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.desc }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-hover>
      </div>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: null,
    langs: [
      { lang: "tw", desc: "繁體中文", img: "tw" },
      { lang: "en", desc: "English", img: "en" },
    ],
    selectedLang: "tw",
    // selectedLang: this.$i18n.locale,
    showMenu: false,
  }),
  computed: {
    currentLang: function () {
      let i = this.langs.findIndex((e) => e.lang === this.selectedLang);
      return this.langs[i].desc;
    },
    index() {
      return this.langs.findIndex((e) => e.lang === this.selectedLang);
    },
  },
  watch: {
    selectedLang: {
      handler: "updateLang",
    },
  },
  methods: {
    updateLang() {
      this.$i18n.locale = this.selectedLang;
      localStorage.setItem("locale", this.selectedLang);
      this.$forceUpdate();
      console.log(this.$i18n.locale);
    },
  },

  beforeMount() {
    // if (localStorage.getItem("locale") === "mi")
    //   localStorage.setItem("locale", "en");
    // let setLang = localStorage.getItem("locale") || "tw";
    // this.selectedLang = setLang;
    this.selectedLang = "tw";
  },
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
