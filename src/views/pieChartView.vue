<script>

    import Chart from 'chart.js/auto';
    import smallPieChart from '../components/PieChart.vue'
    import showWorkSafeMenu from './showWorkSafeMenu.vue';
    import showWorkSafeMenuDetail from '@/views/showWorkSafeMenuDetail.vue'
    import showOccupationalDisasterMenu from './showOccupationalDisasterMenu.vue';
    import showOccupationalDisasterMenuDetail from './showOccupationalDisasterMenuDetail.vue';

    import userLogin from '@/views/userLogin.vue' 
    import AjaxAPI from '../components/AjaxAPI.vue';
    import apiServices from '../services/apiServices';

    export default{
        name: 'pieChartView',
        components: {
            smallPieChart,
            showWorkSafeMenu,
            showWorkSafeMenuDetail,
            showOccupationalDisasterMenu,
            showOccupationalDisasterMenuDetail,
            userLogin,
            AjaxAPI,
        },
        mounted(){

            // 宣告左邊HSD圓餅圖
            const canvas = this.$refs.pieChart;
            canvas.style.width = '600px';
            canvas.style.height = '600px';

            // 建立左邊HSD圓餅圖
            this.createHSDPieChart();

            // 目前模式
            this.modeCh = this.dictModeEn2Ch[this.mode]
        },
        data(){
            return {
                tableData: [
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                ],
                arrayColNames: ['M', 'M-1', 'M-2', 'M-3', 'M-4', 'M-5'],
                arrayRowNames: ['Array', 'CF', 'Cell', 'MDL', 'FAC', 'CIM', 'DQ', 'DR', 'SL', 'AD'],

                modeCh: '',
                dictModeEn2Ch : {'HealthSafety': '衛生', 'WorkerSafety': '工安'},

                workSafeMenu: [],
                occupationalDisasterMenu: [],
                modeMenu: '',

                selectMode: '',
                selectMonth: '',
                selectFactory: '',
                showMenu: false,

                DOCSEQNO: '',
                docDetail: '',
                btnShowMenuDetail: false,

                btnLoginStatus: '',

            }
        },
        props: ['modeOfPieChart', 'mode', 'colorBar', 'dicLightColor'],
        methods:{

            // 取得違規者詳細資訊
            async getWorkSafeMenuDetail(){

                var apiUrl = apiServices.workSafeMenuDetailURL
                var mode = 'getWorkSafeMenuDetail'
                var passParameterToApiModel = {'DOCNAME': this.DOCSEQNO}

                var passApiInformation = await this.$refs.refAjaxAPI.ajaxPostMethodPromise(apiUrl, mode, passParameterToApiModel)

                if (passApiInformation['statusCode'] == 200){
                    this.docDetail = passApiInformation['docDetail']
                }                                            

            },
            async getOccupationalDisasterMenuDetail(){

                var apiUrl = apiServices.occupationalDisasterMenuDetailURL
                var mode = 'occupationalDisasterMenuDetailURL'
                var passParameterToApiModel = {'DOCNAME': this.DOCSEQNO}

                var passApiInformation = await this.$refs.refAjaxAPI.ajaxPostMethodPromise(apiUrl, mode, passParameterToApiModel)

                if (passApiInformation['statusCode'] == 200){
                    this.docDetail = passApiInformation['docDetail']
                }                                            

            },

            // 建立左邊HSD圓餅圖
            createHSDPieChart() {
                const ctx = this.$refs.pieChart.getContext('2d');

                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: this.modeOfPieChart,
                        datasets: [
                            {
                                data: [1, 1, 1, 1],
                                backgroundColor: [this.colorBar[1],  this.colorBar[2], this.colorBar[3], this.colorBar[0]]
                            }
                        ]
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            tooltip: {
                                enabled: false // 禁用默认的tooltip
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 1,
                        animation: {
                            onComplete: (animation) => {
                                var chartInstance = animation.chart;
                                var ctx = chartInstance.ctx;
                                ctx.font = 'bold 32px Arial';
                                ctx.fillStyle = '#ffffff';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                
                                const startAngle = Math.PI / 2;   // 90度，弧度表示
                                const endAngle = Math.PI;         // 180度，弧度表示
                                const middleAngle = (startAngle + endAngle) / 2;
                                const centerX = (chartInstance.chartArea.left + chartInstance.chartArea.right) / 2;
                                const centerY = (chartInstance.chartArea.top + chartInstance.chartArea.bottom) / 2;
                                const pieRadius = Math.min((chartInstance.chartArea.right - chartInstance.chartArea.left) / 2, (chartInstance.chartArea.bottom - chartInstance.chartArea.top) / 2);
                                const offset = 85

                                var centerLabel = this.modeOfPieChart[1]
                                var textX = centerX + pieRadius * Math.cos(middleAngle) + offset
                                var textY = centerY - pieRadius * Math.sin(middleAngle) + offset
                                ctx.fillText(centerLabel, textX, textY);
                                
                                var centerLabel = this.modeOfPieChart[0]
                                var textX = centerX - pieRadius * Math.cos(middleAngle) - offset
                                var textY = centerY - pieRadius * Math.sin(middleAngle) + offset
                                ctx.fillText(centerLabel, textX, textY);

                                var centerLabel = this.modeOfPieChart[3]
                                var textX = centerX - pieRadius * Math.cos(middleAngle) - offset
                                var textY = centerY + pieRadius * Math.sin(middleAngle) - offset
                                ctx.fillText(centerLabel, textX, textY);

                                var centerLabel = this.modeOfPieChart[2]
                                var textX = centerX + pieRadius * Math.cos(middleAngle) + offset
                                var textY = centerY + pieRadius * Math.sin(middleAngle) - offset
                                ctx.fillText(centerLabel, textX, textY);
                            }
                        },
                        onClick: function(event, elements) {
                            if (elements && elements.length > 0) {
                                var index = elements[0].index;
                            }
                        }
                    }
                });
            },

            // 監聽smallPieChart.vue的onTableDataFetched()
            onTableDataFetched(data) {
                this.modeMenu = data['mode']
                if (this.modeMenu == 'occupationalDisasterMenu'){
                    this.occupationalDisasterMenu = data['tableData']
                }
                else{
                    this.workSafeMenu = data['tableData']
                }
            },

            // 監聽smallPieChart.vue的onModeFetched()
            onModeFetched(data){
                this.selectMode = data['selectMode']
                this.selectMonth = data['month']
                this.selectFactory = data['factory']
                this.btnShowMenuDetail = data['showMenuDetail']

                var dictEn2Ch = {'M': '當月', 'M-1': '前一個月', 'M-2': '前兩個月',
                                'M-3': '前三個月', 'M-4': '前四個月', 'M-5': '前五個月'}
                this.selectMonth = dictEn2Ch[this.selectMonth]
                this.showMenu = true

            },

            // 監聽showWorkSafeMenu.vue的onModeFetched(), 並且傳送DOCSEQNO至後端API取得文件詳細資料
            onDataFetched(data){
                this.DOCSEQNO = data['DOCSEQNO']
                this.btnShowMenuDetail = data['showMenuDetail']

                if (this.modeMenu=='workSafeMenu'){
                    this.getWorkSafeMenuDetail()
                }
                else{
                    this.getOccupationalDisasterMenuDetail()
                }
            },

            // 監控使用者登入是否成功
            onLoginStatusaFetched(data){
                this.btnLoginStatus = data
                if (this.btnLoginStatus == false){
                    this.btnShowMenuDetail = false
                }
            }
        },


    }
