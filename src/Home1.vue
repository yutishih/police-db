<script>
import firstView from "./views/firstView.vue";
import Navigation from "./components/Navigation.vue";

export default {
  name: "dashboard",
  components: {
    firstView,
    Navigation,
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
  <div class="dashboard-wrapper">
    <div>
      <firstView ref="refFirstView"></firstView>
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  max-width: 100vw;
  width: 100%;
  height: auto;
}
</style>
