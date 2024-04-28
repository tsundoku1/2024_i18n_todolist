import { todoList } from "@/components/mock/todo.js";

export const state = () => ({
  todoList0: [],
});

export const getters = {
  todoList(state) {
    return state.todoList0;
  },
};

export const mutations = {
  setting_todoList(state, payload) {
    state.todoList0 = payload;
  },
  update_todoList(state, payload) {
    let index = state.todoList0.findIndex((ele) => ele.id === payload.id);

    state.todoList0[index][payload.key] = payload.val;
  },
};

export const actions = {
  fetch_todoList() {
    this.commit("setting_todoList", todoList);
  },
};
