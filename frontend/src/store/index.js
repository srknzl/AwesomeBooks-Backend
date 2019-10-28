import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebarCollapsed: true
  },
  mutations: {
    collapseSidebar: function(state){
      state.sidebarCollapsed = true;
    },
    expandSidebar: function(state){
      state.sidebarCollapsed = false;
    }
  },
  actions: {},
  modules: {}
});
