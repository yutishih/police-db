<script>
    export default{
        name: 'showOccupationalDisasterMenuDetail',
        props: ['docDetail'],
        data(){
            return {
                /*
                docDetail: {
                    '發生日期': '2023/07/18',
                    '文件編號': 'OCC3-20230726001',
                    '文件狀態': '1.簽核中',
                    '申請日期': '2023/7/22',
                    '申請人員': '呂博揚',
                    '申請人員工號': '30026373',
                    '文件種類': '意外事故',
                    '所屬廠區': '台南',
                    '所屬部門': 'CF生產課',
                    '分機號碼': '(766)6110',

                    '廠區別': 'LCD3廠',
                    '發生時間': '21:30:00',
                    '發生地點': 'FIMA62',
                    '受傷人員': '張雅雯',
                    '工號': '30024636',
                    '職稱': '技術員',
                    '到職日': '2019/04/08',
                    '出生日期': '1973/02/07',
                    '性別': '女',
                    '年齡': '39',
                    '身分證字號': 'T223385265',
                    '診斷醫院': '奇美醫療財團法人奇美醫院',
                    '事故類別': '重紅藥水(僅人員受傷且送醫)',
                    '事故類別其他說明': '',
                    '失能損失天數': '1',
                    '歸類': '',
                    '歸類之其他說明': '',
                    '災害分類': '',
                    '災害分類之其他說明': '',
                },
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
    <label class="myView-thirdPageLable" >職能災害管理系統</label>
    <br><br><br><br>
    <div style="display: flex; justify-content: center;">
        <table class="table table-bordered" style="width: 75%">
            <tbody>
                <!--------------------基本資料--------------------------->
                <tr>
                    <td :colspan="6" class="myUserData-Bigtitle">[ 基本資料 ]</td>
                </tr>
                <tr>
                    <td class="myUserData-title">發生日期</td>
                    <td class="myUserData-content" :colspan="2">{{ docDetail['發生日期'] }}</td>
                    <td class="myUserData-title">文件編號</td>
                    <td class="myUserData-content" :colspan="2">{{ docDetail['文件編號'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-title" >文件狀態</td>
                    <td class="myUserData-content" :colspan="2">{{ docDetail['文件狀態'] }}</td>
                    <td class="myUserData-title">申請日期</td>
                    <td class="myUserData-content" :colspan="2">{{ docDetail['申請日期'] }}</td>
                </tr>
                <tr >
                    <td class="myUserData-title">申請人員</td>
                    <td class="myUserData-content" :colspan="2">{{ docDetail['申請人員'] }}</td>
                    <td class="myUserData-title">申請人員工號</td>
                    <td class="myUserData-content" :colspan="2">{{ docDetail['申請人員工號'] }}</td>
                </tr>
                <tr >
                    <td class="myUserData-title">文件種類</td>
                    <td class="myUserData-content" :colspan="2">{{ docDetail['文件種類'] }}</td>
                    <td class="myUserData-title">所屬廠區</td>
                    <td class="myUserData-content" :colspan="2">{{ docDetail['所屬廠區'] }}</td>
                </tr>
                <tr >
                    <td class="myUserData-title">所屬部門</td>
                    <td class="myUserData-content" :colspan="2">{{ docDetail['所屬部門'] }}</td>
                    <td class="myUserData-title">分機號碼</td>
                    <td class="myUserData-content" :colspan="2">{{ docDetail['分機號碼'] }}</td>
                </tr>
                <tr>
                    <td :colspan="6" class="myUserData-Bigtitle">[ 受傷人員資料 ]</td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">廠區別</td>
                    <td class="myUserData-keyIn-content" colspan="1">{{ docDetail['廠區別'] }}</td>
                    <td class="myUserData-keyIn-title">發生時間</td>
                    <td class="myUserData-keyIn-content" colspan="1">{{ docDetail['發生時間'] }}</td>
                    <td class="myUserData-keyIn-title">發生地點</td>
                    <td class="myUserData-keyIn-content" colspan="1">{{ docDetail['發生地點'] }}</td>
                </tr>
                <tr>
                   
                    <td class="myUserData-keyIn-title">受傷人員</td>
                    <td class="myUserData-keyIn-content" colspan="1">{{ docDetail['受傷人員'] }}</td>
                    <td class="myUserData-keyIn-title">工號</td>
                    <td class="myUserData-keyIn-content" colspan="1">{{ docDetail['工號'] }}</td>
                    <td class="myUserData-keyIn-title">職稱</td>
                    <td class="myUserData-keyIn-content" colspan="2">{{ docDetail['職稱'] }}</td>
                </tr>

                <tr>
                    <td class="myUserData-keyIn-title">到職日</td>
                    <td class="myUserData-keyIn-content" colspan="1">{{ docDetail['到職日'] }}</td>
                    <td class="myUserData-keyIn-title">出生日期</td>
                    <td class="myUserData-keyIn-content" colspan="1">{{ docDetail['出生日期'] }}</td>
                    <td class="myUserData-keyIn-title">性別</td>
                    <td class="myUserData-keyIn-content" colspan="1">{{ docDetail['性別'] }}</td>
                </tr>
                <tr>
                   
                    <td class="myUserData-keyIn-title">年齡</td>
                    <td class="myUserData-keyIn-content" colspan="1">{{ docDetail['年齡'] }}</td>
                    <td class="myUserData-keyIn-title">身分證字號</td>
                    <td class="myUserData-keyIn-content" colspan="1">{{ docDetail['身分證字號'] }}</td>
                    <td class="myUserData-keyIn-title">診斷醫院</td>
                    <td class="myUserData-keyIn-content" colspan="1">{{ docDetail['診斷醫院'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">失能損失天數</td>
                    <td class="myUserData-keyIn-content" colspan="6">{{ docDetail['失能損失天數'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">事故類別</td>
                    <td class="myUserData-keyIn-content" colspan="2">{{ docDetail['事故類別'] }}</td>
                    <td class="myUserData-keyIn-title">事故類別其他說明</td>
                    <td class="myUserData-keyIn-content" colspan="2">{{ docDetail['事故類別其他說明'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">歸類</td>
                    <td class="myUserData-keyIn-content" colspan="2">{{ docDetail['歸類'] }}</td>
                    <td class="myUserData-keyIn-title">歸類之其他說明</td>
                    <td class="myUserData-keyIn-content" colspan="2">{{ docDetail['歸類之其他說明'] }}</td>
                </tr>
                <tr>
                    <td class="myUserData-keyIn-title">災害分類</td>
                    <td class="myUserData-keyIn-content" colspan="2">{{ docDetail['災害分類'] }}</td>
                    <td class="myUserData-keyIn-title">災害分類之其他說明</td>
                    <td class="myUserData-keyIn-content" colspan="2">{{ docDetail['災害分類之其他說明'] }}</td>
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

