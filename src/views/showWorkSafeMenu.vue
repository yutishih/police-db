<script>

    export default{
        name: 'showWorkSafeMenu',
        components:{
            
        },
        mounted(){
        },
        
        props: ['selectFactory', 'selectMonth', 'selectMode', 'workSafeMenu'],
        data(){
            return {
                
                tableData: [],
                btnShowDetail: '',
                DOCSEQNO: '',                
            }
        },

        methods:{
            showAlert(value) {
                this.DOCSEQNO = value
                var passValues = {'DOCSEQNO': this.DOCSEQNO, 'showMenuDetail': true}
                this.$emit('dataFetched', passValues);

            },
            
        },
    }
</script>

<template>    

    <div>
        <br><br><br><br>
        <label class="myView-thirdPageLable" >{{ selectFactory + '   ' + selectMonth + '   「' + selectMode + '」   清單' }}</label>
        <br><br><br><br>

        <div style="display: flex; justify-content: center;">
            <table class="table table-hover table-bordered" style="width: 75%">
                <thead class="myShowTable-title">
                    <tr>
                    <th>文件編號</th>
                    <th>狀態</th>
                    <th>申請人</th>
                    <th>部門代號</th>
                    <th>發生日期</th>
                    <th>文件名稱</th>
                    <th>事故類別</th>
                    <th>TRANS_TIME</th>
                    </tr>
                </thead>
                <tbody class="myShowTable-content">
                    <tr v-for="data in workSafeMenu">
                        <td @dblclick="showAlert(data['DOCSEQNO'])">{{ data['DOCSEQNO'] }}</td>
                        <td @dblclick="showAlert(data['DOCSEQNO'])">{{ data['STATUS'] }}</td>
                        <td @dblclick="showAlert(data['DOCSEQNO'])">{{ data['CREATORNM'] }}</td>
                        <td @dblclick="showAlert(data['DOCSEQNO'])">{{ data['STAFF_DEPTNO'] }}</td>
                        <td @dblclick="showAlert(data['DOCSEQNO'])">{{ data['HAPPEN_DATE'] }}</td>
                        <td @dblclick="showAlert(data['DOCSEQNO'])">{{ data['DOCNAME'] }}</td>
                        <td @dblclick="showAlert(data['DOCSEQNO'])">{{ data['CATE_KIND'] }}</td>
                        <td @dblclick="showAlert(data['DOCSEQNO'])">{{ data['TRANS_TIME'] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
   

</template>

<style>

    @import '@/assets/myShowTable.css';
    @import '@/assets/myView.css';

</style>

