<template>
  <nav ref="navElement">
    <div class="toggle-on" @click="toggleNav">
      <div class="toggle-wrapper">
        <i class="fa-solid fa-table fa-xl"></i>
      </div>
    </div>
    <div class="nav-wrapper">
      <div class="list-wrapper" v-bind:class="{ show: isNavVisible }">
        <div class="logo-wrapper">
          <a href="#"
            ><img
              src="https://media.hannstar.com/Image/hannstar/header/logo.png"
          /></a>
        </div>
        <ul>
          <li class="list-item">
            <div class="div-flex">
              <a href="#"
                ><i
                  class="fa-solid fa-helmet-safety"
                  style="color: #ffffff"
                ></i>
                <p>原始首頁</p></a
              >
            </div>
          </li>
          <li class="list-item">
            <div class="div-flex">
              <a href="#/dashboard"
                ><i
                  class="fa-solid fa-spray-can-sparkles"
                  style="color: #ffffff"
                ></i>
                <p>面板首頁</p></a
              >
            </div>
          </li>
          <li class="list-item">
            <div class="div-flex">
              <a href="#/hsd"
                ><i class="fa-solid fa-seedling" style="color: #ffffff"></i>
                <p>公共安全</p></a
              >
            </div>
          </li>
        </ul>
        <div class="toggle-off" @click="toggleNav">
          <div class="toggle-wrapper">
            <i
              class="fa-solid fa-right-to-bracket fa-xl"
              style="color: #ffffff"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      isNavVisible: false,
    };
  },
  methods: {
    toggleNav() {
      this.isNavVisible = !this.isNavVisible;
    },
    handleOutsideClick(event) {
      const nav = this.$refs.navElement;
      if (!nav.contains(event.target)) {
        this.isNavVisible = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>

<style scoped>
.list-wrapper.show {
  width: 100px;
  transform: translateX(0);
}
.list-wrapper {
  position: fixed;
  background-color: #1f2f3e;
  height: 100vh;
  z-index: 10000;
  transition: width 0.3s ease, transform 0.3s ease;
  transform: translateX(-100%);
  overflow: hidden;
}
.list-wrapper ul {
  padding: 0;
  margin: 0;
}
.list-item {
  height: 100px;
  list-style: none;
  text-align: center;
  border-bottom: 1px solid #304050;
  padding: 20px 0;
}
.list-item .div-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-item a {
  text-decoration: none;
  font-size: 18px;
  color: #fff;
}
.list-item p {
  margin: 0;
}
.logo-wrapper {
  border-bottom: 1px solid #304050;
  height: 100px;
}
.logo-wrapper a {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}
.logo-wrapper img {
  max-width: 100px;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
}
.toggle-on {
  position: absolute;
  width: 100px;
  height: 80px;
  top: 0;
}
.toggle-off {
  position: absolute;
  width: inherit;
  height: 80px;
  bottom: 0;
  border-top: 1px solid #304050;
}
.toggle-wrapper {
  position: relative;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
