import React from 'react';
import {
  BrowserRouter as Router, useNavigate, Outlet, useLocation
  } from 'react-router-dom';
  import { useSelector, useDispatch } from "react-redux";
import {
  selectCollapse,
} from "../../store/reducer/operamenu";
import {
  updateTagArray,
} from "../../store/reducer/tagopera";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  DiffOutlined,
  SlidersOutlined,
  PieChartOutlined,
  DatabaseOutlined,
  SlackOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import styles from  '../../style/pages/LayoutMenu.module.scss';
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
interface item {
  key: string,
  label: string,
  auth?: string[],
  icon: React.ReactNode,
  children?: item[],
}
const items:item[] = [
    {
      key: '/layout',
      label: '首页',
      auth: ['admin', 'visit'],
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
        },
        {
          key: '/layout/monitor/partmonitor',
          label: '部门监控',
          auth: ['admin', 'visit'],
          icon: <MailOutlined />,
        },
        {
          key: '/layout/monitor/processmonitor',
          label: '流程监控',
          auth: ['admin', 'visit'],
          icon: <SlidersOutlined />,
        },
        {
          key: '/layout/monitor/salemonitor',
          label: '货品监控',
          auth: ['admin', 'visit'],
          icon: <PieChartOutlined />,
        },
      ]
    },
    {
      key: '/layout/charge',
      label: '管理',
      icon: <ContainerOutlined />,
      children: [
        {
          key: '/layout/charge/sourcematerial',
          label: '素材管理',
          auth: ['admin', 'visit'],
          icon: <DatabaseOutlined />,
        },
        {
          key: '/layout/charge/infocharge',
          label: '信息管理',
          auth: ['admin', 'visit'],
          icon: <DiffOutlined />,
        },
      ]
    },
    {
      key: '/layout/components',
      label: '组件',
      icon: <SlackOutlined />,
      children: [
        {
          key: '/layout/components/animation',
          label: '动画',
          auth: ['admin', 'visit'],
          icon: <LoadingOutlined />,
        },
      ]
    },
];

const LayoutMenu: React.FC = () => {
  const collapsed = useSelector(selectCollapse);
  const account = window.localStorage.getItem('account');
  const array:any = [];
  items.forEach((v:item) => {
    if (!v.children && account && v.auth?.indexOf(account) !== -1) {
      array.push(v);
    } else {
      const obj:item = v;
      if (obj.children) {
        obj.children.map((i:any) => {
          return i.auth?.indexOf(account) !== -1;
        })
        array.push(obj);
      }
    }
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onJump = (e:any) => {
    dispatch(updateTagArray(e.key));
    navigate(e.key);
  };
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className={styles.layout}>
      <div  className={styles.menu}>
        <Menu
          defaultSelectedKeys={[pathname]}
          style={{ width: collapsed ? '80px' : '256px' }}
          // defaultOpenKeys={['sub1']}
          selectedKeys={[pathname]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={array}
          onClick={onJump}
        />
      </div>
      {/*  */}
      <div className={collapsed ? `${styles.outletchange}` : `${styles.outlet}`} >
        {/* header */}
        <LayoutHeader />
        {/* 路由出口 */}
        <Outlet />
        
      </div>
    </div>
    
  );
};

export default LayoutMenu;