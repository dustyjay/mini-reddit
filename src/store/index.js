import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: []
  },
  getters: {
    getPosts: state => state.posts
  },
  mutations: {
    SET_POSTS(state, payload) {
      state.posts = payload;
    }
  },
  actions: {
    async GET_POSTS({ commit }) {
      const response = await fetch("https://www.reddit.com/.json", {
        method: "GET"
      });
      const result = await response.json();
      commit("SET_POSTS", result.data.children);
    }
  },
  modules: {}
});
