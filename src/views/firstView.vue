<script>
    import {dictItemEn2ch, airPollutionPath, waterPollutionPath, poisonPath, industrialWastePath} from '../constants/constants.js'
    import apiServices from '../services/apiServices';
    import AjaxAPI from '../components/AjaxAPI.vue';


    export default{
        name: 'firstView',
        components:{
            AjaxAPI,
        },
        mounted(){
            this.getEnvironmentalFriendlyValue()
            this.getHealthSafetyValue()
            this.getWorkSafeValue()
            this.getOccupationalDisaster()
            this.getWorkSafeHappendDay()
            this.getTrafficAccidentCount()
        },
        data(){
            return {

                //----------導覽Bar按鈕狀態-------------------------------
                okDays: '',
                trafficNgDays: '',

                //-------------------環保------------------------------------
                dictEnvironmentalFriendly: {'airPollution': {'finalStatus': 'Ok', 'ImgName': airPollutionPath},
                                            'waterPollution': {'finalStatus': 'Ok', 'ImgName': waterPollutionPath},
                                            'poison': {'finalStatus': 'Ok', 'ImgName': poisonPath},
                                            'industrialWaste': {'finalStatus': 'Ok', 'ImgName': industrialWastePath}},
                //-------------------工安----------------------------------
                dictWorkerSafety: {'lifeClause': {'M': '', 'M-1': '', 'M-2': '', 'M-3': '','M-4': '','M-5': ''},
                                    'unsafeEnvironment':  {'M': '', 'M-1': '', 'M-2': '', 'M-3': '','M-4': '','M-5': ''},
                                    'unsafeBehavior': {'M': '', 'M-1': '', 'M-2': '', 'M-3': '','M-4': '','M-5': ''},
                                    'occupationalDisaster': {'thisYear': '', 'M': '', 'M-1': '', 'M-2': '', 'M-3': '','M-4': '','M-5': ''},
                },

                //-------------------衛生------------------------------------
                dictHealthSafety: {'numberPeopleCareOf': {'M': '', 'M-1': '', 'M-2': '', 'M-3': '','M-4': '','M-5': '', 'ComePerson': {'Array': '', 'CF': '', 'Cell': '', 'MDL': '', 'FAC': ''}},
                                    'girlProtection': {'M': '', 'M-1': '', 'M-2': '', 'M-3': '','M-4': '','M-5': '', 'ComePerson': {'Array': '', 'CF': '', 'Cell': '', 'MDL': '', 'FAC': ''}},
                                    'healthPromotion': {'M': '', 'M-1': '', 'M-2': '', 'M-3': '','M-4': '','M-5': '', 'ComePerson': {'Array': '', 'CF': '', 'Cell': '', 'MDL': '', 'FAC': ''}},
                                    'specialWork': {'M': '', 'M-1': '', 'M-2': '', 'M-3': '','M-4': '','M-5': '', 'ComePerson': {'Array': '', 'CF': '', 'Cell': '', 'MDL': '', 'FAC': ''}},
                },

                // 從constants.js 引用的參數
                dictItemEn2ch,
                airPollutionPath,
                waterPollutionPath,
                poisonPath, 
                industrialWastePath, 

            }
        },
        methods:{

            // 燈號
            getStatusClass: function(value) {
                // 環保 + 衛生
                if (value == '綠'){
                    return 'status-dot status-dot-green';
                }
                else if (value == '黃'){
                    return 'status-dot status-dot-yellow';
                }
                else if (value == '紅'){
                    return 'status-dot status-dot-red';
                }   
            },

            // 從API取得環保資訊
            async getEnvironmentalFriendlyValue(){
                //var apiUrl = apiServices.environmentalFriendlyApiUrl
                var apiUrl = apiServices.getEnvironmentalFriendlyDataFromDbURL
                var mode = 'environmentalFriendly'
                var passApiInformation = await this.$refs.refAjaxAPI.ajaxGetMethodPromise(apiUrl, mode)

                if (passApiInformation['statusCode'] == 200){
                    this.dictEnvironmentalFriendly['airPollution']['finalStatus'] = passApiInformation['environmentalFriendlyStatus']['AirPollution']
                    this.dictEnvironmentalFriendly['waterPollution']['finalStatus'] = passApiInformation['environmentalFriendlyStatus']['WaterPollution']
                    this.dictEnvironmentalFriendly['poison']['finalStatus'] = passApiInformation['environmentalFriendlyStatus']['Poison']
                    this.dictEnvironmentalFriendly['industrialWaste']['finalStatus'] = passApiInformation['environmentalFriendlyStatus']['IndustrialWaste']
                }
            },

            // 從API取得衛生資訊(M to M-5)
            async getHealthSafetyValue(){

                //var apiUrl = apiServices.healthSafetyApiUrl
                var apiUrl = apiServices.getHealthSafetyDataFromDbURL
                var mode = 'HealthSafety'
                var passApiInformation = await this.$refs.refAjaxAPI.ajaxGetMethodPromise(apiUrl, mode)
                this.dictHealthSafety['numberPeopleCareOf'] = passApiInformation['healthSafetyStatus']['NumberPeopleCareOf']
                this.dictHealthSafety['girlProtection'] = passApiInformation['healthSafetyStatus']['GirlProtection']
                this.dictHealthSafety['healthPromotion'] = passApiInformation['healthSafetyStatus']['HealthPromotion']
                this.dictHealthSafety['specialWork'] = passApiInformation['healthSafetyStatus']['SpecialWork']
            },
   
            // 從API取得工安資訊(M to M-5)
            async getWorkSafeValue(){
                var apiUrl = apiServices.getWorkSafeDataFromExcelURL
                var mode = 'WorkerSafety'
                var passParameterToApiModel = {'MODE': 'M5'}
                var passApiInformation = await this.$refs.refAjaxAPI.ajaxPostMethodPromise(apiUrl, mode, passParameterToApiModel)
                this.dictWorkerSafety['lifeClause'] = passApiInformation['workerSafety']['lifeClause']
                this.dictWorkerSafety['unsafeEnvironment'] = passApiInformation['workerSafety']['unsafeEnvironment']
                this.dictWorkerSafety['unsafeBehavior'] = passApiInformation['workerSafety']['unsafeBehavior']
                //this.dictWorkerSafety['occupationalDisaster'] = passApiInformation['workerSafety']['occupationalDisaster']
            },

            // 從API取得工安職能災害(年度+六個月內)
            async getOccupationalDisaster(){
                var apiUrl = apiServices.getOccupationalDisasterFromExcelURL
                var mode = 'OccupationalDisaster'
                var passApiInformation = await this.$refs.refAjaxAPI.ajaxGetMethodPromise(apiUrl, mode)

                this.dictWorkerSafety['occupationalDisaster'] = passApiInformation['occupationalDisaster']
            },
            

            // 從API取得無工安事故的天數
            async getWorkSafeHappendDay(){
                var apiUrl = apiServices.workSafeHappendDaysURL
                var mode = 'Get worksafe happend days'
                var passApiInformation = await this.$refs.refAjaxAPI.ajaxGetMethodPromise(apiUrl, mode)
                this.okDays = passApiInformation['diffDay']
            },

            // 從API取得本月累積的交通意外件數
            async getTrafficAccidentCount(){
                var apiUrl = apiServices.getTrafficAccidentCountURL
                var mode = 'Get traffic accident days'
                var passApiInformation = await this.$refs.refAjaxAPI.ajaxGetMethodPromise(apiUrl, mode)
                this.trafficNgDays = passApiInformation['trafficAccidentCount']
            },

        },


    }
