<script>

    import Chart from 'chart.js/auto';
    import getSafeMenu from '@/components/getSafeMenu.vue';
    import getOccupationalDisasterMenu from '@/components/getOccupationalDisasterMenu.vue'
    import { dictLight2Color } from '../constants/constants.js'

    export default{
        name: 'pieChart',
        components:{
            getSafeMenu,
            getOccupationalDisasterMenu,
        },
        
        mounted(){

            // 宣告小的圓餅圖
            const canvas = this.$refs.pieChart;
            canvas.style.width = '150px';
            canvas.style.height = '150px';

            // 燈號轉換成顏色
            const intervalId = setInterval(() => {
                this.$nextTick(() => {
                    this.lightStatus2RGB()
                    clearInterval(intervalId);
                });
            }, 1000);

        },
        data(){
            return {
                
                colorUpperRight: '#000000',
                colorBottomRight: '#000000',
                colorBottomLeft: '#000000',
                colorUpperLeft: '#00b050',

                selectMode: '',

                btnWorkSafeClick: false,
                btnOccupationalDisasteClick: false,

                 // 從constants.js 使用這些顏色
                 dictLight2Color, 
                
            }
        },

        props: [ 'valueUpperLeft', 'valueUpperRight', 'valueBottomRight', 'valueBottomLeft', 'mode', 'month', 'factory'],
        methods:{

            // 宣告小的圓餅圖
            createHSDPieChart() {
                var self = this
                const ctx = this.$refs.pieChart.getContext('2d');
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['保命條款', '不安全行為', '不安全環境', '職災職能'],
                        datasets: [
                            {
                                data: [1, 1, 1, 1],
                                backgroundColor: [this.colorUpperRight, this.colorBottomRight,  this.colorBottomLeft, this.colorUpperLeft]
                            }
                        ]
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            tooltip: {
                                enabled: false // 禁用默认的tooltip
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 1,
                        onClick: function(event, elements) {
                            // 只針對工安的pirchart可以點選
                            if (elements && elements.length > 0 && self.mode != 'HealthSafety') {
                                var index = elements[0].index;
                                if (index === 0) {
                                    self.selectMode = '保命條款'
                                    self.btnWorkSafeClick = true
                                    var data = {'selectMode': self.selectMode, 'month': self.month, 'factory': self.factory, 'showMenuDetail': false}
                                    self.$emit('modeFetched', data);
                                }
                                else if (index === 1) {
                                    self.selectMode = '職災失能'
                                    self.btnOccupationalDisasteClick = true
                                    var data = {'selectMode': self.selectMode, 'month': self.month, 'factory': self.factory, 'showMenuDetail': false}
                                    self.$emit('modeFetched', data);
                                } 
                                else if (index === 2) {
                                    self.selectMode = '不安全環境'
                                    self.btnWorkSafeClick = true
                                    var data = {'selectMode': self.selectMode, 'month': self.month, 'factory': self.factory, 'showMenuDetail': false}
                                    self.$emit('modeFetched', data);
                                }
                                else if (index === 3) {
                                    self.selectMode = '不安全行為'
                                    self.btnWorkSafeClick = true
                                    var data = {'selectMode': self.selectMode, 'month': self.month, 'factory': self.factory, 'showMenuDetail': false}
                                    self.$emit('modeFetched', data);
                                }
                            }
                        }
                    }
                });
            },

            // getSafeMenu.vue的onTableDataFetched()
            onTableDataFetched(data) {
                this.$emit('tableDataFetched', data);

                // 初始化btnWorkSafeClick/btnOccupationalDisasteClick, 防止資料未刷新的問題
                this.btnWorkSafeClick = false
                this.btnOccupationalDisasteClick = false
            },

            // 燈號轉換成顏色
            async lightStatus2RGB(){

                return new Promise((resolve) => {

                    this.colorUpperLeft = dictLight2Color[this.valueUpperLeft]
                    this.colorUpperRight = dictLight2Color[this.valueUpperRight]
                    this.colorBottomLeft = dictLight2Color[this.valueBottomLeft]
                    this.colorBottomRight = dictLight2Color[this.valueBottomRight]

                    this.createHSDPieChart()
                    resolve();
                        
                });

                
            },


          
        },


    }
</script>

<template>    

    <div>
        <canvas ref="pieChart"></canvas>
    </div>
    <div v-if="btnWorkSafeClick==true">
        <getSafeMenu ref="refGetSafeMenu" 
            @tableDataFetched="onTableDataFetched"
            :selectMode="selectMode"
            :month="month"
            :factory="factory">
        </getSafeMenu>
    </div>
    <div v-if="btnOccupationalDisasteClick==true">
        <getOccupationalDisasterMenu ref="refGetOccupationalDisasterMenu" 
            @tableDataFetched="onTableDataFetched"
            :month="month"
            :factory="factory">
        </getOccupationalDisasterMenu>
    </div>
   
</template>

<style>


</style>

