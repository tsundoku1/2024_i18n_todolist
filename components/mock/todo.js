async function getStorage() {
  let s = await localStorage.getItem("todoList");
  if (!s) {
    todoList = [
      {
        id: 1,
        todo: "經濟學期中報告、財政學期中報告...",
        done: false,
      },
      {
        id: 2,
        todo: "排球少年華山展覽",
        done: false,
      },
      {
        id: 3,
        todo: "貓咪打三合一疫苗",
        done: true,
      },
      {
        id: 4,
        todo: "RADWIMPS 演唱會",
        done: true,
      },
      {
        id: 5,
        todo: "年度家族旅遊",
        done: false,
      },
    ];
  } else {
    todoList = JSON.parse(s);
  }
}
getStorage();

export let todoList;
