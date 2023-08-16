import React, { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';
// import Icon, { AppstoreOutlined } from '@ant-design/icons';
import * as Icon from '@ant-design/icons';
import styles from '../../style/views/charts.module.scss';
import { array, arraytype } from '../../utils/map/datashow';

const Charts1: React.FC = () => {
    const ref1 = useRef(null);
    useEffect(() => {
        // 基于准备好的dom，初始化echarts实例
        let myChart:any = null;
        myChart = echarts.init(ref1.current);
        const option = {
            tooltip:{
                trigger: 'axis'
            },
            xAxis: {
                data: ['星期一','星期二','星期三','星期四','星期五']
            },
            yAxis: {
                type: 'value'
            },
            series : [
                {
                    name:'A',
                    type:'bar',
                    barWidth: '15%',
                    data:[800, 300, 200, 230, 180]
                },
                {
                    name:'B',
                    type:'bar',
                    barWidth: '15%',
                    data:[100, 180, 220, 310, 220]
                },
                {
                    name:'C',
                    type:'bar',
                    barWidth: '15%',
                    data:[300, 800, 120, 180, 130]
                }
            ]
        };
        myChart.setOption(option);
    }, []);
    return (
        <div ref={ref1} style={{width: '100%',height: '100%'}}>

        </div>
    )
};

export default Charts1;