<script>

    import apiServices from '@/services/apiServices';
    import AjaxAPI from '../components/AjaxAPI.vue';

    export default{
        name: 'occupationalDisasterMenu',
        components:{
            AjaxAPI,
        },
        mounted(){

            this.getOccupationalDisasterMenu()
        },
        
        props: ['month', 'factory'],
        data(){
            return {
                
                tableData: [],
                dictReturnValue: {},
                
            }
        },

        methods:{

            async getOccupationalDisasterMenu(){
                var apiUrl = apiServices.occupationalDisasterMenuURL
                var mode = 'occupationalDisasterMenu'
                var passParameterToApiModel = {'month': this.month, 'factory': this.factory}
                var passApiInformation = await this.$refs.refAjaxAPI.ajaxPostMethodPromise(apiUrl, mode, passParameterToApiModel)
                this.tableData = passApiInformation['occupationalDisasterMenu']
                this.dictReturnValue = {'tableData': this.tableData, 'mode': 'occupationalDisasterMenu'}

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

