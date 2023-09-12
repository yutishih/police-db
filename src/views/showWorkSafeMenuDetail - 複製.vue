<script>


    export default{
        name: 'showWorkSafeMenuDetail',
        mounted(){

        },
        
        props: ['DOCSEQNO'],
        data(){
            return {
                
                tableData: {
                    '申請日期': '2023/01/17 下午01:16:37',
                    '文件編號': 'DCC3-20230117001',
                    '申請人員': '30025651/吳怡萱',
                    '所屬廠區': '台南',
                    '所屬部門': 'DQ0230/供應鏈品品質管理部',
                    '分機號碼': '(766)1311',

                    '廠區別': {'LCD3廠': false, 'TS1廠': true},
                    '調查開始日期與時間': '2022/12/30 下午03:00',
                    '調查人員': '王小華 ; 張大名',
                    '發生日期': '2022/12/29',
                    '發生部門': 'DQ0230',
                    '發生時間': '下午02:00',
                    '發生地點': 'TS1廠外圍道路',
                    '受傷同仁': '王曉明',
                    '工號': '30025651',
                    '職稱': '高級工程師',
                    '部門代號': 'DQ0230',
                    '到職日': '110/06/21',
                    '性別': {'男': true, '女': false},
                    '出生日期': '71/11/12',
                    '年齡': '40',
                    '身分證': 'D123465789',
                    '診斷醫院': '醫院',

                    '事故類別': {'矽甲烷相關製程(PSN)': false, 
                                '工作失能傷害(當日不計，損失時間1日以上)': false, 
                                '輕紅藥水(人員受傷僅廠內醫護室護理)': false, 
                                '火災/爆炸': false,
                                '化學品洩漏/噴濺': false, 
                                '造成撤廠': false,
                                '重紅藥水(僅人員受傷且送醫)': false, 
                                '設備損失': false,
                                '氣體外洩': false, 
                                '其他': true},

                    '事故類別其他說明': '於TS1廠外圍道路行走時，因道路地面落差造成腳部韌帶撕裂傷',

                },
                
            }
        },

        methods:{
            preventUncheck(key) {
                // 如果tableData['事故類別'][key]为true，即勾选状态，则阻止点击事件取消勾选
                if (this.tableData['事故類別'][key]) {
                    event.preventDefault();
                }
            },
            preventUnRadio(mode, key) {
                // 如果tableData['事故類別'][key]为true，即勾选状态，则阻止点击事件取消勾选
                if (this.tableData[mode][key]) {
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
                <tr>
                    <td :colspan="5" class="myUserData-Bigtitle">[ 申請人資料 ]</td>
                </tr>
                <tr>
                    <td class="myUserData-title">申請日期</td>
                    <td class="myUserData-content">{{ tableData['申請日期'] }}</td>
                    <td class="myUserData-title">文件編號</td>
                    <td class="myUserData-content">{{ tableData['文件編號'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">申請人員</td>
                    <td class="myUserData-content">{{ tableData['申請人員'] }}</td>
                    <td class="myUserData-title">所屬廠區</td>
                    <td class="myUserData-content">{{ tableData['所屬廠區'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title">所屬部門</td>
                    <td class="myUserData-content">{{ tableData['所屬部門'] }}</td>
                    <td class="myUserData-title">分機號碼</td>
                    <td class="myUserData-content">{{ tableData['分機號碼'] }}</td>
                </tr>
                <tr>
                    <td :colspan="5" class="myUserData-Bigtitle">[ 申請人填寫內容 ]</td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">廠區別</td>
                    <td :colspan="5" class="myUserData-keyIn-content">
                        <input type="radio" class="my-checkbox"
                            :checked="tableData['廠區別']['LCD3廠']"
                            :disabled="!tableData['廠區別']['LCD3廠']"
                            @click="preventUncheck('廠區別', 'LCD3廠')">
                        <label class="myUserData-keyIn-content">&nbsp;&nbsp;LCD3廠&nbsp;&nbsp;</label>
                        <input type="radio" class="my-checkbox"
                            :checked="tableData['廠區別']['TS1廠']"
                            :disabled="!tableData['廠區別']['TS1廠']"
                            @click="preventUncheck('廠區別', 'TS1廠')">
                        <label class="myUserData-keyIn-content">&nbsp;&nbsp;TS1廠&nbsp;&nbsp;</label>
                    </td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">調查開始日期與時間</td>
                    <td class="myUserData-keyIn-content">{{ tableData['調查開始日期與時間'] }}</td>
                    <td class="myUserData-keyIn-title">調查人員</td>
                    <td class="myUserData-keyIn-content">{{ tableData['調查人員'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">發生日期</td>
                    <td class="myUserData-keyIn-content">{{ tableData['發生日期'] }}</td>
                    <td class="myUserData-keyIn-title">發生部門</td>
                    <td class="myUserData-keyIn-content">{{ tableData['發生部門'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">發生時間</td>
                    <td class="myUserData-keyIn-content">{{ tableData['發生時間'] }}</td>
                    <td class="myUserData-keyIn-title">發生地點</td>
                    <td class="myUserData-keyIn-content">{{ tableData['發生地點'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">受傷同仁</td>
                    <td class="myUserData-keyIn-content">{{ tableData['受傷同仁'] }}</td>
                    <td class="myUserData-keyIn-title">工號</td>
                    <td class="myUserData-keyIn-content">{{ tableData['工號'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">職稱</td>
                    <td class="myUserData-keyIn-content">{{ tableData['職稱'] }}</td>
                    <td class="myUserData-keyIn-title">部門代號</td>
                    <td class="myUserData-keyIn-content">{{ tableData['部門代號'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">到職日</td>
                    <td class="myUserData-keyIn-content">{{ tableData['到職日'] }}</td>
                    <td class="myUserData-keyIn-title">性別</td>
                    <td>
                        <input type="radio" class="my-checkbox"
                            :checked="tableData['性別']['男']"
                            :disabled="!tableData['性別']['男']"
                            @click="preventUncheck('性別', '男')">
                        <label class="myUserData-keyIn-content">&nbsp;&nbsp;男&nbsp;&nbsp;</label>
                        <input type="radio" class="my-checkbox"
                            :checked="tableData['性別']['女']"
                            :disabled="!tableData['性別']['女']"
                            @click="preventUncheck('性別', '女')">
                        <label class="myUserData-keyIn-content">&nbsp;&nbsp;女&nbsp;&nbsp;</label>
                    </td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">出生日期</td>
                    <td class="myUserData-keyIn-content">{{ tableData['出生日期'] }}</td>
                    <td class="myUserData-keyIn-title">年齡</td>
                    <td class="myUserData-keyIn-content">{{ tableData['年齡'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">身分證</td>
                    <td class="myUserData-keyIn-content">{{ tableData['身分證'] }}</td>
                    <td class="myUserData-keyIn-title">診斷醫院</td>
                    <td class="myUserData-keyIn-content">{{ tableData['診斷醫院'] }}</td>
                </tr>

                <tr>
                    <td class="myUserData-keyIn-title">事故類別</td>
                    <td :colspan="5" class="myUserData-keyIn-content">
                        <tr v-for="key in Object.keys(tableData['事故類別'])">
                            <input type="checkbox" 
                                class="my-checkbox" 
                                :checked="tableData['事故類別'][key]"
                                :disabled="!tableData['事故類別'][key]"
                                @click="preventUncheck(key)">
                            <label class="myUserData-keyIn-content">&nbsp;&nbsp;{{key}}&nbsp;&nbsp;</label>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">事故類別其他說明</td>
                    <td :colspan="5" class="myUserData-keyIn-content" >{{ tableData['事故類別其他說明'] }}</td>
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

