<script>
//graphs
import Chart from "chart.js/auto";
import pieChartView from "./pieChartView.vue";
import lineChartView from "./lineChartView.vue";
import importExcel from "./importExcel.vue";
import MidPieChart from "@/components/MidPieChart.vue";
import watchScreenSize from "@/components/watchScreenSize.vue";
import userLogin from "@/views/userLogin.vue";
import {
  dictLight2Color,
  colorOrange,
  colorGreen,
  colorRed,
} from "../constants/constants.js";

export default {
  name: "secondView",
  components: {
    //--graphs--
    pieChartView,
    lineChartView,
    MidPieChart,
    importExcel,
    userLogin,
    watchScreenSize,
  },
  mounted() {
    this.showHSDPieChart();
    this.paramsView = this.$route.query.params;

    if (this.paramsView === "0") {
      this.modeOfPieChart = [
        "保命條款",
        "不安全行為",
        "不安全環境",
        "職災失能",
      ];
      this.mode = "WorkerSafety";
      this.btnClickMode = true;
    } else if (this.paramsView === "1") {
      this.modeOfPieChart = ["水汙染", "空汙", "事業廢棄物", "毒化物"];
      this.mode = "EnvironmentalFriendly";
      this.btnClickMode = true;
    } else if (this.paramsView === "2") {
      this.modeOfPieChart = ["母性保護", "關懷率", "健康促進", "職業病預防"];
      this.mode = "HealthSafety";
      this.btnClickMode = true;
    }
  },
  props: [
    "dictHealthSafety",
    "dictEnvironmentalFriendly",
    "dictWorkerSafety",
    "okDays",
  ],
  watch: {
    $route(to, from) {
      this.paramsView = to.query.params;
      if (!this.paramsView) {
        // 當params參數不存在時的操作
        this.btnClickMode = false;
      } else if (this.paramsView === "0") {
        this.modeOfPieChart = [
          "保命條款",
          "不安全行為",
          "不安全環境",
          "職災失能",
        ];
        this.mode = "WorkerSafety";
        this.btnClickMode = true;
      } else if (this.paramsView === "1") {
        this.modeOfPieChart = ["水汙染", "空汙", "事業廢棄物", "毒化物"];
        this.mode = "EnvironmentalFriendly";
        this.btnClickMode = true;
      } else if (this.paramsView === "2") {
        this.modeOfPieChart = ["母性保護", "關懷率", "健康促進", "職業病預防"];
        this.mode = "HealthSafety";
        this.btnClickMode = true;
      }
    },
    btnChange2importExcel(newValue, oldValue) {
      if (newValue != oldValue) {
        this.showHSDPieChart();
      }
    },
    // 螢幕尺寸改變時刷新HSD圓餅圖
    screenWidth(newValue, oldValue) {
      if (newValue != oldValue) {
        this.showHSDPieChart();
      }
    },
  },
  data() {
    return {
      //Params
      paramsView: null,
      // 判斷HSD圓餅圖有無被點選
      btnClickMode: false,

      // 圓餅圖內容
      modeOfPieChart: "",

      // 模式 HealthSafety / WorkerSafety / EnvironmentalFriendly
      mode: "",

      // 工安參數, 陣列儲存順序 = [左上, 右上, 右下, 左下]
      colorUpperLeftWorkerSafety: "",
      colorUpperRightWorkerSafety: "",
      colorBottomRightWorkerSafety: "",
      colorBottomLeftWorkerSafety: "",
      colorBarWorkerSafety: [],

      // 環保參數, 陣列儲存順序 = [左上, 右上, 右下, 左下]
      colorUpperLeftEnvironmentalFriendly: "",
      colorUpperRightEnvironmentalFriendly: "",
      colorBottomRightEnvironmentalFriendly: "",
      colorBottomLeftEnvironmentalFriendly: "",
      colorBarEnvironmentalFriendly: [],

      // 衛生參數, 陣列儲存順序 = [左上, 右上, 右下, 左下]
      colorUpperLeftHealthSafety: "",
      colorUpperRightHealthSafety: "",
      colorBottomLeftHealthSafety: "",
      colorBottomRightHealthSafety: "",
      colorBarHealthSafety: [],

      // HSD三個顏色預設為綠色
      colorHsdLeft: colorGreen,
      colorHsdRight: colorGreen,
      colorHsdBottom: colorGreen,

      // 切換到修改資料庫模式
      btnChange2importExcel: false,

      // 從constants.js 引用的參數
      dictLight2Color,
      colorOrange,
      colorGreen,
      colorRed,

      // 登入狀態
      btnLoginStatus: false,

      screenWidth: 0,
      screenHeight: 0,
    };
  },
  methods: {
    // 顯示上面HSD圓餅圖
    async showHSDPieChart() {
      await this.colorHealthSafety();
      await this.colorEnvironmentalFriendly();
      await this.colorWorkerSafety();
      const canvas = this.$refs.pieChart;
      canvas.style.width = "600px";
      canvas.style.height = "600px";
      this.createTopPieChart();
    },
    // 建立HSD圓餅圖
    createTopPieChart() {
      const ctx = this.$refs.pieChart.getContext("2d");
      var self = this;
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["工安", "健康衛生", "環境保護"],
          datasets: [
            {
              data: [1, 1, 1],
              backgroundColor: [
                this.colorHsdRight,
                this.colorHsdBottom,
                this.colorHsdLeft,
              ],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false, // 禁用默认的tooltip
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1,
          animation: {
            onComplete: function (animation) {
              var chartInstance = animation.chart;
              var ctx = chartInstance.ctx;
              ctx.font = "bold 32px Arial";
              ctx.fillStyle = "#ffffff";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";

              // 定义三等份的角度范围
              const anglePerSlice = (Math.PI * 2) / 3; // 120度，弧度表示

              // 获取饼图区域的中心点坐标和半径
              var centerX =
                (chartInstance.chartArea.left + chartInstance.chartArea.right) /
                2;
              var centerY =
                (chartInstance.chartArea.top + chartInstance.chartArea.bottom) /
                2;
              var pieRadius = Math.min(
                (chartInstance.chartArea.right - chartInstance.chartArea.left) /
                  2,
                (chartInstance.chartArea.bottom - chartInstance.chartArea.top) /
                  2
              );

              var sliceCenterAngle = 0 * anglePerSlice + anglePerSlice / 4;
              var textX = centerX + pieRadius * Math.cos(sliceCenterAngle) - 90;
              var textY = centerY - pieRadius * Math.sin(sliceCenterAngle) + 90;
              ctx.fillText("工安", textX, textY);

              var sliceCenterAngle = 1 * anglePerSlice + anglePerSlice / 4;
              var textX = centerX + pieRadius * Math.cos(sliceCenterAngle) + 90;
              var textY = centerY - pieRadius * Math.sin(sliceCenterAngle) + 90;
              ctx.fillText("健康衛生", textX, textY);

              var sliceCenterAngle = 2 * anglePerSlice + anglePerSlice / 4;
              var textX = centerX + pieRadius * Math.cos(sliceCenterAngle);
              var textY = centerY - pieRadius * Math.sin(sliceCenterAngle) - 90;
              ctx.fillText("環境保護", textX, textY);
            },
          },
          onClick: function (event, elements) {
            if (elements && elements.length > 0) {
              var index = elements[0].index;
              if (index === 0) {
                // 工安
                self.modeOfPieChart = [
                  "保命條款",
                  "不安全行為",
                  "不安全環境",
                  "職災失能",
                ];
                self.mode = "WorkerSafety";
                self.btnClickMode = true;
                self.paramsView = "0";
                self.$router.push({ query: { params: self.paramsView } });
              } else if (index === 1) {
                // 環保
                self.modeOfPieChart = [
                  "水汙染",
                  "空汙",
                  "事業廢棄物",
                  "毒化物",
                ];
                self.mode = "EnvironmentalFriendly";
                self.btnClickMode = true;
                self.paramsView = "1";
                self.$router.push({ query: { params: self.paramsView } });
              } else if (index === 2) {
                // 衛生
                self.modeOfPieChart = [
                  "母性保護",
                  "關懷率",
                  "健康促進",
                  "職業病預防",
                ];
                self.mode = "HealthSafety";
                self.btnClickMode = true;
                self.paramsView = "2";
                self.$router.push({ query: { params: self.paramsView } });
              }
            }
          },
        },
      });
    },

    // 決定上面HSD健康part的顏色 + 決定下面健康圓餅圖(4等分)的顏色
    colorHealthSafety() {
      return new Promise((resolve) => {
        this.colorUpperLeftHealthSafety =
          dictLight2Color[
            this.dictHealthSafety["numberPeopleCareOf"]["M-finalStatus"]
          ];
        this.colorUpperRightHealthSafety =
          dictLight2Color[
            this.dictHealthSafety["girlProtection"]["M-finalStatus"]
          ];
        this.colorBottomLeftHealthSafety =
          dictLight2Color[
            this.dictHealthSafety["healthPromotion"]["M-finalStatus"]
          ];
        this.colorBottomRightHealthSafety =
          dictLight2Color[
            this.dictHealthSafety["specialWork"]["M-finalStatus"]
          ];
        this.colorBarHealthSafety.push(this.colorUpperLeftHealthSafety);
        this.colorBarHealthSafety.push(this.colorUpperRightHealthSafety);
        this.colorBarHealthSafety.push(this.colorBottomRightHealthSafety);
        this.colorBarHealthSafety.push(this.colorBottomLeftHealthSafety);

        for (const key in this.dictHealthSafety) {
          if (this.dictHealthSafety[key]["M-finalStatus"] == "黃") {
            this.colorHsdLeft = colorOrange;
          }
        }

        resolve();
      });
    },

    // 決定上面HSD環境part的顏色 + 決定下面環境圓餅圖(4等分)的顏色
    colorEnvironmentalFriendly() {
      return new Promise((resolve) => {
        this.colorUpperLeftEnvironmentalFriendly =
          dictLight2Color[
            this.dictEnvironmentalFriendly["airPollution"]["finalStatus"]
          ];
        this.colorUpperRightEnvironmentalFriendly =
          dictLight2Color[
            this.dictEnvironmentalFriendly["waterPollution"]["finalStatus"]
          ];
        this.colorBottomRightEnvironmentalFriendly =
          dictLight2Color[
            this.dictEnvironmentalFriendly["poison"]["finalStatus"]
          ];
        this.colorBottomLeftEnvironmentalFriendly =
          dictLight2Color[
            this.dictEnvironmentalFriendly["industrialWaste"]["finalStatus"]
          ];
        this.colorBarEnvironmentalFriendly.push(
          this.colorUpperLeftEnvironmentalFriendly
        );
        this.colorBarEnvironmentalFriendly.push(
          this.colorUpperRightEnvironmentalFriendly
        );
        this.colorBarEnvironmentalFriendly.push(
          this.colorBottomRightEnvironmentalFriendly
        );
        this.colorBarEnvironmentalFriendly.push(
          this.colorBottomLeftEnvironmentalFriendly
        );

        for (const key in this.dictEnvironmentalFriendly) {
          if (
            this.dictEnvironmentalFriendly[key]["finalStatus"] == "黃" &&
            this.colorHsdBottom == colorGreen
          ) {
            this.colorHsdBottom = colorOrange;
          } else if (
            this.dictEnvironmentalFriendly[key]["finalStatus"] == "紅" &&
            (this.colorHsdBottom == colorGreen ||
              this.colorHsdBottom == colorOrange)
          ) {
            this.colorHsdBottom = colorRed;
          }
        }

        resolve();
      });
    },

    // 決定上面HSD工安part的顏色 + 決定下面工安圓餅圖(4等分)的顏色
    colorWorkerSafety() {
      return new Promise((resolve) => {
        this.colorUpperLeftWorkerSafety =
          dictLight2Color[
            this.dictWorkerSafety["lifeClause"]["M"]["finalStatus"]
          ];
        this.colorUpperRightWorkerSafety =
          dictLight2Color[
            this.dictWorkerSafety["unsafeBehavior"]["M"]["finalStatus"]
          ];
        this.colorBottomRightWorkerSafety =
          dictLight2Color[
            this.dictWorkerSafety["occupationalDisaster"]["thisYear"][
              "finalStatus"
            ]
          ];
        this.colorBottomLeftWorkerSafety =
          dictLight2Color[
            this.dictWorkerSafety["unsafeEnvironment"]["M"]["finalStatus"]
          ];
        this.colorBarWorkerSafety.push(this.colorUpperLeftWorkerSafety);
        this.colorBarWorkerSafety.push(this.colorUpperRightWorkerSafety);
        this.colorBarWorkerSafety.push(this.colorBottomRightWorkerSafety);
        this.colorBarWorkerSafety.push(this.colorBottomLeftWorkerSafety);

        for (const key in this.dictWorkerSafety) {
          if (
            this.dictWorkerSafety[key]["M"]["finalStatus"] == "黃" &&
            this.colorHsdRight == colorGreen
          ) {
            this.colorHsdRight = colorOrange;
          } else if (
            this.dictWorkerSafety[key]["M"]["finalStatus"] == "紅" &&
            (this.colorHsdRight == colorGreen ||
              this.colorHsdRight == colorOrange)
          ) {
            this.colorHsdRight = colorRed;
          }
        }

        resolve();
      });
    },

    // 切換至修改資料庫模式
    change2importExcel() {
      this.btnChange2importExcel = !this.btnChange2importExcel;
    },

    // 監控使用者登入是否成功
    onLoginStatusaFetched(data) {
      this.btnLoginStatus = data;
      if (this.btnLoginStatus == false) {
        this.btnChange2importExcel = false;
      }
    },
  },
};
</script>

