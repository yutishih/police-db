<script>
import firstView from "./views/firstView.vue";
import secondView from "./views/secondView.vue";
import Navigation from "./components/Navigation.vue";

export default {
  name: "Home",
  components: {
    firstView,
    secondView,
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

    // 檢查查詢參數
    if (this.$route.query.view === "secondView") {
      this.btnFirstPage2SecondPage = true;
    } else if (this.$route.query.view === "firstView") {
      this.btnFirstPage2SecondPage = false;
    }
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
  <Navigation />
  <div class="dashboard-wrapper">
    <div v-if="btnFirstPage2SecondPage == false">
      <firstView ref="refFirstView" :params="params"></firstView>
      <button
        type="button"
        class="btn-lg"
        v-bind:onclick="firstPage2SecondPage"
        style="opacity: 1"
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
        :params="params"
      ></secondView>
      <button
        type="button"
        class="btn-lg"
        v-bind:onclick="secondPage2FirstPage"
        style="opacity: 1"
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
