<script>
    export default{
        name: 'showWorkSafeMenuDetail',
        props: ['docDetail'],
        data(){
            return {
                /*
                tableData: {
                    '風險等級': {'一般風險': true, '高度風險': false},
                    '日期': '2023/07/26',
                    '缺失分類': '不安全的環境',
                    '巡檢員姓名': '王大明',
                    '巡檢單位': 'DP0422',
                    '陪檢人員姓名': '王曉明',
                    '無塵室區域': {'Array廠': {'L10': false, 'L17': false, 'L23': false, 'L30': false, 'L47': false,
                                              'L13': false, 'L20': false, 'L27': false, 'L40': false},
                                 'Cell廠': {'L20': false,'L27': false,'A-LineL17': false,'2Cut"XP-LineL17': false,
                                            'L23': false,'A-LineL13': false,'2Cut"XP-LineL13': false},
                                 'CF廠': {'L10': false, 'L17': false, 'L23': false,
                                          'L13': true, 'L20': false, 'L27': false},
                                 'TS1廠': {'1F': false, '2F': false, 'RAP': false},
                                 'LCM廠': {'L30': false, 'L47': false, 'TS1': false}
                                },
                    '缺失種類': {'不安全的環境/設備': true, '不安全的行為': false, '環保違規': false, '6S': false, '紀律': false, 
                                '機械危害': false, '化學危害': false, '墜落風險': false, '感電風險': false, '防護用具': false, '其他': false},
                    '異常位置詳述': 'SF01101 MGV車，缺少走行部妨夾COVER',
                    '異常內容': 'SF01101 MGV車，缺少走行部妨夾COVER',
                    '改善建立或立即採取之措施': '補上COVER',
                    '改善單位主管': '李世明',
                    '回覆改善期限': '2023/08/02',
                    '防災責任區主管': '李世明',
                    '特別通知': '',
                    '改善種類': '自行修繕',
                    '改善狀況': {'已立即改善': false},

                    '指定改善負責人員': '黃清風',
                    '改善對策': '',
                    '預定完成日期': '',
                    '是否需會簽其他單位主管': {'是': false, '否': true},
                    '主管': '',
                    '部門': '',

                    '會簽單位意見': '',

                    '改善確認': '',
                    '完成改善日期': '',

                    '工安確認改善狀況': '',
                }
                */
            }
        },

        methods:{
            preventUncheck(title, key) {
                // 如果docDetail[title][key]為true, 代表勾選狀態, 則阻止點擊事件取消勾選
                if (this.docDetail[title][key]) {
                    event.preventDefault();
                }
            },
            preventUnRadio(mode, key) {
                // 如果docDetail[mode][key]為true, 代表勾選狀態, 則阻止點擊事件取消勾選
                if (this.docDetail[mode][key]) {
                    event.preventDefault();
                }
            }
            
        },
    }
</script>

