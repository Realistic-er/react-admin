import React, { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';
// import Icon, { AppstoreOutlined } from '@ant-design/icons';
import * as Icon from '@ant-design/icons';
import styles from '../../style/views/charts.module.scss';
import { array, arraytype } from '../../utils/map/datashow';

const Charts2: React.FC = () => {
    const ref2 = useRef(null);
    useEffect(() => {
        // 基于准备好的dom，初始化echarts实例
        let myChart:any = null;
        myChart = echarts.init(ref2.current);
        const option = {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              top: '5%',
              left: 'left'
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: ['30%', '50%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [
                  { value: 1048, name: 'Search Engine' },
                  { value: 735, name: 'Direct' },
                  { value: 580, name: 'Email' },
                  { value: 484, name: 'Union Ads' },
                  { value: 300, name: 'Video Ads' }
                ]
              }
            ]
          };
        myChart.setOption(option);
    }, []);
    return (
        <div ref={ref2} style={{width: '100%',height: '100%'}}>

        </div>
    )
};

export default Charts2;