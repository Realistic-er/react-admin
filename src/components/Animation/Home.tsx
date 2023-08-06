import React, { useState } from 'react';
import { Button, Dropdown, Space } from 'antd';
import { PlayCircleOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Circle from './homecomponents/circle';
import styles from  '../../style/components/home.module.scss';

const Home: React.FC = () => {

  return (
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
                <PlayCircleOutlined />
                <Circle />
            </div>
        </div>
    </div>
  );
};

export default Home;