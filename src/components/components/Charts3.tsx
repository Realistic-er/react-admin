import React, { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';
// import Icon, { AppstoreOutlined } from '@ant-design/icons';
import * as Icon from '@ant-design/icons';
import styles from '../../style/views/charts.module.scss';
import { array, arraytype } from '../../utils/map/datashow';

const Charts3: React.FC = () => {
    const ref3 = useRef(null);
    useEffect(() => {
        // 基于准备好的dom，初始化echarts实例
        let myChart:any = null;
        myChart = echarts.init(ref3.current);
        const option = {
            title: {
                text: `总授予`,
                x: 'center',
                textStyle: {
                    color: 'rgba(0, 0, 0, 0.9)',
                    fontWeight: 400,
                    fontSize: 14,
                },
            },
            tooltip: {
                trigger: 'item',
                //提示框浮层内容格式器，支持字符串模板和回调函数形式。
                formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            legend: {
                orient: 'horizontal',
                bottom: 5,
                data: ['已分配', '剩余'],
                itemWidth: 8,
                itemHeight: 8,
                icon: 'circle',
                borderRadius: 16,
            },
            series: [
                {
                    name: `总授予`,
                    type: 'pie',
                    width: 200,
                    height: 200,
                    top: 8,
                    left: 'center',
                    data: [
                        {
                            value: 1111,
                            name: '已分配',
                            label: {
                                show: true,
                                //自定义内容
                                formatter: String('paramAssign'),
                                /* formatter: () => {
                                    if (paramAssign && paramAssign !== 0) {
                                        return String(paramAssign);
                                    } else {
                                        return '';
                                    }
                                }, */
                                color: '#fff',
                            },
                            itemStyle: { color: '#41D1A6' },
                        },
                        {
                            value: 1111,
                            name: '剩余',
                            label: {
                                show: true,
                                //自定义内容
                                formatter: String('1111'),
                                color: '#fff',
                            },
                            itemStyle: { color: '#607CE9' },
                        },
                    ],
                    clockwise: false, //是否顺时针
                    label: {
                        //去除饼图的指示折线label
                        normal: {
                            show: false,
                            position: 'inside',
                            formatter: '{b}:{d}%',
                        },
                    },
                },
            ],
        };
        myChart.setOption(option);
    }, []);
    return (
        <div ref={ref3} style={{width: '100%',height: '100%'}}>

        </div>
    )
};

export default Charts3;