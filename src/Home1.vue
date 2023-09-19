<script>
import firstView2 from "./views/firstView2.vue";
import Navigation from "./components/Navigation.vue";
import TopToolBar from "./components/TopToolBar.vue";

export default {
  name: "dashboard",
  components: {
    firstView2,
    Navigation,
    TopToolBar,
  },
  mounted() {
    const intervalId = setInterval(() => {
      this.$nextTick(() => {
        if (this.$refs.refFirstView) {
          this.dictHealthSafety = this.$refs.refFirstView.dictHealthSafety;
          this.dictEnvironmentalFriendly =
            this.$refs.refFirstView.dictEnvironmentalFriendly;
          this.dictWorkerSafety = this.$refs.refFirstView.dictWorkerSafety;
          clearInterval(intervalId);
        }
      });
    }, 1000);
  },
  data() {
    return {
      dictHealthSafety: "",
      dictEnvironmentalFriendly: "",
      dictWorkerSafety: "",
    };
  },
};
</script>

<template>
  <Navigation />
  <TopToolBar />
  <div class="dashboard-wrapper">
    <div class="background-color-wrapper">
      <firstView2 ref="refFirstView"></firstView2>
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  max-width: 100vw;
  width: 100%;
  height: auto;
}
.background-color-wrapper {
  background-color: #f6f6f6;
}
</style>