<template>    

    <br><br><br><br>
    <label class="myView-thirdPageLable" >環安巡檢缺失追蹤管理系統</label>
    <br><br><br><br>
    <div style="display: flex; justify-content: center;">
        <table class="table table-bordered" style="width: 75%">
            <tbody>

                <!--------------------基本資料--------------------------->
                <tr>
                    <td :colspan="6" class="myUserData-Bigtitle">[ 基本資料 ]</td>
                </tr>
                <tr>
                    <td class="myUserData-title">風險等級</td>
                    <td colspan="5">
                        <input type="radio" class="my-checkbox"
                            :checked="docDetail['風險等級']['一般風險']"
                            :disabled="!docDetail['風險等級']['一般風險']"
                            @click="preventUnRadio('風險等級', '一般風險')">
                        <label class="myUserData-keyIn-content">&nbsp;&nbsp;一般風險&nbsp;&nbsp;</label>
                        <input type="radio" class="my-checkbox"
                            :checked="docDetail['風險等級']['高度風險']"
                            :disabled="!docDetail['風險等級']['高度風險']"
                            @click="preventUnRadio('風險等級', '高度風險')">
                        <label class="myUserData-keyIn-content">&nbsp;&nbsp;高度風險&nbsp;&nbsp;</label>
                    </td>
                </tr>
                <tr>
                    <td class="myUserData-title">日期</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['日期'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">缺失分類</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['缺失分類'] }}</td>
                </tr>
                <tr >
                    <td class="myUserData-title" >巡檢員姓名</td>
                    <td class="myUserData-content">{{ docDetail['巡檢員姓名'] }}</td>
                    <td class="myUserData-title">巡檢單位</td>
                    <td class="myUserData-content">{{ docDetail['巡檢單位'] }}</td>
                    <td class="myUserData-title">陪檢人員姓名</td>
                    <td class="myUserData-content">{{ docDetail['陪檢人員姓名'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">無塵室區域</td>
                    <td colspan="5">
                        <template v-for="key in Object.keys(docDetail['無塵室區域'])">
                            <div class="myUserData-content">
                                <div class="row">
                                    <div class="col-1">{{ key }}</div>
                                    <div class="col-11">
                                        <tr v-for="area in Object.keys(docDetail['無塵室區域'][key])" style="display: inline-block;">
                                            <input type="radio" class="my-checkbox"
                                                :checked="docDetail['無塵室區域'][key][area]"
                                                :disabled="!docDetail['無塵室區域'][key][area]"
                                                @click="preventUnRadio('風險等級', '高度風險')">
                                            <label class="myUserData-keyIn-content">&nbsp;&nbsp;{{area}}&nbsp;&nbsp;</label>              
                                        </tr>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </td>
                    <!-------------
                    <tr v-for="key in Object.keys(tableData['無塵室區域'])">
                        <td class="myUserData-content" >
                            {{ key }}
                        </td>
                        <td>
                            <tr v-for="area in Object.keys(tableData['無塵室區域'][key])" style="display: inline-block;">
                                <input type="radio" class="my-checkbox"
                                    :checked="tableData['無塵室區域'][key][area]"
                                    :disabled="!tableData['無塵室區域'][key][area]"
                                    @click="preventUnRadio('風險等級', '高度風險')">
                                <label class="myUserData-keyIn-content">&nbsp;&nbsp;{{area}}&nbsp;&nbsp;</label>              
                            </tr>
                        </td>
                    </tr>
                    ---------------->
                </tr>
                <tr>
                    <td class="myUserData-title">缺失種類</td>
                    <td class="myUserData-content" colspan="5">
                        <tr v-for="(key, index) in Object.keys(docDetail['缺失種類'])" style="display: inline-block;">
                            <input type="checkbox" class="my-checkbox"
                                :checked="docDetail['缺失種類'][key]"
                                :disabled="!docDetail['缺失種類'][key]"
                                @click="preventUncheck('缺失種類', key)">
                            <label class="myUserData-keyIn-content">&nbsp;&nbsp;{{key}}&nbsp;&nbsp;</label>  
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td class="myUserData-title">異常位置詳述</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['異常位置詳述'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">異常內容</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['異常內容'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">改善建立或立即採取之措施</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['改善建立或立即採取之措施'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">改善單位主管</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['改善單位主管'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">回覆改善期限</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['回覆改善期限'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">防災責任區主管</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['防災責任區主管'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">特別通知</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['特別通知'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">改善狀況</td>
                    <td class="myUserData-content" colspan="5">
                        <tr v-for="key in Object.keys(docDetail['改善狀況'])" style="display: inline-block;">
                            <input type="radio" class="my-checkbox"
                                :checked="docDetail['改善狀況'][key]"
                                :disabled="!docDetail['改善狀況'][key]"
                                @click="preventUnRadio('改善狀況', key)">
                            <label class="myUserData-keyIn-content">&nbsp;&nbsp;{{key}}&nbsp;&nbsp;</label>  
                        </tr>
                    </td>
                </tr>

                <!--------------------缺失改善--------------------------->
                <tr>
                    <td :colspan="6" class="myUserData-Bigtitle">[ 缺失改善 ]</td>
                </tr>
                <tr>
                    <td class="myUserData-title">指定改善負責人員</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['指定改善負責人員'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">改善對策</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['改善對策'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">預定完成日期</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['預定完成日期'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">是否需會簽其他單位主管</td>
                    <td class="myUserData-content" colspan="5">
                        <tr v-for="key in Object.keys(docDetail['是否需會簽其他單位主管'])" style="display: inline-block;">
                            <input type="radio" class="my-checkbox"
                                :checked="docDetail['是否需會簽其他單位主管'][key]"
                                :disabled="!docDetail['是否需會簽其他單位主管'][key]"
                                @click="preventUnRadio('是否需會簽其他單位主管', key)">
                            <label class="myUserData-keyIn-content">&nbsp;&nbsp;{{key}}&nbsp;&nbsp;</label>  
                        </tr>        
                        <label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            主管&nbsp;&nbsp;:
                            &nbsp;&nbsp;{{ docDetail['主管'] }}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            部門&nbsp;&nbsp;: 
                            &nbsp;&nbsp;{{ docDetail['部門'] }}
                        </label>                 
                    </td>
                </tr>

                <!--------------------會簽其他部門--------------------------->
                <tr>
                    <td :colspan="6" class="myUserData-Bigtitle">[ 會簽其他部門 ]</td>
                </tr>
                <tr>
                    <td class="myUserData-title">會簽單位意見</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['會簽單位意見'] }}</td>
                </tr>

                <!--------------------改善確認--------------------------->
                <tr>
                    <td :colspan="6" class="myUserData-Bigtitle">[ 改善確認 ]</td>
                </tr>
                <tr>
                    <td class="myUserData-title">改善確認</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['改善確認'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">完成改善日期</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['完成改善日期'] }}</td>
                </tr>

                <!--------------------工安追蹤--------------------------->
                <tr>
                    <td :colspan="6" class="myUserData-Bigtitle">[ 工安追蹤 ]</td>
                </tr>
                <tr>
                    <td class="myUserData-title">工安確認改善狀況</td>
                    <td class="myUserData-content" colspan="5">{{ docDetail['工安確認改善狀況'] }}</td>
                </tr>
  
            </tbody>
        </table>
    </div>
</template>

<style>

    .myUserData-Bigtitle{
        color: rgb(0, 0, 255);
        font-family: Microsoft JhengHei; 
        font-size: 24px ; 
        font-weight: bold; 
        text-align: center;
        background-color: antiquewhite;
    }

    .myUserData-title{
        color: green;
        font-family: Microsoft JhengHei; 
        font-size: 24px ; 
        font-weight: bold; 
    }

    .myUserData-content{
        color: green;
        font-family: Microsoft JhengHei; 
        font-size: 24px ; 
    }

    .myUserData-keyIn-title{
        color: rgb(0, 0, 255);
        font-family: Microsoft JhengHei; 
        font-size: 24px ; 
        font-weight: bold; 
    }

    .myUserData-keyIn-content{
        color: rgb(255, 9, 255);
        font-family: Microsoft JhengHei; 
        font-size: 24px ; 
        font-weight: bold; 
    }

    .my-checkbox {
        /* 设置复选框容器的大小 */
        width: 25px;
        height: 25px;
    }

    @import '@/assets/myShowTable.css';
    @import '@/assets/myView.css';

</style>

