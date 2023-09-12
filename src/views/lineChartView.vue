<script>

    import Chart from 'chart.js/auto';
    import { airPollutionPath, waterPollutionPath, poisonPath, industrialWastePath, dictItemEn2ch } from '../constants/constants.js'

    export default{
        name: 'lineChartView',
        mounted(){
            // 宣告左邊HSD圓餅圖
            const canvas = this.$refs.pieChart;
            canvas.style.width = '600px';
            canvas.style.height = '600px';
            this.createHSDPieChart();    
        },
        data(){
            return {
                // 從constants.js 引用的參數
                airPollutionPath,
                waterPollutionPath,
                poisonPath, 
                industrialWastePath, 
                dictItemEn2ch,

                arrayItems: ['airPollution','waterPollution', 'poison', 'industrialWaste'],
                dictImgNames: {'airPollution': airPollutionPath ,'waterPollution': waterPollutionPath, 'poison': poisonPath, 'industrialWaste': industrialWastePath},
    
                
            }
        },
        props: ['modeOfPieChart', 'colorBar', 'mode'],
        methods:{

            // 建立左邊HSD圓餅圖
            createHSDPieChart() {
                const ctx = this.$refs.pieChart.getContext('2d');

                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: this.modeOfPieChart,
                        datasets: [
                            {
                                data: [1, 1, 1, 1],
                                backgroundColor: [this.colorBar[1],  this.colorBar[2], this.colorBar[3], this.colorBar[0]]
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
                        animation: {
                                onComplete: (animation) => {
                                    var chartInstance = animation.chart;
                                    var ctx = chartInstance.ctx;
                                    ctx.font = '32px Arial';
                                    ctx.fillStyle = '#ffffff';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    
                                    const startAngle = Math.PI / 2;   // 90度，弧度表示
                                    const endAngle = Math.PI;         // 180度，弧度表示
                                    const middleAngle = (startAngle + endAngle) / 2;
                                    const centerX = (chartInstance.chartArea.left + chartInstance.chartArea.right) / 2;
                                    const centerY = (chartInstance.chartArea.top + chartInstance.chartArea.bottom) / 2;
                                    const pieRadius = Math.min((chartInstance.chartArea.right - chartInstance.chartArea.left) / 2, (chartInstance.chartArea.bottom - chartInstance.chartArea.top) / 2);
                                    const offset = 85

                                    var centerLabel = this.modeOfPieChart[1]
                                    var textX = centerX + pieRadius * Math.cos(middleAngle) + offset
                                    var textY = centerY - pieRadius * Math.sin(middleAngle) + offset
                                    ctx.fillText(centerLabel, textX, textY);
                                    
                                    var centerLabel = this.modeOfPieChart[0]
                                    var textX = centerX - pieRadius * Math.cos(middleAngle) - offset
                                    var textY = centerY - pieRadius * Math.sin(middleAngle) + offset
                                    ctx.fillText(centerLabel, textX, textY);

                                    var centerLabel = this.modeOfPieChart[3]
                                    var textX = centerX - pieRadius * Math.cos(middleAngle) - offset
                                    var textY = centerY + pieRadius * Math.sin(middleAngle) - offset
                                    ctx.fillText(centerLabel, textX, textY);

                                    var centerLabel = this.modeOfPieChart[2]
                                    var textX = centerX + pieRadius * Math.cos(middleAngle) + offset
                                    var textY = centerY + pieRadius * Math.sin(middleAngle) - offset
                                    ctx.fillText(centerLabel, textX, textY);
                                }
                            },
                        }
                    }
                );
            },

        },


    }
</script>

<template>    
    
    <div class="row">
        <div class="col-6">
            <br><br><br><br><br><br><br><br>
            <label class="myView-thirdPageLable">環保</label>
            <br><br><br><br><br><br>
            <div>
                <canvas ref="pieChart"></canvas>
            </div>
        </div>
        <div class="col-6">
            <div class="myShowTable-wrapper">
                <br>
                <label class="myView-thirdPageLable">南科廠環保風險曲線圖</label>
                <br><br>
                <div v-for="itemsName in arrayItems">
                    <div class="row">
                        <div class="col-2 parent-container mySmallPieChartInTabel-title">{{ dictItemEn2ch[itemsName] }}</div>
                        <div class="col-9">
                            <img :src="require('@/assets/'+dictImgNames[itemsName])" style="width: 750px; height: 200px">
                        </div>
                    </div>
                    <br><br>
                </div>
            </div>
        </div>
    </div>

    
</template>



<style>

    @import '@/assets/myShowTable.css';
    @import '@/assets/myView.css';

    .parent-container {
        display: flex;
        align-items: center;
    }

</style>

