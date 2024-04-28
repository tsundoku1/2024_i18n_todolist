<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="show" max-width="320" persistent>
        <v-card style="background-color: #fff; color: #000">
          <v-card-title
            class="text-h6 bg-cyan-darken-1"
            style="text-decoration: underline; font-weight: bold"
          >
            新增待辦事項：
          </v-card-title>

          <v-text-field
            v-model="newItem"
            :rules="rules"
            style="padding: 20px"
            bg-color="grey-lighten-2"
            color="primary"
            label="請填寫內容"
            rows="2"
            solo
            clearable
          ></v-text-field>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="btn_black" @click="close_dialog()"> 取消 </v-btn>
            <v-btn class="btn_yellow" @click="add_item()"> 確認 </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      rules: [
        (value) => !!value || "*必填項目",
        // (value) => (value || "").length <= 20 || "Max 20 characters",
        // (value) => {
        //   const pattern =
        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //   return pattern.test(value) || "Invalid e-mail.";
        // },
      ],
      newItem: "",
    };
  },
  props: ["dialog"],
  methods: {
    close_dialog() {
      this.$emit("close_dialog");
    },
    add_item() {
      if (this.newItem != "") {
        this.$store.commit("todo/insert_todoList", this.newItem);
        this.newItem = this.$options.data.newItem;
        this.$emit("close_dialog");
        this.$emit("update_todoList");
      }
    },
  },
  watch: {
    dialog(val) {
      this.show = this.dialog;
    },
  },
};
</script>