<template>
  <div>
    <div v-if="btnChange2importExcel == false">
      <div v-if="btnClickMode == false">
        <div class="center-row">
          <!----環保---->
          <div class="text-center">
            <div class="section-title">
              <label
                style="
                  font-family: Microsoft JhengHei;
                  font-size: 36px;
                  text-align: center;
                  font-weight: bold;
                "
                >HSD公共安全指標</label
              >
            </div>
          </div>
        </div>

        <br />
        <div>
          <canvas ref="pieChart"></canvas>
        </div>
        <br />

        <div class="row justify-content-center">
          <div class="col-md-4">
            <div class="text-center">
              <div class="section-title">
                <label
                  style="
                    font-family: Microsoft JhengHei;
                    font-size: 36px;
                    text-align: center;
                  "
                  >衛生</label
                ><br /><br /><br />
              </div>
            </div>
            <MidPieChart
              refs="refsMidPieChart"
              :colorUpperRight="colorUpperRightHealthSafety"
              :colorBottomRight="colorBottomRightHealthSafety"
              :colorBottomLeft="colorBottomLeftHealthSafety"
              :colorUpperLeft="colorUpperLeftHealthSafety"
              :modeOfPieChart="['母性保護', '關懷率', '健康促進', '職業病預防']"
            >
            </MidPieChart>
            <!-- <<img :src="require('@/assets/healthPieChart.png')" style="width: 500px; height: 500px"> -->
          </div>
          <div class="col-md-4">
            <div class="text-center">
              <div class="section-title">
                <label
                  style="
                    font-family: Microsoft JhengHei;
                    font-size: 36px;
                    text-align: center;
                  "
                  >環保</label
                ><br /><br /><br />
              </div>
            </div>
            <MidPieChart
              refs="refsMidPieChart"
              :colorUpperRight="colorUpperRightEnvironmentalFriendly"
              :colorBottomRight="colorBottomRightEnvironmentalFriendly"
              :colorBottomLeft="colorBottomLeftEnvironmentalFriendly"
              :colorUpperLeft="colorUpperLeftEnvironmentalFriendly"
              :modeOfPieChart="['水汙染', '空汙', '事業廢棄物', '毒化物']"
            >
            </MidPieChart>
            <!------------<img :src="require('@/assets/environmentalPieChart.png')" style="width: 500px; height: 500px">-------------------->
          </div>
          <div class="col-md-4">
            <div class="text-center">
              <div class="section-title">
                <label
                  style="
                    font-family: Microsoft JhengHei;
                    font-size: 36px;
                    text-align: center;
                  "
                  >工安</label
                ><br /><br /><br />
              </div>
            </div>
            <MidPieChart
              refs="refsMidPieChart"
              :colorUpperRight="colorUpperRightWorkerSafety"
              :colorBottomRight="colorBottomRightWorkerSafety"
              :colorBottomLeft="colorBottomLeftWorkerSafety"
              :colorUpperLeft="colorUpperLeftWorkerSafety"
              :modeOfPieChart="[
                '保命條款',
                '不安全行為',
                '不安全環境',
                '職災失能',
              ]"
            >
            </MidPieChart>
          </div>
        </div>
      </div>

      <!-- <button
        type="button"
        class="btn-lg"
        v-bind:onclick="change2importExcel"
        style="opacity: 0"
      >
        匯入資料
      </button> -->

      <div v-if="btnClickMode == true">
        <div v-if="mode == 'HealthSafety'">
          <pieChartView
            refs="refspieChartView"
            :modeOfPieChart="modeOfPieChart"
            :mode="mode"
            :colorBar="colorBarHealthSafety"
            :dicLightColor="dictHealthSafety"
          >
          </pieChartView>
        </div>
        <div v-else-if="mode == 'WorkerSafety'">
          <pieChartView
            refs="refspieChartView"
            :modeOfPieChart="modeOfPieChart"
            :mode="mode"
            :colorBar="colorBarWorkerSafety"
            :dicLightColor="dictWorkerSafety"
          >
          </pieChartView>
        </div>
        <div v-else-if="mode == 'EnvironmentalFriendly'">
          <lineChartView
            refs="refsLineChartView"
            :modeOfPieChart="modeOfPieChart"
            :colorBar="colorBarEnvironmentalFriendly"
            :mode="mode"
          >
          </lineChartView>
        </div>
      </div>
    </div>

    <div v-if="btnChange2importExcel == true">
      <userLogin
        ref="refUserLogin"
        @loginStatusaFetched="onLoginStatusaFetched"
      >
      </userLogin>
      <div v-if="btnLoginStatus == true">
        <importExcel refs="refsImportExcel"></importExcel>
      </div>
    </div>
  </div>
</template>
