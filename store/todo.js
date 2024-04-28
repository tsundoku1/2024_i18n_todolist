import { todoList } from "@/components/mock/todo.js";

export const state = () => ({
  todoList: [],
});

export const mutations = {
  setting_todoList(state, payload) {
    state.todoList = payload;
  },
  update_todoList(state, payload) {
    let index = state.todoList.findIndex((ele) => ele.id === payload.id);
    state.todoList[index][payload.key] = payload.val;
  },
  insert_todoList(state, payload) {
    let id = new Date().getTime();
    let insert = { id, todo: payload, done: false };
    state.todoList.push(insert);
    localStorage.setItem("todoList", JSON.stringify(state.todoList));
  },
  delete_todoList(state, payload) {
    let index = state.todoList.findIndex((ele) => ele.id === payload.id);

    if (index >= 0) {
      state.todoList.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(state.todoList));
    }
  },
};

export const actions = {
  fetch_todoList() {
    this.commit("todo/setting_todoList", todoList);
  },
};
