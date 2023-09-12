<script>

    import apiServices from '@/services/apiServices';
    import AjaxAPI from '@/components/AjaxAPI.vue';
    import excelContent from './excelContent.vue';

    export default{
        name: 'importExcel',
        components: {
            AjaxAPI,
            excelContent
        },
        mounted(){
           
        },
        data(){
            return {
                btnHealth: false,
                btnEnvironmentalFriendly: false,
                btnSelectMode: '',
            }
        },
        methods:{
            clickHealth (){
                this.btnHealth = true
                this.btnEnvironmentalFriendly = false
                this.btnSelectMode = '衛生'
            },
            clickEnvironmentalFriendly(){
                this.btnHealth = false
                this.btnEnvironmentalFriendly = true
                this.btnSelectMode = '環保'
            }

        }
       
    }
</script>

<template>    

    

    <AjaxAPI ref="refAjaxAPI"></AjaxAPI>

    <div class="text-center">
        <br>
        <button type="button" class="btn btn-info custom-button" v-bind:onclick="clickEnvironmentalFriendly">環保</button>
        <button type="button" style="margin-left:80px;" class="btn btn-info custom-button" v-bind:onclick="clickHealth" >衛生</button>
        <br><br><br><br>
    </div>
    
    <div v-if="btnHealth==true && btnSelectMode!=''">
        <div class="row justify-content-center align-items-center">
            <div class="card">
                <div class="card-header  custom-card">
                    <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item" id="item1">
                            <a class="nav-link active nav-label" href="#numberPeopleCareOf" data-toggle="tab">關懷人數</a>
                        </li>
                        <li class="nav-item" id="item2">
                            <a class="nav-link nav-label" href="#girlProtection" data-toggle="tab">母性保護</a>
                        </li>
                        <li class="nav-item" id="item3">
                            <a class="nav-link nav-label" href="#healthPromotion" data-toggle="tab">健康促進</a>
                        </li>
                        <li class="nav-item" id="item4">
                            <a class="nav-link nav-label" href="#specialWork" data-toggle="tab">職業病預防</a>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="numberPeopleCareOf">
                            <excelContent ref="refExcelContent"
                                :tableName="'關懷人數'"
                                :btnSelectMode="btnSelectMode">
                            </excelContent>
                        </div>
                        <div class="tab-pane fade" id="girlProtection">
                            <excelContent ref="refExcelContent"
                                :tableName="'母性保護'"
                                :btnSelectMode="btnSelectMode">
                            </excelContent>
                        </div>
                        <div class="tab-pane fade" id="healthPromotion">
                            <excelContent ref="refExcelContent"
                                :tableName="'健康促進'"
                                :btnSelectMode="btnSelectMode">
                            </excelContent>
                        </div>
                        <div class="tab-pane fade" id="specialWork">
                            <excelContent ref="refExcelContent"
                                :tableName="'職業病預防'"
                                :btnSelectMode="btnSelectMode">
                            </excelContent>
                        </div>
                    </div>          
                </div>           
            </div>
        </div>
    </div>
    <div v-else-if="btnEnvironmentalFriendly==true && btnSelectMode!=''">
        <div class="row justify-content-center align-items-center">
            <div class="card">
                <div class="card-header  custom-card">
                    <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item" id="item1">
                        <a class="nav-link active nav-label" href="#airPollution" data-toggle="tab">空汙</a>
                    </li>
                    <li class="nav-item" id="item2">
                        <a class="nav-link nav-label" href="#waterPollution" data-toggle="tab">水汙</a>
                    </li>
                    <li class="nav-item" id="item3">
                        <a class="nav-link nav-label" href="#poison" data-toggle="tab">毒化物</a>
                    </li>
                    <li class="nav-item" id="item4">
                        <a class="nav-link nav-label" href="#industrialWaste" data-toggle="tab">廢棄物</a>
                    </li>
                    </ul>
                </div>
                <div class="card-body">
                    
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="airPollution">
                            <excelContent ref="refExcelContent"
                                :tableName="'空汙'"
                                :btnSelectMode="btnSelectMode">
                            </excelContent>
                        </div>
                        <div class="tab-pane fade" id="waterPollution">
                            <excelContent ref="refExcelContent"
                                :tableName="'水汙'"
                                :btnSelectMode="btnSelectMode">
                            </excelContent>
                        </div>
                        <div class="tab-pane fade" id="poison">
                            <excelContent ref="refExcelContent"
                                :tableName="'毒化物'"
                                :btnSelectMode="btnSelectMode">
                            </excelContent>
                        </div>
                        <div class="tab-pane fade" id="industrialWaste">
                            <excelContent ref="refExcelContent"
                                :tableName="'事業廢棄物'"
                                :btnSelectMode="btnSelectMode">
                            </excelContent>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </div>

    
    
</template>

<style>

    .custom-card  {
        width: 130rem;
    }

    .nav-label{
        text-align: center; /* 文字居中對齊 */
        font-size: 24px ;
        font-weight: bold; 
        color:rgb(103, 99, 114)
    }

    .custom-btn {
        border-color: rgb(173, 170, 170); /* 设置外框线的颜色 */

        background-color: #f8f9fa;
        color: #212529;

        padding: 0.5rem 1rem;
        font-size: 1.25rem;
        line-height: 1.5;
        border-radius: 0.3rem;
    }

    .custom-btn:hover {
        background-color: #e2e6ea;
        border-color: #e2e6ea;
        color: #212529;
    }

    .custom-button {
        /* 设置按钮宽度和高度 */
        width: 500px;
        height: 100px;

        /* 可选：设置文字大小和边框圆角 */
        font-size: 48px;
        border-radius: 10px;
    }

</style>