</script>

<template>    
    <div>
        <AjaxAPI ref="refAjaxAPI"></AjaxAPI>

        <div class="row justify-content-center">
            <div class="first-title">公共安全數位儀表板</div>
        </div>

        <div class="row justify-content-center">
            <div class="second-title ">&nbsp;南科廠&nbsp;&nbsp;累計<span class="gray-background">&nbsp;{{okDays}}&nbsp;</span>天&nbsp;&nbsp;無工安事故</div>
        </div>
        <br>

        <div class="row justify-content-center">
            <div class="second-title">&nbsp;南科廠&nbsp;&nbsp;本月累積交通意外件數&nbsp;<span class="gray-background">&nbsp;{{trafficNgDays}}&nbsp;</span></div>
        </div>
        <br><br>
        
        <div class="row justify-content-center block-wrapper-flex">
            <!----環保---->
            <div class="col col-split-one-third">
                <div class="container-fluid">
                    <label class="third-title rounded-box">環保</label>
                    <table style="width: 100%;">
                        <thead>
                            <tr>
                                <th class="col-4" ></th>
                                <th class="col-8">
                                    <th class="col fourth-title">南科環保曲線圖</th>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="key in Object.keys(dictEnvironmentalFriendly)">
                                <td class="col-4 td-style">
                                    <div style="display: flex; align-items: center;">
                                        <label class="item-title item-rounded-box">{{ dictItemEn2ch[key] }}</label>
                                    </div>
                                </td>
                                <td class="col-8">
                                    <div style="display: flex; align-items: center;">
                                        <div class="col">
                                            <span :class="getStatusClass(dictEnvironmentalFriendly[key]['finalStatus'])"></span>
                                        </div>
                                        <div class="col-10">
                                            <img :src="require('@/assets/' + dictEnvironmentalFriendly[key]['ImgName'])" style="height: 100px ;width: 100%">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!----工安---->
            <div class="col col-split-one-third">
                <div class="container-fluid">
                    <label class="third-title rounded-box">工安</label>
                    <table style="width: 100%;">
                        <thead>
                            <tr>
                                <th class="col-4"></th>
                                <th class="col-2 fourth-title">Array</th>
                                <th class="col-2 fourth-title">CF</th>
                                <th class="col-2 fourth-title">Cell</th>
                                <th class="col-2 fourth-title">MDL</th>
                                <th class="col-2 fourth-title">FAC</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="key in Object.keys(dictWorkerSafety)">
                                <td class="col-4 td-style">
                                    <label class="item-title item-rounded-box">{{ dictItemEn2ch[key] }}</label>
                                </td>
                                <template  v-if="key!='occupationalDisaster'">
                                    <td class="col-2 item-value"><span :class="getStatusClass(dictWorkerSafety[key]['M']['Array-status'])">{{ dictWorkerSafety[key]['M']['Array'] }}</span></td>
                                    <td class="col-2 item-value"><span :class="getStatusClass(dictWorkerSafety[key]['M']['CF-status'])">{{ dictWorkerSafety[key]['M']['CF'] }}</span></td>
                                    <td class="col-2 item-value"><span :class="getStatusClass(dictWorkerSafety[key]['M']['Cell-status'])">{{ dictWorkerSafety[key]['M']['Cell'] }}</span></td>
                                    <td class="col-2 item-value"><span :class="getStatusClass(dictWorkerSafety[key]['M']['MDL-status'])">{{ dictWorkerSafety[key]['M']['MDL'] }}</span></td>
                                    <td class="col-2 item-value"><span :class="getStatusClass(dictWorkerSafety[key]['M']['FAC-status'])">{{ dictWorkerSafety[key]['M']['FAC'] }}</span></td>
                                </template >
                                <template  v-else>
                                    <td class="col-2 item-value"><span :class="getStatusClass(dictWorkerSafety[key]['thisYear']['Array-status'])">{{ dictWorkerSafety[key]['thisYear']['Array'] }}</span></td>
                                    <td class="col-2 item-value"><span :class="getStatusClass(dictWorkerSafety[key]['thisYear']['CF-status'])">{{ dictWorkerSafety[key]['thisYear']['CF'] }}</span></td>
                                    <td class="col-2 item-value"><span :class="getStatusClass(dictWorkerSafety[key]['thisYear']['Cell-status'])">{{ dictWorkerSafety[key]['thisYear']['Cell'] }}</span></td>
                                    <td class="col-2 item-value"><span :class="getStatusClass(dictWorkerSafety[key]['thisYear']['MDL-status'])">{{ dictWorkerSafety[key]['thisYear']['MDL'] }}</span></td>
                                    <td class="col-2 item-value"><span :class="getStatusClass(dictWorkerSafety[key]['thisYear']['FAC-status'])">{{ dictWorkerSafety[key]['thisYear']['FAC'] }}</span></td>
                                </template >
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!----衛生---->
            <div class="col col-split-one-third">
                <div class="container-fluid">
                    <label class="third-title rounded-box">衛生</label>
                    <table style="width: 100%;">
                        <thead>
                            <tr>
                                <th class="col-4"></th>
                                <th class="col-2 fourth-title">Array</th>
                                <th class="col-2 fourth-title">CF</th>
                                <th class="col-2 fourth-title">Cell</th>
                                <th class="col-2 fourth-title">MDL</th>
                                <th class="col-2 fourth-title">FAC</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="key in Object.keys(dictHealthSafety)">
                                <td class="col-4 td-style" >
                                    <label class="item-title item-rounded-box">{{ dictItemEn2ch[key] }}</label>
                                </td>
                                <td class="col-2 item-value"><span :class="getStatusClass(dictHealthSafety[key]['M']['Array'])">{{ dictHealthSafety[key]['ComePerson']['Array'] }}</span></td>
                                <td class="col-2 item-value"><span :class="getStatusClass(dictHealthSafety[key]['M']['CF'])">{{ dictHealthSafety[key]['ComePerson']['CF'] }}</span></td>
                                <td class="col-2 item-value"><span :class="getStatusClass(dictHealthSafety[key]['M']['Cell'])">{{ dictHealthSafety[key]['ComePerson']['Cell'] }}</span></td>
                                <td class="col-2 item-value"><span :class="getStatusClass(dictHealthSafety[key]['M']['MDL'])">{{ dictHealthSafety[key]['ComePerson']['MDL'] }}</span></td>
                                <td class="col-2 item-value"><span :class="getStatusClass(dictHealthSafety[key]['M']['FAC'])">{{ dictHealthSafety[key]['ComePerson']['FAC'] }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
</template>

<style>

    .col-split-one-third{
        width: 30%;
    }


    :root {
        --success-color: rgb(0, 176, 80);
        --warning-color: rgb(255, 255, 0);
        --danger-color: rgb(255, 0, 0);
    }

    .status-dot {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .status-dot-green {
        background-color: var(--success-color);
    }

    .status-dot-yellow {
        background-color: var(--warning-color);
    }

    .status-dot-red {
        background-color: var(--danger-color);
    }

    .td-style{
        height: 150px
    }

    .item-title{
        font-family: 'Microsoft JhengHei';
        font-size: 32px ;
        color: rgb(255, 255, 255); 
        text-align: center;
    }

    .item-value{
        font-family: 'arial';
        font-size: 36px ;
        color: rgb(0, 0, 0); 
    }

    .item-rounded-box {
        background-color: rgb(23, 107, 116); 
        width: 90%;
        height: 50%;
        border-radius: 30px;
        padding: 10px;
        display: flex; 
        align-items: center;
        justify-content: center; 
    }

    .first-title {
        font-family: 'Microsoft JhengHei';
        font-weight: bold;
        color: rgb(15, 74, 169);
        font-size: 60px ;
        text-align: center;
    }
    .second-title {
        font-family: 'Microsoft JhengHei';
        font-weight: bold;
        color: rgb(11, 55, 127);
        font-size: 48px ;

    }

    .third-title{
        font-family: 'Microsoft JhengHei';
        font-size: 48px ;
        color: rgb(255, 255, 255); 
        text-align: center;
    }

    .fourth-title{
        font-family: 'Microsoft JhengHei';
        font-size: 24px ;
        color: rgb(134, 16, 157); 
        font-weight: bold;
    }

    .gray-background{
        background-color: rgb(242, 242, 242); 
    }

    .rounded-box {
        background-color: rgb(0, 176, 240); 
        width: 100%;
        border-radius: 30px;
        padding: 10px;
        display: inline-block;
    }

    @media (max-width: 768px) {
        .col-split-one-third{
            width: 100%;
        }
        .item-title{
            font-size: 18px;
        }
        .status-dot {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .fourth-title{
            font-family: 'Microsoft JhengHei';
            font-size: 16px ;
            color: rgb(134, 16, 157); 
            font-weight: bold;
        }
        .item-title{
            font-family: 'Microsoft JhengHei';
            font-size: 16px ;
            color: rgb(255, 255, 255); 
            text-align: center;
        }
        .item-value{
            font-family: 'arial';
            font-size: 16px ;
            color: rgb(0, 0, 0); 
        }
        .td-style{
            height: 280px
        }
        .third-title{
            font-family: 'Microsoft JhengHei';
            font-size: 32px ;
            color: rgb(255, 255, 255); 
            text-align: center;
        } 
        .first-title {
            font-family: 'Microsoft JhengHei';
            font-weight: bold;
            color: rgb(15, 74, 169);
            font-size: 30px ;
            text-align: center;
        }
        .second-title {
            font-family: 'Microsoft JhengHei';
            font-weight: bold;
            color: rgb(11, 55, 127);
            font-size: 24px ;

        }
    }
    @media (max-width: 2400px) {
        .item-title{
            font-size: 24px;
        }
    }
    @media (max-width: 1980px) {
        .item-title{
            font-size: 18px;
        }
        .fourth-title {
            font-size: 20px;
        }
    }
    @media (min-width: 3000px) {
        .status-dot {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .fourth-title{
            font-family: 'Microsoft JhengHei';
            font-size: 48px;
            color: rgb(134, 16, 157); 
            font-weight: bold;
        }
        .item-title{
            font-family: 'Microsoft JhengHei';
            font-size: 48px ;
            color: rgb(255, 255, 255); 
            text-align: center;
        }
        .item-value{
            font-family: 'arial';
            font-size: 48px ;
            color: rgb(0, 0, 0); 
        }
        .td-style{
            height: 225px
        }
        .third-title{
            font-family: 'Microsoft JhengHei';
            font-size: 72px ;
            color: rgb(255, 255, 255); 
            text-align: center;
        } 
        .first-title {
            font-family: 'Microsoft JhengHei';
            font-weight: bold;
            color: rgb(15, 74, 169);
            font-size: 90px ;
            text-align: center;
        }
        .second-title {
            font-family: 'Microsoft JhengHei';
            font-weight: bold;
            color: rgb(11, 55, 127);
            font-size: 72px ;

        }
    }

    @media (min-width: 4000px) {
        .status-dot {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .fourth-title{
            font-family: 'Microsoft JhengHei';
            font-size: 64px ;
            color: rgb(134, 16, 157); 
            font-weight: bold;
        }
        .item-title{
            font-family: 'Microsoft JhengHei';
            font-size: 72px ;
            color: rgb(255, 255, 255); 
            text-align: center;
        }
        .item-value{
            font-family: 'arial';
            font-size: 72px ;
            color: rgb(0, 0, 0); 
        }
        .td-style{
            height: 300px
        }
        .third-title{
            font-family: 'Microsoft JhengHei';
            font-size: 96px ;
            color: rgb(255, 255, 255); 
            text-align: center;
        } 
        .first-title {
            font-family: 'Microsoft JhengHei';
            font-weight: bold;
            color: rgb(15, 74, 169);
            font-size: 120px ;
            text-align: center;
        }
        .second-title {
            font-family: 'Microsoft JhengHei';
            font-weight: bold;
            color: rgb(11, 55, 127);
            font-size: 96px ;

        }
    }

    @media (min-width: 7000px) {
        .status-dot {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .fourth-title{
            font-family: 'Microsoft JhengHei';
            font-size: 96px ;
            color: rgb(134, 16, 157); 
            font-weight: bold;
        }
        .item-title{
            font-family: 'Microsoft JhengHei';
            font-size: 108px ;
            color: rgb(255, 255, 255); 
            text-align: center;
        }
        .item-value{
            font-family: 'arial';
            font-size: 108px ;
            color: rgb(0, 0, 0); 
        }
        .td-style{
            height: 400px
        }
        .third-title{
            font-family: 'Microsoft JhengHei';
            font-size: 144px ;
            color: rgb(255, 255, 255); 
            text-align: center;
        } 
        .first-title {
            font-family: 'Microsoft JhengHei';
            font-weight: bold;
            color: rgb(15, 74, 169);
            font-size: 180px ;
            text-align: center;
        }
        .second-title {
            font-family: 'Microsoft JhengHei';
            font-weight: bold;
            color: rgb(11, 55, 127);
            font-size: 144px ;

        }
    }

</style>

