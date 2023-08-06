import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import styles from  '../../style/components/home.module.scss';

const Home: React.FC = () => {

  return (
    <div className={styles.home}>
        主页
    </div>
  );
};

export default Home;