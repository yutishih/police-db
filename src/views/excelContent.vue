<script>

    import apiServices from '@/services/apiServices';
    import AjaxAPI from '@/components/AjaxAPI.vue';

    export default{
        name: 'importExcel',
        components: {
            AjaxAPI
        },
        mounted(){
            this.getExcelValue()
            this.getTitleColumn()
            this.getLimitLogicVersion()

        },
        computed: {
            tdStyle() {
                return this.btnSelectMode === '環保' ? {  } : { height: '100px' } ;
            }
        },
        data(){
            return {
                tableData: [],
                apiStatusCode: '',
                statusCode: '',
                information : '',
                arrayColumnNames: [],

                tableData: '',
                arrayFactorys: ['array', 'CF', 'Cell', 'MDL', 'FAC', 'CIM', 'DQ', 'DR', 'SL', 'AD', '其他', 
                                'array', 'CF', 'Cell', 'MDL', 'FAC', 'CIM', 'DQ', 'DR', 'SL', 'AD', '其他', 
                                'array', 'CF', 'Cell', 'MDL', 'FAC', 'CIM', 'DQ', 'DR', 'SL', 'AD', '其他', 
                                'array', 'CF', 'Cell', 'MDL', 'FAC', 'CIM', 'DQ', 'DR', 'SL', 'AD', '其他'],
                btnMode: '',
                
                arrayFactorysAdd: ['array1', 'CF1', 'Cell1', 'MDL1', 'FAC1', 'CIM1', 'DQ1', 'DR1', 'SL1', 'AD1', '其他1', 
                                    'array2', 'CF2', 'Cell2', 'MDL2', 'FAC2', 'CIM2', 'DQ2', 'DR2', 'SL2', 'AD2', '其他2'],
                dictFactorysAdd: {'array1': '', 'CF1': '', 'Cell1': '', 'MDL1': '', 'FAC1': '', 'CIM1': '', 'DQ1': '', 'DR1': '', 'SL1': '', 'AD1': '','其他1': '', 
                                    'array2': '', 'CF2': '', 'Cell2': '', 'MDL2': '', 'FAC2': '', 'CIM2':'', 'DQ2': '', 'DR2': '', 'SL2': '', 'AD2': '','其他2': ''},
                monthAdd: '',

                title: '',
                title1: '',
                title2: '',
                title3: '',

                btnShowEditData: false,
                btnShowDeleteData: false,
                btnShowAddData: false,
                btnShowSendData: true,
                btnShowCancelData: true,
                btnMode: '',

                arrayCheckIDs: [],
                arrayEditIDs: [],

                arrayEditRow: [],
                editIndex: '',

                versionTag: '邏輯版本',
                versionList: [],
                versionSelect: '',

            }
        },
        props: ['tableName', 'btnSelectMode'],
        methods:{
            async updateEnvironmentalLinePie(){
                var apiUrl = apiServices.updateEnvironmentalLinePieURL
                var mode = 'update Enviromental LinePie'
                var passApiInformation = await this.$refs.refAjaxAPI.ajaxGetMethodPromise(apiUrl, mode)

                this.statusCode = passApiInformation['statusCode']
                this.information = passApiInformation['information']
            },

            async getExcelValue(){
                var apiUrl = apiServices.sendDbValueURL
                var mode = 'sendExcelValue'
                var passParameterToApiModel = {'tableName': this.tableName}
                var passApiInformation = await this.$refs.refAjaxAPI.ajaxPostMethodPromise(apiUrl, mode, passParameterToApiModel)

                this.tableData = passApiInformation['excelValue']
                this.statusCode = passApiInformation['statusCode']
                this.information = passApiInformation['information']

                this.arrayColumnNames = Object.keys(this.tableData[0])
                this.tableData = this.tableData.map(item => {
                    return {
                        ...item,
                        isEditing: false
                    };
                });
            },

            async sendData(){
                var totalCounts = 0
                if (this.tableName == '關懷人數' || this.tableName == '母性保護' ||this.tableName == '健康促進' ||this.tableName == '職業病預防'){
                    totalCounts = 22
                }
                else if (this.tableName == '空汙'){
                    totalCounts = 4
                }
                else{
                    totalCounts = 1
                }

                // API 呼叫新增/刪除/編輯
                var passApiInformation = {}
                if(this.btnMode == '新增'){
                    var checkCount = 0
                    for (var i = 0 ; i < this.arrayFactorysAdd.length; i++){
                        if (this.tableName != '事業廢棄物' && this.tableName != '空汙'){
                            // 其他 --> 判斷整數
                            if (this.isNumberString(this.dictFactorysAdd[this.arrayFactorysAdd[i]])==false){
                                alert('請輸入整數')
                                return false
                            }
                            else{
                                checkCount = checkCount + 1
                            }
                        }
                        else{
                            // 事業廢棄物/空汙 --> 判斷浮點數
                            if (this.isFloatString(this.dictFactorysAdd[this.arrayFactorysAdd[i]])==false){
                                alert('請輸入浮點數')
                                return false
                            }
                            else{
                                checkCount = checkCount + 1
                            }
                        }
                        
                    }
                    if (checkCount == totalCounts){

                        // 月份正規表達式
                        if(! this.isMonthString(this.monthAdd)){
                            alert('請輸入正確的月份格式，例如「2023/08」')
                            return false
                        }
                        
                        // 把月份+資料儲存至valueTemp
                        var valueTemp = []
                        valueTemp.push(this.monthAdd)
                        for (var key in this.dictFactorysAdd){
                            valueTemp.push(this.dictFactorysAdd[key])
                        }

                        // 判斷分母資料是否 > 分子資料
                        if ( ! this.isTrueDataFormate(valueTemp)){
                            alert('輸入的資料格式錯誤')
                            return false
                        }

                        var dbMode = 'add'
                        var dataMode = this.tableName
                        var apiUrl = apiServices.dbMethodApiURL
                        var passParameterToApiModel = {'dbMode': dbMode, 'dataMode': dataMode, 'arrayAdd': valueTemp}
                        var passApiInformation = await this.$refs.refAjaxAPI.ajaxPostMethodPromise(apiUrl, dbMode, passParameterToApiModel)
                        this.apiStatusCode = passApiInformation['statusCode']
                    }         
                    
                    // 清空v-model暫存值
                    this.monthAdd = ''
                    for (var key in this.dictFactorysAdd){
                        this.dictFactorysAdd[key] = ""
                    }
                    
                }
                else if (this.btnMode == '刪除'){
                    var dbMode = 'delete'
                    var dataMode = this.tableName
                    var apiUrl = apiServices.dbMethodApiURL
                    var passParameterToApiModel = {'dbMode': dbMode, 'dataMode': dataMode, 'arrayDelete': this.arrayCheckIDs}
                    var passApiInformation = await this.$refs.refAjaxAPI.ajaxPostMethodPromise(apiUrl, dbMode, passParameterToApiModel)
                    this.apiStatusCode = passApiInformation['statusCode']

                    // 清空v-model暫存值
                    this.arrayCheckIDs = []
                }
                else if (this.btnMode == '編輯'){
                    var dbMode = 'edit'
                    var dataMode = this.tableName
                    var apiUrl = apiServices.dbMethodApiURL
                    var passParameterToApiModel = {'dbMode': dbMode, 'dataMode': dataMode, 'arrayEditRow': this.arrayEditRow, 'editIndex': this.editIndex}
                    var passApiInformation = await this.$refs.refAjaxAPI.ajaxPostMethodPromise(apiUrl, dbMode, passParameterToApiModel)
                    this.apiStatusCode = passApiInformation['statusCode']

                    // 清空v-model暫存值
                    this.arrayEditRow = []
                    this.editIndex = ''
                    this.monthAdd = ''
                    for (var key in this.dictFactorysAdd){
                        this.dictFactorysAdd[key] = ""
                    }
                }

                // API呼叫成功/失敗
                if (this.apiStatusCode == 200){
                    alert(this.btnMode+'成功')
                }
                else{
                    alert(this.btnMode+'失敗')
                }
                
                if (this.statusCode==200){
                    this.cancelData()
                    this.getExcelValue()
                    if (this.btnSelectMode == '環保'){
                        this.updateEnvironmentalLinePie()
                    }
                }


            },

            async getLimitLogicVersion(){
                var apiUrl = apiServices.getLimitLogicVersionURL
                var mode = 'get Limit Logic Version'
                var passApiInformation = await this.$refs.refAjaxAPI.ajaxGetMethodPromise(apiUrl, mode)

                this.versionTag = '當前邏輯版本 : ' + passApiInformation['versionTag']['版本']
                this.versionList = passApiInformation['versionList']['版本清單']
                this.statusCode = passApiInformation['statusCode']
                this.information = passApiInformation['information']
            },

            getTitleColumn(){

                if (this.btnSelectMode == '衛生'){
                    var tmp = {'關懷人數': ['到診人數', '安排人數', '到診百分比'],
                                '母性保護': ['妊娠人數', '適應確認', '適應百分比'],
                                '健康促進': ['參與人數', '目標人數', '參與百分比'],
                                '職業病預防': ['作業人數', '確認人數', '確認百分比']}
                
                    this.title1 = tmp[this.tableName][0]
                    this.title2 = tmp[this.tableName][1]
                    this.title3 = tmp[this.tableName][2]
                }
                else{
                    var tmp = {'空汙': ['VOC#02', 'VOC#03', 'VOC#04', 'VOC#05'],
                           '水汙': ['放流水COD(mg/l)'],
                           '毒化物': ['Cl2 kg/mon'],
                           '事業廢棄物': ['廢N300(公噸)']}
                    
                    this.arrayFactorysAdd = []
                    this.arrayFactorysAdd = tmp[this.tableName]

                    this.dictFactorysAdd = {}
                    if (this.tableName=='空汙'){
                        this.dictFactorysAdd['VOC#02'] = ''
                        this.dictFactorysAdd['VOC#03'] = ''
                        this.dictFactorysAdd['VOC#04'] = ''
                        this.dictFactorysAdd['VOC#05'] = ''
                    }
                    else if (this.tableName=='水汙'){
                        this.dictFactorysAdd['放流水COD(mg/l)'] = ''
                    }
                    else if (this.tableName=='毒化物'){
                        this.dictFactorysAdd['Cl2 kg/mon'] = ''
                    }
                    else if (this.tableName=='事業廢棄物'){
                        this.dictFactorysAdd['廢N300(公噸)'] = ''
                    }
                }

                


            },

            getStatusClass: function(value, index) {
                // 工安---不安全行為
                if (value=='綠'){
                    return 'status-dot status-dot-green';
                }
                else if (value=='黃'){
                    return 'status-dot status-dot-yellow';
                }
                else if (value=='紅'){
                    return 'status-dot status-dot-red';
                }

            },

            addData() {
                this.btnShowEditData = ! this.btnShowEditData
                this.btnShowDeleteData = ! this.btnShowDeleteData
                if (this.btnMode != ''){
                    this.cancelData()
                }
                else{
                    this.btnMode = '新增'
                    this.btnShowSendData = false
                    this.btnShowCancelData = false
                }
            },

            deleteData(){
                this.btnShowEditData = ! this.btnShowEditData
                this.btnShowAddData = ! this.btnShowAddData
                if (this.btnMode != ''){
                    this.cancelData()
                }
                else{
                    this.btnMode = '刪除'
                    this.btnShowSendData = false
                    this.btnShowCancelData = false
                }

                for (var i = 0; i < this.tableData.length; i++){
                    var checkBoxNmae = "checkBox"+(i+1).toString()
                    this.arrayCheckIDs.push(checkBoxNmae)   
                }
            },

            editData(){
                this.btnShowAddData = ! this.btnShowAddData
                this.btnShowDeleteData = ! this.btnShowDeleteData
                if (this.btnMode != ''){
                    this.cancelData()
                }
                else{
                    this.btnMode = '編輯'
                    this.btnShowSendData = false
                    this.btnShowCancelData = false
                }

                for (var i = 0; i < this.tableData.length; i++){
                    var editBoxName = "edictBox"+(i+1).toString()
                    this.arrayEditIDs.push(editBoxName)   
                }
            },

            cancelData(){
                this.btnShowEditData = false
                this.btnShowDeleteData = false
                this.btnShowAddData = false
                this.btnShowSendData = true
                this.btnShowCancelData = true
                this.btnMode = ''
            },

            isMonthString: function(value){
                return /^\d{4}\/(0[1-9]|1[0-2])$/.test(value)
            },

            isFloatString: function(value) {
                return /^[-+]?\d+(\.\d+)?$/.test(value);
            },

            // 判斷變數是否為數字
            isNumberString: function(value){
                return /^\d+$/.test(value); 
            },

            // 判斷變數是否為字串
            isString: function(value){
                return typeof value === 'string';
            },

            // 判斷分母資料是否 > 分子資料
            isTrueDataFormate: function(value){
                for (var i = 1; i < parseInt(value.length/2); i ++){
                    if (value[i] > value[i+9]){
                        return false
                    }
                }
                return true
            },
            

            editRow(index) {
                this.tableData[index].isEditing = !this.tableData[index].isEditing;
                if (this.tableData[index].isEditing==false){
                    this.btnShowSendData = false

                    // 一次只能編輯一筆資料
                    if (this.arrayEditRow.length > 0){
                        alert('請先將上一筆編輯資料送出，方可繼續編輯下一筆資料')
                        return false
                    }
                    
                    // 月份正規表達式
                    if(! this.isMonthString(this.monthAdd)){
                        alert('請輸入正確的月份格式，例如「2023/08」')
                        return false
                    }

                    // 儲存編輯後的row資料
                    this.arrayEditRow.push(this.monthAdd)
                    for (var i = 0; i < this.arrayFactorysAdd.length; i ++){
                        this.arrayEditRow.push(this.dictFactorysAdd[this.arrayFactorysAdd[i]])
                    }
                    this.editIndex = index
                    var arrayEditRowTmp = this.arrayEditRow.slice()

                    // 判斷分母資料是否 > 分子資料
                    if ( ! this.isTrueDataFormate(arrayEditRowTmp)){
                        alert('輸入的資料格式錯誤')
                        return false
                    }
                    
                    // 更新編輯後的row資料
                    this.tableData[index]['月份'] = arrayEditRowTmp.slice(0, 1)
                    if (this.tableName == '關懷人數' || this.tableName == '母性保護' || this.tableName == '健康促進' || this.tableName == '職業病預防'){
                        this.tableData[index]['到診人數'] = arrayEditRowTmp.slice(1, 12)
                        this.tableData[index]['安排人數'] = arrayEditRowTmp.slice(12, 23)
                    }
                    else{
                        if (this.monthAdd != ''){
                            this.tableData[index]['月份'] = arrayEditRowTmp.slice(0, 1)[0]
                        }
                        if (this.tableName == '空汙'){
                            this.tableData[index]['VOC#02'] = arrayEditRowTmp.slice(1, 2)[0]
                            this.tableData[index]['VOC#03'] = arrayEditRowTmp.slice(2, 3)[0]
                            this.tableData[index]['VOC#04'] = arrayEditRowTmp.slice(3, 4)[0]
                            this.tableData[index]['VOC#05'] = arrayEditRowTmp.slice(4, 5)[0]
                        }
                        else if (this.tableName == '水汙'){
                            this.tableData[index]['放流水COD(mg/l)'] = arrayEditRowTmp.slice(1, 2)[0]
                        }
                        else if (this.tableName == '毒化物'){
                            this.tableData[index]['Cl2 kg/mon'] = arrayEditRowTmp.slice(1, 2)[0]
                        }
                        else if (this.tableName == '事業廢棄物'){
                            this.tableData[index]['廢N300(公噸)'] = arrayEditRowTmp.slice(1, 2)[0]
                        }
                    }

                    // 清空暫存陣列
                    this.arrayEditRowTmp = []
                    
                    
                }
                else{
                    this.btnShowSendData = true
                }

            },
        },
    }
