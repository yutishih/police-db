<script>
import NavigationSidebar from "./views/NavigationSidebar.vue";
import secondView from "./views/secondView.vue";

export default {
  name: "HSD",
  components: {
    NavigationSidebar,
    secondView,
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
  <NavigationSidebar />
  <div class="dashboard-wrapper">
    <div>
      <secondView
        ref="refSecondView"
        :dictHealthSafety="dictHealthSafety"
        :dictEnvironmentalFriendly="dictEnvironmentalFriendly"
        :dictWorkerSafety="dictWorkerSafety"
      >
      </secondView>
      <a href="#/tem-home">回到首頁</a>
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
