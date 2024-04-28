<template>
  <div id="tableComp">
    <!-- 1. table -->
    <v-data-table
      :headers="TDheaders"
      :items="tableRows"
      :items-per-page="5"
      class="elevation-1"
    >
      <template #item.todo="{ item }">
        <v-chip
          v-if="item.done"
          class="ma-2"
          color="green"
          text-color="white"
          small
        >
          已完成
        </v-chip>
        <v-chip
          v-if="!item.done"
          class="ma-2"
          color="red"
          text-color="white"
          small
        >
          待完成
        </v-chip>
        {{ item.todo }}
      </template>
      <template #item.done="{ item }">
        <v-checkbox
          v-model="tableRows_raw[item.id].done"
          @change="change_state($event, item)"
          :label="item.done ? '已完成' : '待完成'"
        />
      </template>
      <template #item.delete="{ item }">
        <v-btn @click="delete_item_check(item)"
          ><v-icon class="mdi mdi-trash-can-outline"></v-icon
        ></v-btn>
      </template>
    </v-data-table>

    <!-- 2. dialog -->
    <v-dialog v-model="showDialog" max-width="320" persistent>
      <v-card style="background-color: #fff; color: #000">
        <v-card-title
          class="text-h6"
          style="text-decoration: underline; font-weight: bold"
          >確認要刪除這個項目嗎?
        </v-card-title>

        <v-card-text
          ><div style="color: #000 !important; margin: 10px auto">
            {{ deleteItem.todo }}
          </div></v-card-text
        >

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn_black" @click="showDialog = false"> 取消 </v-btn>
          <v-btn class="btn_yellow" @click="delete_item"> 確認 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["tableRows", "TDheaders"],
  data() {
    return {
      doneList: [],
      showDialog: false,
      deleteItem: {},
    };
  },
  computed: {
    tableRows_raw() {
      let obj = {};
      for (let item of this.tableRows) {
        obj[item.id] = JSON.parse(JSON.stringify(item));
      }
      return obj;
    },
  },
  mounted() {
    Array.prototype.map.call(this.doneList, function (ele) {
      if (ele.done) {
        this.doneList.push(ele.id);
      }
    });
  },
  methods: {
    change_state(newV, item) {
      this.$emit("emit_change_state", { id: item.id, key: "done", val: newV });
    },
    delete_item_check(item) {
      this.showDialog = true;
      this.deleteItem = JSON.parse(JSON.stringify(item));
    },
    delete_item() {
      this.showDialog = false;
      this.$emit("emit_delete_item", this.deleteItem);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style";
</style>
<style scoped lang="scss">
#tableComp {
  table {
    width: 100%;
    border-collapse: collapse;
    tr {
      position: relative;
      cursor: pointer;
    }
    tr:hover {
      background-color: rgba(55, 55, 55, 0.6);
    }

    table {
      color: red;
    }
    tr,
    td {
      padding: 5px;
      line-height: 3em;
    }
    td:last-child {
      position: absolute;
      width: 5em;
      right: 2px;
    }
    td:nth-last-child(2) {
      position: absolute;
      width: 5em;
      right: 5em;
    }
  }
}
</style>
