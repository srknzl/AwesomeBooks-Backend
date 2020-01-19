<template>
  <div id="app" :class="{collapsed : collapsed}">
    <b-card text-variant="success" v-if="message&&!isError">
      <b-card-text>{{message}}</b-card-text>
    </b-card>
    <b-card v-if="isError && message" text-variant="danger">
      <b-card-text>{{message}}</b-card-text>
    </b-card>

    <transition name="fade">
      <div
        id="backdrop"
        class="activeBackdrop"
        @click="onBackdropClick"
        v-touch:swipe.left="onSwipeLeft"
        v-if="!collapsed"
      />
    </transition>
    <sidebar-menu
      class="menu"
      :menu="menu"
      :collapsed="collapsed"
      :theme="selectedTheme"
      @toggle-collapse="onToggleCollapse"
      @item-click="onItemClick"
    >
      <div slot="footer" v-if="!collapsed">
        <span :class="{white: blackTheme}">Switch theme</span>
        <SwitchButton class="center" v-model="blackTheme"></SwitchButton>
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
      v-touch:swipe.left="onSwipeLeft"
      v-touch:swipe.right="onSwipeRight"
    >
      <div slot="footer" v-if="!collapsed" class="margin-top">
        <span :class="{white: blackTheme}">Switch theme</span>
        <SwitchButton class="center" v-model="blackTheme"></SwitchButton>
      </div>
    </sidebar-menu>

    <router-view
      v-touch:swipe.left="onSwipeLeft"
      v-touch:swipe.right="onSwipeRight"
      class="routerview"
    />
  </div>
</template>

<script>
import SwitchButton from "../src/components/SwitchButton";
import store from "./store";
import router from "./router";

export default {
  data() {
    return {
      message: router.currentRoute.params.message,
      isError: router.currentRoute.params.isError,
      menuNotLoggedIn: [
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
      menuLoggedIn: [
        {
          header: true,
          title: "Main Navigation",
          hiddenOnCollapse: true
        },
        {
          href: "/welcome",
          title: "Home",
          icon: "fa fa-home"
        },
        {
          href: "/shop",
          title: "Shop",
          icon: "fa fa-book"
        },
        {
          href: "/logout",
          title: "Logout",
          icon: "fas fa-sign-out-alt"
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
    selectedTheme() {
      if (this.blackTheme) return "";
      else return "white-theme";
    },
    collapsed: {
      get() {
        return store.state.sidebarCollapsed;
      }
    },
    menu() {
      return store.state.loggedIn ? this.menuLoggedIn : this.menuNotLoggedIn;
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
    },
    onSwipeLeft() {
      store.commit("collapseSidebar");
    },
    onSwipeRight() {
      store.commit("expandSidebar");
    }
  },
  created() {
    if (!store.state.loggedIn) store.dispatch("checklogin","/welcome");
  }
};
</script>

<style lang="scss">
.menu {
  z-index: 10001 !important;
}
.mobileMenu {
  z-index: 10001 !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  display: flex;
  padding-left: 50px;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
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
  .v-sidebar-menu .vsm--list {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .v-sidebar-menu .vsm--header {
    height: 100%;
  }
  .v-sidebar-menu.vsm_collapsed .vsm--list {
    padding-bottom: 100px;
  }
  .v-sidebar-menu .vsm--toggle-btn {
    height: 6rem !important;
    margin-bottom: 6rem;
  }
}
.v-sidebar-menu .vsm--toggle-btn {
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
