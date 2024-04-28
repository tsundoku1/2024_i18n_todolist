<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "IndexPage",
  data: () => ({ drawer: null }),
  created() {
    console.log("created");
    console.log(this.$route.fullPath);
    if (this.$route.fullPath === "/") {
      this.$router.replace("/todo");
    }
  },
};
</script>
<style>
#index_content {
  padding: 3px;
}
</style>
