import Vue from "vue";
import Vuex from "vuex";
import domain from "../utils/host";
import axios from "axios";
import router from "../router"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebarCollapsed: true,
    loggedIn: false,
    email: "",
    userid: "",
    exp: null,
    domain: domain
  },
  mutations: {
    collapseSidebar(state) {
      state.sidebarCollapsed = true;
    },
    expandSidebar(state) {
      state.sidebarCollapsed = false;
    },
    login(state, { userid, email, exp, redirect }) {
      state.loggedIn = true;
      state.email = email;
      state.userid = userid;
      state.exp = exp;
      if (redirect != "noredirect") {
        if (redirect)
          router.push({ path: redirect });
        else if (router.currentRoute.path !== "/welcome") {
          router.push("welcome");
        }
      }
    },
    logout(state) {
      state.loggedIn = false;
      state.email = "";
      state.userid = "";
      state.exp = null;
    },
    signup(state, { message }) {
      router.push({
        name: "home",
        params: {
          message: message
        }
      });
    },
    addCart(state, { message }){
      router.push({
        name: "cart",
        params: {
          message: message
        }
      });
    }
  },
  actions: {
    login(context, { form, redirect }) {
      axios.post(domain + "login", {
          ...form
        }, {
          timeout: 3000,
          withCredentials: true
        }).then(res => {
          if (res.status == 200) {
            context.commit("login", {
              userid: res.data.userid,
              email: res.data.email,
              exp: res.data.exp,
              redirect: redirect
            });
          }
        }).catch((error)=>{
          if (error.response.status == 422) {
            let problemString = "Validation failed! ";
            for (let problem of error.response.data.error.problems) {
              problemString += problem.msg + "\n";
            }
            alert(problemString);
          } else if (error.response.status == 401) {
            alert(error.response.data.message);
          }
        });
      
    },
    checklogin(context, { redirect }) {
      axios.post(domain + "checklogin", {}, {
          withCredentials: true,
          timeout: 3000
      }).then(res => {
        if (res.status == 200) {
          context.commit("login", {
            userid: res.data.userid,
            email: res.data.email,
            exp: res.data.exp,
            redirect: redirect
          });
        }
      }).catch(err => {
          context.commit("logout");
      });
      
    },
    logout(context) {
        axios.post(domain + "logout", {}, {
          withCredentials: true,
          timeout: 3000
        }).then(res => {
          if(res.status == 200){
            context.commit("logout");
          }
        });
    },
    signup(context, { form }) {
      axios.post(domain + "signup", {
        ...form
      }, {
        withCredentials: true,
        timeout: 3000
      }).then((res) => {
        if (res.status == 201) {
          context.commit("signup", { message: res.data.message });
        }
      }).catch((error) => {
        if (error.response.status == 422) {
          let problemString = "Validation failed! ";
          for (let problem of error.response.data.error.problems) {
            problemString += problem.msg + "\n";
          }
          alert(problemString);
        } else if (error.response.status == 401) {
          alert(error.response.data.message);
        }
      });
    },
    addCart(context, { id }) {
        axios.post(domain + "addCart", {
          id: id
        }, {
          withCredentials: true,
          timeout: 3000
        }).then(res => {
          if(res.status == 200){
            context.commit("addCart", { message: res.data.message });
          }
        }).catch(err => {
          console.log(err);
          alert("Could not add to the cart!");
        });
    }
  },
  modules: {}
});
