<script>

    import apiServices from '@/services/apiServices';
    import AjaxAPI from '../components/AjaxAPI.vue';

    export default{
        name: 'workSafeMenu',
        components:{
            AjaxAPI,
        },
        mounted(){

            this.getFactoryMenu()
        },
        
        props: ['selectMode', 'month', 'factory'],
        data(){
            return {
                
                tableData: [],
                dictReturnValue: {},

            }
        },

        methods:{

            async getFactoryMenu(){
                var apiUrl = apiServices.workSafeMenuURL
                var mode = 'workSafeMenu'
                var passParameterToApiModel = {'selectMode': this.selectMode, 'month': this.month, 'factory': this.factory}
                var passApiInformation = await this.$refs.refAjaxAPI.ajaxPostMethodPromise(apiUrl, mode, passParameterToApiModel)
                this.tableData = passApiInformation['workSafeMenu']
                this.dictReturnValue = {'tableData': this.tableData, 'mode': 'workSafeMenu'}

                this.$emit('tableDataFetched', this.dictReturnValue);
                this.tableData = []

            }          
        },
    }
</script>

<template>    

    <AjaxAPI ref="refAjaxAPI"></AjaxAPI>

</template>

<style>


</style>

