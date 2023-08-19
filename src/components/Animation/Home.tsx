import React, { useState } from 'react';
import { Button, Dropdown, Space } from 'antd';
import { PlayCircleOutlined, ClockCircleOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { seriesarray } from '../../utils/animation/imgseries';
import styles from  '../../style/components/home.module.scss';

const Home: React.FC = () => {

  return (
    <div className={styles.container}>
        <div className={styles.home}>
            {/* 左边 */}
            <div className={styles.left}>
                <div className={styles.div1}>
                    <h1>WE BUILD THINGS DIFFERENTLY</h1>
                </div>
                <p className={styles.div2}>
                    Dignissimos,quas aliqua modi repellendus taciti maiores laborum fames,egestas
                    <br></br>
                    facilisis ultricies consequatur laoreet assumenda,vehicula eos vero
                </p>
                <div className={styles.div3}>
                    {/* 按钮 */}
                    <Button>secondary</Button>
                    {/* 波浪图标 */}
                    <PlayCircleOutlined className={styles.ani} />
                    {/* <Circle /> */}
                </div>
            </div>
        </div>
        {/*  */}
        <div className={styles.imgshow}>
            {/*  */}
            <p className={styles.header}>MILLION VIEWS ANIMATION</p>
            {/*  */}
            <ul>
                {
                    seriesarray.map((item,index) => {
                        return <li key={index}>
                                <p className={styles.text}>{item.text}</p>
                                <div className={styles.desc}>
                                    <span>{item.desc1}</span>
                                    <span>{item.desc2}</span>
                                    <span>{item.desc3}</span>
                                    <ClockCircleOutlined />
                                    <span>{item.time}</span>
                                </div>
                                <img src={item.src} alt="" />
                        </li>
                    })
                }
            </ul>
        </div>
    </div>
    
  );
};

export default Home;