<script setup>
import { ref } from "vue";
import hannstarIcon_1 from "@/assets/hannstarIcon_1.png";

const isHovered = ref(false);
let hideTimeout;

const handleMouseEnter = () => {
  clearTimeout(hideTimeout);
  isHovered.value = true;
};
const handleMouseLeave = () => {
  hideTimeout = setTimeout(() => {
    isHovered.value = false;
  }, 300);
};
</script>

<template>
  <div class="top-tool-bar">
    <div class="toolbar-wrapper">
      <div class="toolbar">
        <div class="title"><h1>公共安全數位儀表板</h1></div>
        <div class="admin-login">
          <div
            class="login-button"
            @mouseleave="handleMouseLeave"
            @mouseenter="handleMouseEnter"
          >
            <div class="login-flex">
              <div class="image">
                <img :src="hannstarIcon_1" />
              </div>
              <div class="text">
                <h4>歡迎回來</h4>
                <p>登入</p>
              </div>
            </div>
            <div class="login-wrapper">
              <div :class="['login', { 'is-hovered': isHovered }]">
                <ul>
                  <li><i class="fa-regular fa-user"></i>登入</li>
                  <li><i class="fa-solid fa-right-from-bracket"></i>離開</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  max-width: 100vw;
  width: 100%;
  height: 80px;
}
.toolbar .title h1 {
  color: rgb(15, 74, 169);
  font-size: 36px;
  font-weight: 600;
}
.admin-login {
  position: absolute;
  right: 0;
  margin: 0 20px;
  border-left: 1px #d6d6d6 solid;
}
.login-button {
  cursor: pointer;
}
.login-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.image {
  padding: 0 10px;
}
.image img {
  max-width: 50px;
  width: 100%;
  border-radius: 50%;
}
.text h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}
.text p {
  font-size: 14px;
  margin: 0;
}
.login-wrapper {
  position: absolute;
  top: 60px;
  right: 5px;
  width: 160px;
  z-index: 100;
  cursor: pointer;
}
.login {
  background-color: #fff;
  border-radius: 10px;
  -webkit-box-shadow: 0 0 20px rgba(89, 102, 122, 0.1);
  box-shadow: 0 0 20px rgba(89, 102, 122, 0.1);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}
.login.is-hovered {
  opacity: 1;
  pointer-events: auto;
}
.login-wrapper ul {
  margin: 0;
  padding: 10px 20px;
}
.login-wrapper ul li {
  list-style: none;
  border-bottom: 1px solid #d6d6d6;
  padding: 10px 0;
  transition: color 0.3s;
}
.login-wrapper ul li:hover {
  color: #ceb7b7;
}
.login-wrapper ul li:nth-last-child(1) {
  border-bottom: none;
}
.login-wrapper ul li svg {
  padding-right: 10px;
}

@media only screen and (max-width: 768px) {
  .toolbar .title h1 {
    font-size: 28px;
  }
  .text {
    display: none;
  }
}
@media only screen and (max-width: 480px) {
  .toolbar .title h1 {
    font-size: 20px;
  }
}
</style>
