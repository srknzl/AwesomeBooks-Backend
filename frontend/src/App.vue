<template>
  <div
    id="app"
    :class="[{collapsed : collapsed}]"
  >
    <p>Switch theme</p>
    <SwitchButton v-model="switch1"></SwitchButton>
    <!-- <select class="theme-selector" v-model="selectedTheme">
      <option
        v-for="(theme, index) in themes"
        :key="index"
        :value="theme.input"
      >
        {{ theme.name }}
      </option>
    </select> -->
    
    <sidebar-menu
      class="menu"
      :menu="menu"
      :collapsed="collapsed"
      :theme="selectedTheme"
      @toggle-collapse="onToggleCollapse"
      @item-click="onItemClick"
    />

    <router-view class="routerview" />
  </div>
</template>

<script>
import SwitchButton from "../src/components/SwitchButton";
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
      ],
      collapsed: true,
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
      switch1: false
    };
  },
  components: {
    SwitchButton
  },
  computed: {
    selectedTheme: function(){
      if(this.switch1)return "";
      else return "white-theme";
    }  
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
    onItemClick(event, item) {
      // console.log(event);
      // console.log(item);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-left: 350px;
}
#app.collapsed {
  padding-left: 50px;
}
</style>
