<script>

    import apiServices from '../services/apiServices';
    import AjaxAPI from '../components/AjaxAPI.vue';
    import $ from 'jquery'

    export default{
        name: 'userLogin',
        components:{
            AjaxAPI,
        },

        mounted(){
            $('#userLogin').modal('show');
        },
        data(){
            return {

                account: '',
                password: '',
                statusCode: '',
                information: '',   
                btnLoginStatus: false ,
            }
        },
        methods:{

            async login(){
                var mode = 'userLogin'
                var apiUrl = apiServices.userloginURL
                var passParameterToApiModel = {'apiUrl': apiUrl,
                                                'account': this.account,
                                                'password': this.password}
                var passApiInformation = await this.$refs.refAjaxAPI.ajaxPostMethodPromise(apiUrl, mode, passParameterToApiModel)

                this.statusCode = passApiInformation['statusCode']
                this.information = passApiInformation['information']

                alert(this.information)
                if (this.statusCode == 200){
                    this.btnLoginStatus = true
                }
                this.$emit('loginStatusaFetched', this.btnLoginStatus);

            },

            offLogin(){
                this.$emit('loginStatusaFetched', this.btnLoginStatus);
            }


            
            
        },


    }
</script>

<template>    

    <AjaxAPI ref="refAjaxAPI"></AjaxAPI>

    <!-- Modal -->
    <div class="modal fade" id="userLogin" tabindex="-1" role="dialog" aria-labelledby="userLoginLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" style="font-size: 28px;" id="userLoginLabel">使用者權限登入</h5>
                   
                </div>
                <div class="modal-body">
                    <!-- 帐号输入框 -->
                    <div class="form-group">
                        <label for="username" style="font-size: 24px;">帳號:</label>
                        <input type="text" v-model="account" class="form-control userLogin-input" id="username" placeholder="請輸入帳號">
                    </div>
                    <!-- 密码输入框 -->
                    <div class="form-group">
                        <label for="password" style="font-size: 24px;">密碼:</label>
                        <input type="password" v-model="password" class="form-control userLogin-input" id="password" placeholder="請輸入密碼">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary userLogin-btn" v-bind:onclick="offLogin" data-dismiss="modal">關閉</button>
                    <button type="button" class="btn btn-primary userLogin-btn" v-bind:onclick="login" data-dismiss="modal">登入</button>
                </div>
            </div>
        </div>
    </div>

    
</template>

<style>

    .userLogin-input {
        /* 设置复选框容器的大小 */
        width: 100%;
        height: 50px;
        font-family: Microsoft JhengHei; 
        font-size: 24px ; 
        border: 1px solid rgb(204, 204, 204) ;
    }

    .userLogin-btn {
        /* 设置复选框容器的大小 */
        width: 100px;
        height: 50px;
        font-family: Microsoft JhengHei; 
        font-size: 24px ; 
        font-weight: bold; 
    }

</style>

