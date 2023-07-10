import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route, Routes, useNavigate, Outlet
  } from 'react-router-dom';
  import { useSelector, useDispatch } from "react-redux";
import {
    selectCollapse,
    updateCollapsed,
  } from "../../store/reducer/operamenu";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import array from '../../utils/router/RouteConfig';
import '../../style/pages/LayoutMenu.scss';
import LayoutHeader from '../../components/LayoutHeader';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items = [
  {
      key: '/layout',
      label: '首页',
      auth: ['admin', 'visit'],
      // children: [],
      icon: <AppstoreOutlined />,
  },
  {
      key: '/layout/monitor',
      label: '监控',
      icon: <ContainerOutlined />,
      children: [
        {
          key: '/layout/monitor/datamonitor',
          label: '数据监控',
          auth: ['admin', 'visit'],
          icon: <DesktopOutlined />,
        }
      ]
  },
];

const LayoutMenu: React.FC = () => {
  const collapsed = useSelector(selectCollapse);
  const navigate = useNavigate();
  const onJump = (e:any) => {
    navigate(e.key);
  };
  return (
    <div className="layout">
      <div style={{ width: collapsed ? 80 : 256 }} className='menu'>
        {/* <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button> */}
        <Menu
          defaultSelectedKeys={['/layout/dashboard']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
          onClick={onJump}
        />
      </div>
      {/*  */}
      <div className="outlet">
        {/* header */}
        <LayoutHeader />
        {/* 路由出口 */}
        <Routes >
        {
          array.map((v) => {
            return <Route path={v.key} Component={v.component} key={v.key}></Route>
          })
        }
        </Routes>
        
      </div>
    </div>
    
  );
};

export default LayoutMenu;