</script>

<template>    

    <AjaxAPI ref="refAjaxAPI"></AjaxAPI>

    <div class="row">
        <div class="col-md-6 col-12">
            <br><br><br><br><br><br><br><br>
            <label class="myView-thirdPageLable">{{ modeCh }}</label>
            <br><br><br><br><br><br>
            <div>
                <canvas ref="pieChart"></canvas>
            </div>
        </div>
        <div class="col-md-6 col-12">
            <div class="myShowTable-wrapper">
                <br>
                <label class="myView-thirdPageLable">各廠{{modeCh}}風險燈號</label>
                <br><br>
                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th class="mySmallPieChartInTabel-title" v-for="colName in arrayColNames" :key="colName">{{ colName }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(factory, factoryIndex) in arrayRowNames" :key="factoryIndex">
                            <th class="mySmallPieChartInTabel-title">{{ factory }}</th>
                            <td v-for="(cell, colIndex) in tableData[factoryIndex]" :key="colIndex">
                                <div v-if="mode == 'HealthSafety'">
                                    <smallPieChart refs="refSmallPieChart"
                                        @tableDataFetched="onTableDataFetched"
                                        @modeFetched="onModeFetched"
                                        :valueUpperLeft="dicLightColor['numberPeopleCareOf'][arrayColNames[colIndex]][factory]"
                                        :valueUpperRight="dicLightColor['girlProtection'][arrayColNames[colIndex]][factory]"
                                        :valueBottomRight="dicLightColor['specialWork'][arrayColNames[colIndex]][factory]"
                                        :valueBottomLeft="dicLightColor['healthPromotion'][arrayColNames[colIndex]][factory]"
                                        :mode="mode"
                                        :month="arrayColNames[colIndex]"
                                        :factory="factory">
                                    </smallPieChart>
                                </div>
                                <div v-else>
                                    <smallPieChart refs="refSmallPieChart"
                                        @tableDataFetched="onTableDataFetched"
                                        @modeFetched="onModeFetched"
                                        :valueUpperLeft="dicLightColor['unsafeBehavior'][arrayColNames[colIndex]][factory+'-status']"
                                        :valueUpperRight="dicLightColor['lifeClause'][arrayColNames[colIndex]][factory+'-status']"
                                        :valueBottomRight="dicLightColor['occupationalDisaster'][arrayColNames[colIndex]][factory+'-status']"
                                        :valueBottomLeft="dicLightColor['unsafeEnvironment'][arrayColNames[colIndex]][factory+'-status']"
                                        :mode="mode"
                                        :month="arrayColNames[colIndex]"
                                        :factory="factory">
                                    </smallPieChart>
                                </div>       
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>   
        </div>
    </div>

    <br><br><br><br>
    <!----------------不安全環境清單------------------>
    <div v-if = "showMenu==true && workSafeMenu != '' && modeMenu=='workSafeMenu'">
        <showWorkSafeMenu refs="refsShowWorkSafeMenu"
            @dataFetched="onDataFetched"
            :selectFactory='selectFactory'
            :selectMonth='selectMonth'
            :selectMode='selectMode'
            :workSafeMenu='workSafeMenu'>
        </showWorkSafeMenu>
    </div>
    <!----------------職能災害清單------------------>
    <div v-if = "showMenu==true && occupationalDisasterMenu != '' && modeMenu=='occupationalDisasterMenu'">
        <showOccupationalDisasterMenu refs="refsShowOccupationalDisasterMenu"
            @dataFetched="onDataFetched"
            :selectFactory='selectFactory'
            :selectMonth='selectMonth'
            :selectMode='selectMode'
            :occupationalDisasterMenu='occupationalDisasterMenu'>
        </showOccupationalDisasterMenu>
    </div>

    <div v-if="btnShowMenuDetail==true">
        <div v-if="btnLoginStatus==false">
            <userLogin ref="refUserLogin"
                @loginStatusaFetched="onLoginStatusaFetched">
            </userLogin>
        </div>
        <div v-else>
            <!----------------不安全環境清單明細------------------>
            <showWorkSafeMenuDetail refs="refsShowWorkSafeMenuDetail" v-if="modeMenu=='workSafeMenu'"
                :docDetail="docDetail">
            </showWorkSafeMenuDetail>

            <!----------------職能災害清單明細------------------>
            <showOccupationalDisasterMenuDetail refs="refsShowOccupationalDisasterMenuDetail" v-if="modeMenu=='occupationalDisasterMenu'"
                :docDetail="docDetail">
            </showOccupationalDisasterMenuDetail>
        </div>
    </div>
    
</template>



<style>

    @import '@/assets/myView.css';

</style>

