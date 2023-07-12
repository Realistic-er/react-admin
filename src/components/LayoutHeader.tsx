import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    selectCollapse,
    updateCollapsed,
  } from "../store/reducer/operamenu";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { Button, Avatar } from 'antd';
import '../style/components/layoutheader.scss';

const LayoutHeader:React.FC = () => {
    const dispatch = useDispatch();
    const collapsed = JSON.parse(window.localStorage.getItem('collapsed') as string);
    const toggleCollapsed = () => {
        dispatch(updateCollapsed());
    };
    return (
        <div className="layoutheader">
            <div className="top">
                {/* 折叠按钮 */}
                <Button type="link" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                {/*  */}
                <div className="right">
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </div>
            </div>
            <div className="bottom">

            </div>
        </div>
    )
};

export default LayoutHeader;