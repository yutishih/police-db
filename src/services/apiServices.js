
const domain = 'http://127.0.0.1:8082'
//const domain = 'http://ehs.hannstar.com'

export default {

    // excelContent.vue 連線至 python splite 資料庫
    sendDbValueURL: domain+'/policeDashboard/v1/sendDbValue',
    dbMethodApiURL: domain+'/policeDashboard/v1/dbMethod',

    // firstView.vue 取得環保/工安/衛生的資訊
    getHealthSafetyDataFromDbURL: domain+'/policeDashboard/v1/getHealthSafetyDataFromDb',
    getEnvironmentalFriendlyDataFromDbURL: domain+'/policeDashboard/v1/getEnvironmentalFriendlyDataFromDb',
    getWorkSafeDataFromExcelURL: domain+'/policeDashboard/v1/getWorkSafeDataFromExcel',
    getOccupationalDisasterFromExcelURL: domain+'/policeDashboard/v1/getOccupationalDisasterFromExcel',

    // firstView.vue 取得無工安意外/交通意外件數的醫訊
    workSafeHappendDaysURL: domain+'/policeDashboard/v1/getWorkSafedHappendDays',
    getTrafficAccidentCountURL: domain+'/policeDashboard/v1/getTrafficAccidentCount',

    // pieChartView.vue 取得違規者清單
    workSafeMenuURL: domain+'/policeDashboard/v1/workSafeMenu',
    workSafeMenuDetailURL: domain+'/policeDashboard/v1/getWorkSafeMenuDetail',
    occupationalDisasterMenuURL: domain+'/policeDashboard/v1/getOccupationalDisasterMenu',
    occupationalDisasterMenuDetailURL: domain+'/policeDashboard/v1/getOccupationalDisasterMenuDetail',

    // 更新工安excel
    updateExcelFromOracleURL: domain+'/policeDashboard/v1/updateExcelFromOracle',

    // 更新環境折線圖
    updateEnvironmentalLinePieURL: domain+'/policeDashboard/v1/updateEnvironmentalLinePie',

    // 使用者登入
    userloginURL: domain+'/policeDashboard/v1/userLogin',

    //限度邏輯
    getLimitLogicVersionURL: domain+'/policeDashboard/v1/getLimitLogicVersion',

};