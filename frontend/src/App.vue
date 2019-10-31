<template>
  <div
    id="app"
    :class="{collapsed : collapsed}"
  >
    <div
      id="backdrop"
      :class="[{ activeBackdrop: !collapsed} ,{ disabledBackdrop : collapsed}]"
      @click="onBackdropClick"
    />
    <sidebar-menu
      class="menu"
      :menu="menu"
      :collapsed="collapsed"
      :theme="selectedTheme"
      @toggle-collapse="onToggleCollapse"
      @item-click="onItemClick"
    >
      <div
        slot="footer"
        v-if="!collapsed"
      ><span :class="{white: blackTheme}">Switch theme</span>
        <SwitchButton
          class="center"
          v-model="blackTheme"
        ></SwitchButton>
      </div>
    </sidebar-menu>
    <sidebar-menu
      class="mobileMenu"
      :menu="menu"
      :collapsed="collapsed"
      :theme="selectedTheme"
      :width="'150px'"
      @toggle-collapse="onToggleCollapse"
      @item-click="onItemClick"
    >
      <div
        slot="footer"
        v-if="!collapsed"
        class="margin-top"
      ><span :class="{white: blackTheme}">Switch theme</span>
        <SwitchButton
          class="center"
          v-model="blackTheme"
        ></SwitchButton>
      </div>
    </sidebar-menu>

    <router-view class="routerview" />

  </div>
</template>

<script>
import SwitchButton from "../src/components/SwitchButton";
import store from "./store";

export default {
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Main Navigation",
          hiddenOnCollapse: true
        },
        {
          href: "/",
          title: "Home",
          icon: "fa fa-home"
        },
        {
          href: "/shop",
          title: "Shop",
          icon: "fa fa-book"
        },
        {
          href: "/login",
          title: "Login",
          icon: "fas fa-door-open"
        },
        {
          href: "/signup",
          title: "Signup",
          icon: "fas fa-user-plus"
        }
      ],
      themes: [
        {
          name: "Default theme",
          input: ""
        },
        {
          name: "White theme",
          input: "white-theme"
        }
      ],
      blackTheme: false
    };
  },
  components: {
    SwitchButton
  },
  computed: {
    selectedTheme: function() {
      if (this.blackTheme) return "";
      else return "white-theme";
    },
    collapsed: {
      get: function() {
        return store.state.sidebarCollapsed;
      }
    }
  },
  methods: {
    onToggleCollapse(collapsed) {
      if (store.state.sidebarCollapsed) store.commit("expandSidebar");
      else store.commit("collapseSidebar");
    },
    onItemClick(event, item) {
      // console.log(event);
      // console.log(item);
    },
    onBackdropClick() {
      store.commit("collapseSidebar");
    }
  },
  created(){
    store.dispatch("checklogin");
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  display: flex;
  padding-left: 350px;
}
#app.collapsed {
  padding-left: 50px;
}

.disabledBackdrop {
  display: hidden;
  width: 0px;
  height: 0px;
}
.activeBackdrop {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  opacity: 0.5;
  background-color: black;
  box-sizing: border-box;
}

@media screen and (min-width: 800px) {
  .mobileMenu {
    display: none !important;
  }
}
@media screen and (max-width: 800px) {
  .menu {
    display: none !important;
  }
  #app {
    padding-left: 150px;
  }
  #app.collapsed {
    padding-left: 50px;
  }
  .v-sidebar-menu .vsm--list {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .v-sidebar-menu .vsm--header {
    height: 100%;
  }
   .v-sidebar-menu.vsm_collapsed .vsm--list{
     padding-bottom: 100px;
   }
   
}
.v-sidebar-menu .vsm--toggle-btn {
     height: 8rem !important;
     margin-top: 2rem;
   }
.center {
  justify-content: center;
}
.white {
  color: white;
}
.margin-top {
  margin-top: 50px;
}
</style>
