import React, { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';
// import Icon, { AppstoreOutlined } from '@ant-design/icons';
import * as Icon from '@ant-design/icons';
import styles from '../../style/views/charts.module.scss';
import { array, arraytype } from '../../utils/map/datashow';

const Charts4: React.FC = () => {
    const ref3 = useRef(null);
    useEffect(() => {
        // 基于准备好的dom，初始化echarts实例
        let myChart:any = null;
        myChart = echarts.init(ref3.current);
        // Generate data
        const category = [];
        let dottedBase = +new Date();
        const lineData = [];
        const barData = [];
        for (let i = 0; i < 20; i++) {
        const date = new Date((dottedBase += 3600 * 24 * 1000));
        category.push(
            [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
        );
        const b = Math.random() * 200;
        const d = Math.random() * 200;
        barData.push(b);
        lineData.push(d + b);
        }
        // option
        const option = {
        backgroundColor: '#0f375f',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            }
        },
        legend: {
            data: ['line', 'bar'],
            textStyle: {
            color: '#ccc'
            }
        },
        xAxis: {
            data: category,
            axisLine: {
            lineStyle: {
                color: '#ccc'
            }
            }
        },
        yAxis: {
            splitLine: { show: false },
            axisLine: {
            lineStyle: {
                color: '#ccc'
            }
            }
        },
        series: [
            {
            name: 'line',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: lineData
            },
            {
            name: 'bar',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
                borderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#14c8d4' },
                { offset: 1, color: '#43eec6' }
                ])
            },
            data: barData
            },
            {
            name: 'line',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(20,200,212,0.5)' },
                { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
                { offset: 1, color: 'rgba(20,200,212,0)' }
                ])
            },
            z: -12,
            data: lineData
            },
            {
            name: 'dotted',
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
                color: '#0f375f'
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData
            }
        ]
        };
        myChart.setOption(option);
    }, []);
    return (
        <div ref={ref3} style={{width: '100%',height: '100%'}}>

        </div>
    )
};

export default Charts4;