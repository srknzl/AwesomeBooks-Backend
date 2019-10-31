import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import backendSel from "../utils/host";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebarCollapsed: true,
    loggedIn: false
  },
  mutations: {
    collapseSidebar(state){
      state.sidebarCollapsed = true;
    },
    expandSidebar(state){
      state.sidebarCollapsed = false;
    },
    login(state){
      state.loggedIn = true;
    },
    logout(state){
      state.loggedIn = false;
    }
  },
  actions: {
    login (context,{ form }){
      axios.post(backendSel(true)+"login",{
        ...form
      },{
        withCredentials: true,
        timeout: 3000
      }).then(res=>{        
        if(res.status == 200){
          context.commit("login");
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  modules: {}
});
