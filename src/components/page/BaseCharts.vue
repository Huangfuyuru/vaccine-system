<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> 图表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <schart class="schart" canvasId="bar" :options="options1"></schart>
            </div>
            <div>
                <schart class="schart" canvasId="line" :options="options2"></schart>
            </div>
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart';
export default {
    name: 'basecharts',
    components: {
        Schart
    },
    data() {
        return {
            options1: {
                type: 'bar',
                title: {
                    text: '一类疫苗'
                },
                bgColor: '#fbfbfb',
                labels: ['一月', '二月', '三月', '四月', '五月','六月', '七月', '八月', '九月', '十月','十一月', '十二月'],
                datasets: [
                    {
                        label: '卡介',
                        fillColor: 'rgba(241, 200, 74, 0.5)',
                        data: [ 270, 190, 230,321,111,333,111,111,444,222,111,88],
                        
                    },
                    {
                        label: '乙肝',
                        fillColor: 'rgba(241, 49, 84, 0.5)',
                        data: [ 271, 190, 230,321,111,333,111,111,444,222,111,88]
                    },
                    {
                        label: '甲肝',
                        fillColor: 'rgba(21, 49, 74, 0.5)',
                        data: [ 272, 190, 230,321,111,333,111,111,444,222,111,88]
                    },
                    {
                        label: '脊髓灰质炎',
                        fillColor: 'rgba(251, 49, 44, 0.5)',
                        data: [ 273, 190, 230,321,111,333,111,111,444,222,111,88]
                    },
                    {
                        label: '无细胞百白破疫苗',
                        fillColor: 'rgba(241, 69, 74, 0.5)',
                        data: [ 270, 190, 230,321,111,333,111,111,444,222,111,88]
                    },
                    {
                        label: '麻风疫苗',
                        fillColor: 'rgba(211, 49, 74, 0.5)',
                        data: [ 270, 190, 230,321,111,333,111,111,444,222,111,88]
                    },
                    {
                        label: '乙脑减毒活疫苗',
                        fillColor: 'rgba(41, 99, 74, 0.5)',
                        data: [ 270, 190, 230,321,111,333,111,111,444,222,111,88]
                    },
                    {
                        label: '流脑疫苗',
                        fillColor: 'rgba(241, 49, 74, 0.5)',
                        data: [ 270, 190, 230,321,111,333,111,111,444,222,111,88]
                    },
                ]
            },
            options2: {
                type: 'bar',
                title: {
                    text: '二类疫苗'
                },
                bgColor: '#fbfbfb',
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230],
                    },
                    {
                        label: '百货',
                        data: [164, 178, 150, 135, 160],
                    },
                    {
                        label: '食品',
                        data: [114, 138, 200, 235, 190],
                    }
                ]
            }
        };
    }
};
</script>

<style scoped>
.schart-box {
    display: inline-block;
    margin: 20px;
}
.schart {
    width: 1500px;
    height: 400px;
}
.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
</style>