<script>
import {
  dictItemEn2ch,
  airPollutionPath,
  waterPollutionPath,
  poisonPath,
  industrialWastePath,
} from "./constants/constants.js";
import apiServices from "./services/apiServices";
import AjaxAPI from "./components/AjaxAPI.vue";
import secondView from "./views/secondView.vue";
import Navigation from "./components/Navigation.vue";

export default {
  name: "hsd",
  components: {
    secondView,
    Navigation,
  },
  mounted() {
    // const intervalId = setInterval(() => {
    //   this.$nextTick(() => {
    //     if (this.$refs.refSecondView) {
    //       this.dictHealthSafety = this.$refs.refSecondView.dictHealthSafety;
    //       this.dictEnvironmentalFriendly =
    //         this.$refs.refSecondView.dictEnvironmentalFriendly;
    //       this.dictWorkerSafety = this.$refs.refSecondView.dictWorkerSafety;
    //       clearInterval(intervalId);
    //     }
    //   });
    // }, 1000);

    this.getEnvironmentalFriendlyValue();
    this.getHealthSafetyValue();
    this.getWorkSafeValue();
    this.getOccupationalDisaster();
    this.getTrafficAccidentCount();
  },
  data() {
    return {
      okDays: "",
      dictEnvironmentalFriendly: {
        airPollution: { finalStatus: "Ok", ImgName: airPollutionPath },
        waterPollution: { finalStatus: "Ok", ImgName: waterPollutionPath },
        poison: { finalStatus: "Ok", ImgName: poisonPath },
        industrialWaste: { finalStatus: "Ok", ImgName: industrialWastePath },
      },
      dictHealthSafety: {
        numberPeopleCareOf: {
          M: "",
          "M-1": "",
          "M-2": "",
          "M-3": "",
          "M-4": "",
          "M-5": "",
          ComePerson: { Array: "", CF: "", Cell: "", MDL: "", FAC: "" },
        },
        girlProtection: {
          M: "",
          "M-1": "",
          "M-2": "",
          "M-3": "",
          "M-4": "",
          "M-5": "",
          ComePerson: { Array: "", CF: "", Cell: "", MDL: "", FAC: "" },
        },
        healthPromotion: {
          M: "",
          "M-1": "",
          "M-2": "",
          "M-3": "",
          "M-4": "",
          "M-5": "",
          ComePerson: { Array: "", CF: "", Cell: "", MDL: "", FAC: "" },
        },
        specialWork: {
          M: "",
          "M-1": "",
          "M-2": "",
          "M-3": "",
          "M-4": "",
          "M-5": "",
          ComePerson: { Array: "", CF: "", Cell: "", MDL: "", FAC: "" },
        },
      },
      dictWorkerSafety: {
        lifeClause: {
          M: "",
          "M-1": "",
          "M-2": "",
          "M-3": "",
          "M-4": "",
          "M-5": "",
        },
        unsafeEnvironment: {
          M: "",
          "M-1": "",
          "M-2": "",
          "M-3": "",
          "M-4": "",
          "M-5": "",
        },
        unsafeBehavior: {
          M: "",
          "M-1": "",
          "M-2": "",
          "M-3": "",
          "M-4": "",
          "M-5": "",
        },
        occupationalDisaster: {
          thisYear: "",
          M: "",
          "M-1": "",
          "M-2": "",
          "M-3": "",
          "M-4": "",
          "M-5": "",
        },
      },
      // 從constants.js 引用的參數
      dictItemEn2ch,
      airPollutionPath,
      waterPollutionPath,
      poisonPath,
      industrialWastePath,
    };
  },
  methods: {
    // 燈號
    getStatusClass: function (value) {
      // 環保 + 衛生
      if (value == "綠") {
        return "status-dot status-dot-green";
      } else if (value == "黃") {
        return "status-dot status-dot-yellow";
      } else if (value == "紅") {
        return "status-dot status-dot-red";
      }
    },

    // 從API取得環保資訊
    async getEnvironmentalFriendlyValue() {
      //var apiUrl = apiServices.environmentalFriendlyApiUrl
      var apiUrl = apiServices.getEnvironmentalFriendlyDataFromDbURL;
      var mode = "environmentalFriendly";
      var passApiInformation = await this.$refs.refAjaxAPI.ajaxGetMethodPromise(
        apiUrl,
        mode
      );

      if (passApiInformation["statusCode"] == 200) {
        this.dictEnvironmentalFriendly["airPollution"]["finalStatus"] =
          passApiInformation["environmentalFriendlyStatus"]["AirPollution"];
        this.dictEnvironmentalFriendly["waterPollution"]["finalStatus"] =
          passApiInformation["environmentalFriendlyStatus"]["WaterPollution"];
        this.dictEnvironmentalFriendly["poison"]["finalStatus"] =
          passApiInformation["environmentalFriendlyStatus"]["Poison"];
        this.dictEnvironmentalFriendly["industrialWaste"]["finalStatus"] =
          passApiInformation["environmentalFriendlyStatus"]["IndustrialWaste"];
      }
    },

    // 從API取得衛生資訊(M to M-5)
    async getHealthSafetyValue() {
      //var apiUrl = apiServices.healthSafetyApiUrl
      var apiUrl = apiServices.getHealthSafetyDataFromDbURL;
      var mode = "HealthSafety";
      var passApiInformation = await this.$refs.refAjaxAPI.ajaxGetMethodPromise(
        apiUrl,
        mode
      );
      this.dictHealthSafety["numberPeopleCareOf"] =
        passApiInformation["healthSafetyStatus"]["NumberPeopleCareOf"];
      this.dictHealthSafety["girlProtection"] =
        passApiInformation["healthSafetyStatus"]["GirlProtection"];
      this.dictHealthSafety["healthPromotion"] =
        passApiInformation["healthSafetyStatus"]["HealthPromotion"];
      this.dictHealthSafety["specialWork"] =
        passApiInformation["healthSafetyStatus"]["SpecialWork"];
    },

    // 從API取得工安資訊(M to M-5)
    async getWorkSafeValue() {
      var apiUrl = apiServices.getWorkSafeDataFromExcelURL;
      var mode = "WorkerSafety";
      var passParameterToApiModel = { MODE: "M5" };
      var passApiInformation =
        await this.$refs.refAjaxAPI.ajaxPostMethodPromise(
          apiUrl,
          mode,
          passParameterToApiModel
        );
      this.dictWorkerSafety["lifeClause"] =
        passApiInformation["workerSafety"]["lifeClause"];
      this.dictWorkerSafety["unsafeEnvironment"] =
        passApiInformation["workerSafety"]["unsafeEnvironment"];
      this.dictWorkerSafety["unsafeBehavior"] =
        passApiInformation["workerSafety"]["unsafeBehavior"];
      //this.dictWorkerSafety['occupationalDisaster'] = passApiInformation['workerSafety']['occupationalDisaster']
    },

    // 從API取得工安職能災害(年度+六個月內)
    async getOccupationalDisaster() {
      var apiUrl = apiServices.getOccupationalDisasterFromExcelURL;
      var mode = "OccupationalDisaster";
      var passApiInformation = await this.$refs.refAjaxAPI.ajaxGetMethodPromise(
        apiUrl,
        mode
      );

      this.dictWorkerSafety["occupationalDisaster"] =
        passApiInformation["occupationalDisaster"];
    },

    // 從API取得無工安事故的天數
    async getWorkSafeHappendDay() {
      var apiUrl = apiServices.workSafeHappendDaysURL;
      var mode = "Get worksafe happend days";
      var passApiInformation = await this.$refs.refAjaxAPI.ajaxGetMethodPromise(
        apiUrl,
        mode
      );
      this.okDays = passApiInformation["diffDay"];
    },

    // 從API取得本月累積的交通意外件數
    async getTrafficAccidentCount() {
      var apiUrl = apiServices.getTrafficAccidentCountURL;
      var mode = "Get traffic accident days";
      var passApiInformation = await this.$refs.refAjaxAPI.ajaxGetMethodPromise(
        apiUrl,
        mode
      );
      this.trafficNgDays = passApiInformation["trafficAccidentCount"];
    },
  },
};
</script>

<template>
  <AjaxAPI ref="refAjaxAPI"></AjaxAPI>
  <Navigation />
  <div class="dashboard-wrapper">
    <div>
      <secondView
        ref="refSecondView"
        :dictEnvironmentalFriendly="dictEnvironmentalFriendly"
        :dictHealthSafety="dictHealthSafety"
        :dictWorkerSafety="dictWorkerSafety"
        :okDays="okDays"
      >
      </secondView>
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
