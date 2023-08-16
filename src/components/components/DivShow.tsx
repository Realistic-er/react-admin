import React, { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';
// import Icon, { AppstoreOutlined } from '@ant-design/icons';
import * as Icon from '@ant-design/icons';
import styles from '../../style/components/divshow.module.scss';
import { array, arraytype } from '../../utils/map/datashow';

const DivShow: React.FC = () => {
    const string = '88668866';
    const array = string.split('');
    return (
        <div className={styles.divshow}>
            <p>航班人次统计</p>
            <div className={styles.number}>
                {
                    array.map((item:any,index) => {
                        return <span key={index}>{item}</span>
                    })
                }
            </div>
        </div>
    )
};

export default DivShow;