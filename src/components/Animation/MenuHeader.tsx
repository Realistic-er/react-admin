import React, { useState } from 'react';
import {
  BrowserRouter as Router, useNavigate, Outlet, useLocation
  } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
  {
    label: '首页',
    key: '/layout/components/animation',
    icon: <MailOutlined />,
  },
  {
    label: '关于',
    key: '/layout/components/animation/about',
    icon: <MailOutlined />,
  },
];

const MenuHeader: React.FC = () => {
  const [current, setCurrent] = useState('mail');
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default MenuHeader;