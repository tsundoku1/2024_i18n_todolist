<template>
  <div id="tableComp">
    <table>
      <thead v-if="showTableHeader">
        <tr>
          <th v-for="col in tableColumns" :key="col">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableRows" :key="row.id">
          <td v-for="col in tableColumns" :key="col">
            <div v-if="!$slots[col]" class="col">{{ row[col] }}</div>
            <slot v-else :name="col" :slotProps="row"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ["tableColumns", "tableRows", "showTableHeader"],

  mounted() {
    console.log("mounted");
  },
  updated() {
    console.log("updated~~~");
    console.log(this.tableRows);
  },
};
</script>
<!-- <style scoped lang="scss">
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
</style> -->
