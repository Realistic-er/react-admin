import React from 'react';
import {
  BrowserRouter as Router, useNavigate, Outlet, useLocation, Link
  } from 'react-router-dom';
  import { useSelector, useDispatch } from "react-redux";
import { Menu } from 'antd';
import  * as Icon from '@ant-design/icons';
import { menu as menuData } from '../../utils/router/RouteConfig';
import {
  selectCollapse,
} from "../../store/reducer/operamenu";
import {
  updateTagArray,
} from "../../store/reducer/tagopera";

import type { MenuProps } from 'antd';
import styles from  '../../style/pages/LayoutMenu.module.scss';
import LayoutHeader from '../../components/LayoutHeader';


type MenuItem = Required<MenuProps>['items'][number];

const { SubMenu } = Menu;
console.log(Menu);
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

const LayoutMenu: React.FC = () => {
  const collapsed = useSelector(selectCollapse);
  const account = window.localStorage.getItem('account');
  const array:any = [];
  const geticon = (iconname:any) =>{
    return  React.createElement((Icon as any)[iconname])
    } 
  const menuTag = (menuData:any) => {
    return menuData.map((item:any) => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu key={item.parent_name} icon={geticon(item.parent_icon)} title={item.parent_name}>
            { menuTag(item.children) }
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.child_path} icon={geticon(item.child_icon)}>
          <Link to={item.child_path} onClick={() => onJump(item)}>{item.child_name}</Link>
        </Menu.Item>)
      })
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onJump = (e:any) => {
    console.log(e)
    dispatch(updateTagArray(e));
    navigate(e.child_path);
  };
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className={styles.layout}>
      <div  className={styles.menu}>
        <Menu
          defaultSelectedKeys={[pathname]}
          style={{ width: collapsed ? '80px' : '256px' }}
          selectedKeys={[pathname]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
           { menuTag(menuData) }
          </Menu>
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