</script>

<template>    

    <AjaxAPI ref="refAjaxAPI"></AjaxAPI>

    <br>
    <button type="button" style="float:right; margin-left:20px;" class="btn custom-btn" v-bind:onclick="editData" v-bind:disabled="btnShowEditData">編輯</button>
    <button type="button" style="float:right; margin-left:20px;" class="btn custom-btn" v-bind:onclick="deleteData" v-bind:disabled="btnShowDeleteData">刪除</button>
    <button type="button" style="float:right; margin-left:20px;" class="btn custom-btn" v-bind:onclick="addData" v-bind:disabled="btnShowAddData">新增</button>
    
    <button type="button" style="float:left; text-align: left;" class="btn custom-btn" v-bind:disabled="true">{{ versionTag }}</button>
    <select class="my-methodSelect" style="float:left; margin-left:20px;" model="versionSelect">
        <option disabled value="" selected>歷史版本</option>
        <option v-if="versionList!=[]" v-for="option in versionList">
            {{ option[0] }}
        </option>
    </select>
    <button type="button" style="float:left; margin-left:20px;" class="btn custom-btn">切換</button>
    

    <br><br><br>
    <div v-if="btnSelectMode=='衛生'" class="excel-content-container scrollable-table">
        <table class="table">
            <thead class="custom-title">
                <tr>
                    <th :rowspan="2"></th>
                    <th :rowspan="2" class="fixed-th">月份</th>
                    <th :colspan="11">{{ title1 }}</th>
                    <th :colspan="11">{{ title2 }}</th>
                    <th :colspan="11">{{ title3 }}</th>
                    <th :colspan="11" >燈號</th>
                    <th :rowspan="2">總燈號</th>
                    <th :rowspan="2">總百分比</th>
                </tr>
                <tr>
                    <th v-for="factory in arrayFactorys" :key="factory">{{ factory }}</th>
                </tr>
            </thead>
            
            <tbody>
                <tr v-for="(row, index) in tableData" :key="row.月份">
                    <td :style="tdStyle" v-if ="btnMode == '刪除'" class="custom-editDelete"><input type="checkbox" class="custom-checkbox" v-model="arrayCheckIDs[index]"></td>
                    <td :style="tdStyle" v-else-if ="btnMode == '編輯'" class="custom-editDelete"><a class="custom-editDelete" @click="editRow(index)" href="#">{{ row.isEditing ? '儲存' : '編輯' }}</a></td>
                    <td :style="tdStyle" v-else class="custom-editDelete"></td>

                    <td :style="tdStyle" v-if="row.isEditing == false" class="custom-tableContent">{{ row.月份[0] }}</td>
                    <td :style="tdStyle" v-else><input class="text my-input-sm" v-model="monthAdd" placeholder="2023/07"></td>
                    
                    <td :style="tdStyle" v-if="row.isEditing == false" v-for="num in row.到診人數" :key="num" class="custom-tableContent">{{ num }}</td>
                    <td :style="tdStyle" v-else v-for="(num, index2) in row.到診人數"><input class="text my-input-sm" v-model="dictFactorysAdd[arrayFactorysAdd[index2]]"></td>

                    <td :style="tdStyle" v-if="row.isEditing == false" v-for="(num, index3) in row.安排人數" :key="num" class="custom-tableContent">{{ num }}</td>
                    <td :style="tdStyle" v-else v-for="(num, index3) in row.安排人數"><input class="text my-input-sm" v-model="dictFactorysAdd[arrayFactorysAdd[index3+11]]"></td>

                    <td :style="tdStyle" v-for="percentage in row.到診百分比" :key="percentage" class="custom-tableContent">{{ percentage+"%" }}</td>

                    <td :style="tdStyle" v-for="light in row.燈號" :key="light">
                        <div class="status-dot-wrapper">
                            <span :class="getStatusClass(light)"></span>
                        </div>
                    </td>

                    <td :style="tdStyle" v-for="light in row.總燈號" :key="light">
                        <div class="status-dot-wrapper">
                            <span :class="getStatusClass(light)"></span>
                        </div>
                    </td>  

                    <td :style="tdStyle" :key="light" class="custom-tableContent">{{ row.總百分比+"%" }}</td>

                </tr>
                <tr v-if="btnMode=='新增'">
                    <th :style="tdStyle"></th>
                    <td :style="tdStyle"><input class="text my-input-sm" v-model="monthAdd" placeholder="2023/07"></td>
                    <td :style="tdStyle" v-for="num in arrayFactorysAdd"><input class="text my-input-sm" v-model="dictFactorysAdd[num]"></td>
                </tr>
            </tbody>
            
        </table>
    </div>

    <div v-if="btnSelectMode=='環保'">
        <div style="display: flex; justify-content: center;">
            <table class="table" style="width: 100%;">
                <thead class="custom-title">
                    <tr>
                        <th></th>
                        <th>月份</th>
                        <th v-for="itemTitle in arrayFactorysAdd">{{ itemTitle }}</th>
                        <th>燈號</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in tableData" :key="row.月份">
                        <td :style="tdStyle" v-if ="btnMode == '刪除'" class="custom-editDelete"><input type="checkbox" class="custom-checkbox" v-model="arrayCheckIDs[index]"></td>
                        <td :style="tdStyle" v-else-if ="btnMode == '編輯'" class="custom-editDelete" ><a class="custom-editDelete" @click="editRow(index)" href="#">{{ row.isEditing ? '儲存' : '編輯' }}</a></td>
                        <td :style="tdStyle" v-else class="custom-editDelete"></td>

                        <td :style="tdStyle" v-if="row.isEditing == false" class="custom-tableContent">{{ row.月份 }}</td>
                        <td :style="tdStyle" v-else><input class="text my-input-sm" v-model="monthAdd"></td>

                        <td :style="tdStyle" v-if="row.isEditing == false" class="custom-tableContent" v-for="(temp, index) in arrayFactorysAdd">{{ row[arrayFactorysAdd[index]] }}</td>
                        <td :style="tdStyle" v-else v-for="(temp, index) in arrayFactorysAdd" ><input class="text my-input-sm" v-model="dictFactorysAdd[arrayFactorysAdd[index]]"></td>
                        
                        <td :style="tdStyle" v-for="light in row.燈號" :key="light">
                            <div class="status-dot-wrapper">
                                <span  :class="getStatusClass(light)"></span>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="btnMode=='新增'">
                        <th :style="tdStyle"></th>
                        <td :style="tdStyle"><input class="text my-input-mid" v-model="monthAdd"></td>
                        <td :style="tdStyle" v-for="num in arrayFactorysAdd"><input class="text my-input-mid" v-model="dictFactorysAdd[num]"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <br>
    <button type="button" style="float:right; margin-left:20px;" class="btn custom-btn" v-bind:onclick="cancelData" v-bind:disabled="btnShowCancelData">取消</button>
    <button type="button" style="float:right; margin-left:20px;" class="btn custom-btn" v-bind:onclick="sendData" v-bind:disabled="btnShowSendData">送出</button>
    <br><br>

    
    <!------------
    <br><br>
    <div class="row justify-content-center align-items-center">
        <div>
            <table class="custom-table">
                <thead>
                    <tr>
                    <th></th>
                    <th></th>
                    <th class="custom-title" v-for="month in arrayColumnNames" :key="`month${month}`">{{ month }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, index) in tableData" :key="index">
                        <td class="custom-title" v-if="index < 36 && index % 9 === 0" :rowspan="9">{{ data.title }}</td>
                        <td class="custom-title" v-if="index >= 36" :colspan="2">{{ data.title }}</td>
                        <td class="custom-title" v-if="index < 36">{{ data.factoryArea }}</td>
                        <td v-if="index>26 && index!=36" v-for="month in arrayColumnNames" :key="month">
                            <div class="status-dot-wrapper">
                                <span :class="getStatusClass(data.value[month])"></span>
                            </div>
                        </td>
                        <td v-if="index<=26 || index==36" v-for="month in arrayColumnNames" :key="month">{{data.value[month]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    ----------->
    
</template>

<style scoped>
    .my-methodSelect {
        border-color: rgb(173, 170, 170); /* 设置外框线的颜色 */

        background-color: #f8f9fa;
        color: #212529;

        padding: 0.5rem 1rem;
        font-size: 1.25rem;
        line-height: 1.5;
        border-radius: 0.3rem;
        height: 50px; /* 调整高度值为您希望的像素值 */

    }


    .my-methodSelect:hover {
        background-color: #e2e6ea;
        border-color: #e2e6ea;
        color: #212529;
    }

    .my-methodSelect:focus,
    .my-methodSelect.focus {
        box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);
    }

    .version-tag {
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px;
    }

    :root {
        --success-color: rgb(0, 176, 80);
        --warning-color: rgb(248, 248, 88);
        --danger-color: rgb(255, 0, 0);
    }

    .status-dot-green,
    .status-dot-yellow,
    .status-dot-red {
        width: 50px; /* 设置宽度和高度相等以得到方形效果 */
        height: 36px;
        border-radius: 0; /* 将边框设置为直角，得到方形效果 */
        
    }

    .status-dot-wrapper {
        display: flex; /* 使用 flex 布局 */
        justify-content: center; /* 水平居中对齐 */
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

    .custom-title{
        font-weight: bold; 
        font-size: 24px ;
        color: rgb(12, 12, 12)
    }

    .custom-editDelete{
        background-color: #f1f1f1;
        color: rgba(206, 35, 35, 0.384);
        font-weight: bold; 
        font-size: 24px ;
    }

    .custom-tableContent{
        color: rgba(78, 78, 70, 0.514);
        font-weight: bold; 
        font-size: 24px ;
    }
    

    .excel-content-container {
        width: 80rem;
        overflow-x: auto;
        overflow-y: auto; /* 垂直方向的滚动条 */
        height: 800px; /* 设置表格容器的高度，使滚动条出现在需要的位置 */
        justify-content: center;
        position: relative; /* 确保表格头部可以相对于此容器进行定位 */
    }

    .scrollable-table {
        min-width: 100%; /* 让滚动容器宽度撑满父容器 */
    }

    /* 固定第一列的样式 */
    .fixed-th {
        position: sticky;
        left: 0;
        z-index: 1;
    }
    tbody td:nth-child(2) {
        position: sticky;
        left: 0;
        z-index: 0;
        background-color:  #f1f1f1;; 
    }
    

    th {
        width: 70px;
        height: 50px;
    }

    .table {
        border-collapse: collapse;
        width: 200%;
    }
    /* 表头样式 */
    .table thead {
        position: sticky;
        top: 0; /* 固定在容器顶部 */
        background-color: #f1f1f1;
        z-index: 1; /* 设置z-index确保表头显示在其他内容之上 */
    }

    .table th,
    .table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center; /* 将表格内容水平居中对齐 */
        vertical-align: middle; /* 将表格内容垂直居中对齐 */
    }

    .table th {
        background-color:  #f1f1f1;
        font-weight: bold; /* 可选，设置表头文字加粗 */
        vertical-align: middle; /* 将表头垂直居中对齐 */
  
    }

    .my-input-sm {
        /* 设置复选框容器的大小 */
        width: 90%;
        height: 35px;
        border: 1px solid rgb(204, 204, 204) ;
    }
    .my-input-mid {
        /* 设置复选框容器的大小 */
        width: 70%;
        height: 35px;
        border: 1px solid rgb(204, 204, 204) ;
    }

    .custom-checkbox {
        /* 设置复选框容器的大小 */
        width: 25px;
        height: 25px;
    }
    

</style>

