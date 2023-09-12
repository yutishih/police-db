<script>
import firstView from "./views/firstView.vue";
import secondView from "./views/secondView.vue";

export default {
  name: "Home",
  components: {
    firstView,
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
      btnFirstPage2SecondPage: false,
      dictHealthSafety: "",
      dictEnvironmentalFriendly: "",
      dictWorkerSafety: "",
    };
  },
  methods: {
    firstPage2SecondPage: function () {
      this.btnFirstPage2SecondPage = !this.btnFirstPage2SecondPage;
    },
    secondPage2FirstPage: function () {
      this.btnFirstPage2SecondPage = !this.btnFirstPage2SecondPage;
    },
  },
};
</script>

<template>
  <NavigationPC />
  <div class="dashboard-wrapper">
    <div v-if="btnFirstPage2SecondPage == false">
      <firstView ref="refFirstView"></firstView>
      <button
        type="button"
        class="btn-lg"
        v-bind:onclick="firstPage2SecondPage"
        style="opacity: 0"
      >
        下一頁
      </button>
    </div>

    <div v-if="btnFirstPage2SecondPage == true">
      <secondView
        ref="refSecondView"
        :dictHealthSafety="dictHealthSafety"
        :dictEnvironmentalFriendly="dictEnvironmentalFriendly"
        :dictWorkerSafety="dictWorkerSafety"
      >
      </secondView>
      <button
        type="button"
        class="btn-lg"
        v-bind:onclick="secondPage2FirstPage"
        style="opacity: 0"
      >
        上一頁
      </button>
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
