<template>
  <div id="todo">
    <!-- 1. Menu -->
    <div class="menu" style="display: flex">
      <!-- 狀態篩選 -->
      <div class="state_filter">
        <v-select
          class="state_filter"
          v-model="stateSelected"
          :items="todoType"
          item-text="abbr"
          item-value="state"
          :label="$t('status')"
          chips
        ></v-select>
      </div>
      <!-- 新增項目 -->
      <v-btn class="add_item btn_yellow" @click="dialog_add = true">{{
        $t("add")
      }}</v-btn>
    </div>

    <!-- 2. To Do List - table component) -->
    <v-card style="width: 100%; margin: auto">
      <tableComp2
        :tableRows="tableRows"
        :TDheaders="TDheaders"
        @emit_change_state="change_state($event)"
        @emit_delete_item="delete_item($event)"
      >
      </tableComp2>
    </v-card>

    <!-- 3. -->
    <dialogComp
      :dialog="dialog_add"
      @close_dialog="dialog_add = false"
      @update_todoList="update_todoList"
    ></dialogComp>
  </div>
</template>
<script>
import { mapState } from "vuex";
import tableComp from "@/components/tableComp2.vue";
import dialogComp from "@/components/dialogComp.vue";
export default {
  components: { tableComp, dialogComp },
  data() {
    return {
      // table data
      TDheaders: [
        { text: this.$t("item"), value: "todo" },
        { text: this.$t("status"), value: "done", align: "left" },
        { text: this.$t("delete"), value: "delete", sortable: false },
      ],
      tableRows: [],
      tableColumns: ["todo", "edit", "delete"],
      //狀態類型
      todoType: [
        { state: "all", abbr: this.$t("all") },
        { state: "todo", abbr: this.$t("undone") },
        { state: "done", abbr: this.$t("done") },
      ],
      //狀態篩選預設值
      stateSelected: "all",
      // dialog
      dialog_add: false,
    };
  },
  computed: {
    ...mapState("todo", ["todoList"]),
    // ...mapGetters("todo", ["todoList"]),

    itemsTodo() {
      let todo = [];
      for (let obj of this.todoList) {
        if (!obj.done) {
          todo.push(obj);
        }
      }
      return todo;
    },
    itemsDone() {
      let done = [];
      for (let obj of this.todoList) {
        if (obj.done) {
          done.push(obj);
        }
      }
      return done;
    },
    todoList2() {
      let todoList = this.todoList;
      if (!localStorage.getItem("todoList")) {
        return todoList;
      } else {
        return JSON.parse(localStorage.getItem("todoList"));
      }
    },
  },
  watch: {
    stateSelected: function (newV) {
      if (newV === "todo") {
        this.tableRows = this.itemsTodo;
      } else if (newV === "done") {
        this.tableRows = this.itemsDone;
      } else {
        this.tableRows = this.todoList;
      }
    },
  },
  methods: {
    change_state(payload) {
      this.$store.commit("todo/update_todoList", payload);
      let index = this.todoList.findIndex((ele) => ele.id === payload.id);
      this.todoList[index][payload.key] = payload.val;
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
      this.update_todoList();
    },
    delete_item(payload) {
      this.$store.commit("todo/delete_todoList", payload);
      this.update_todoList();
    },
    update_todoList() {
      if (this.stateSelected === "todo") {
        this.tableRows = this.itemsTodo;
      } else if (this.stateSelected === "done") {
        this.tableRows = this.itemsDone;
      } else {
        this.tableRows = this.todoList;
      }
    },
  },
  created() {
    this.$store.dispatch("todo/fetch_todoList");
  },
  mounted() {
    this.tableRows = this.todoList;
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style";
</style>
<style lang="scss">
#todo {
  .menu {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    justify-content: space-between;
    > * {
      display: flex;
    }
    .state_filter {
      width: 10em;
    }
    .add_item {
    }
  }
  .mdi.mdi-square-edit-outline {
    color: #2c2c2c;
  }
  .mdi.mdi-trash-can-outline {
    font-weight: 500;
    color: #f30c11;
  }
  li.todo:not(.done) {
    color: #15958d;
    // font-weight: 600;
  }
  li.todo:not(.done)::marker {
    color: #15958d;
  }
  li.done:not(.statedone) {
    text-decoration: line-through;
    text-decoration-thickness: 1px;
  }
}
</style>
