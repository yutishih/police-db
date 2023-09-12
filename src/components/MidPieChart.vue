<script>

    import Chart from 'chart.js/auto';

    export default{
        name: 'pieChart',
        props: ['colorUpperRight', 'colorBottomRight', 'colorBottomLeft', 'colorUpperLeft', 'modeOfPieChart'],
        mounted(){

            const intervalId = setInterval(() => {
                this.$nextTick(() => {
                    if (this.colorUpperRight) {
                        const canvas = this.$refs.pieChart;
                        canvas.style.width = '450px';
                        canvas.style.height = '450px';
                        this.createHSDPieChart();
                        clearInterval(intervalId);
                    }
                });
            }, 1000);
        },
        data(){
            return {
                
               
            }
        },
        methods:{

            createHSDPieChart() {
                const ctx = this.$refs.pieChart.getContext('2d');
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: this.modeOfPieChart,
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
                        animation: {
                            onComplete: (animation) => {
                                var chartInstance = animation.chart;
                                var ctx = chartInstance.ctx;
                                ctx.font = 'bold 32px Arial';
                                ctx.fillStyle = '#ffffff';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                
                                const startAngle = Math.PI / 2;   // 90度，弧度表示
                                const endAngle = Math.PI;         // 180度，弧度表示
                                const middleAngle = (startAngle + endAngle) / 2;
                                const centerX = (chartInstance.chartArea.left + chartInstance.chartArea.right) / 2;
                                const centerY = (chartInstance.chartArea.top + chartInstance.chartArea.bottom) / 2;
                                const pieRadius = Math.min((chartInstance.chartArea.right - chartInstance.chartArea.left) / 2, (chartInstance.chartArea.bottom - chartInstance.chartArea.top) / 2);
                                const offset = 65

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
                });
            },
        }
    }
</script>

<template>    

    <div>
        <canvas ref="pieChart"></canvas>
    </div>
   
</template>

<style>


</style>

