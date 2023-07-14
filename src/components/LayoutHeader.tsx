import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {
    selectCollapse,
    updateCollapsed,
  } from "../store/reducer/operamenu";
  import {
    selectTagArray,
    updateTagArray,
    deleteTagArray,
  } from "../store/reducer/tagopera";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    CloseOutlined,
  } from '@ant-design/icons';
import { Button, Avatar, Tag } from 'antd';
import '../style/components/layoutheader.scss';

interface tageType {
    label: string,
    key: string,
}
const LayoutHeader:React.FC = () => {
    const dispatch = useDispatch();
    const tagArray = useSelector(selectTagArray);
    const location = useLocation();
    const navigate = useNavigate();
    const collapsed = JSON.parse(window.localStorage.getItem('collapsed') as string);
    const toggleCollapsed = () => {
        dispatch(updateCollapsed());
    };
    const close = (item:tageType) => {
        const index = tagArray.indexOf(item);
        const path = tagArray[index-1].key;
        navigate(path);
        dispatch(deleteTagArray(item));
    };
    const jump = (item:tageType) => {
        navigate(item.key);
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
                {
                    tagArray.map((item:tageType,index:number) => {
                        return <Tag key={index} color={item.key === location.pathname ? '#108ee9' : 'purple'} onClick={() => jump(item)}>
                        {item.label}
                        {
                            item.label === '首页' ? null : <CloseOutlined style={{marginLeft: '15px'}} onClick={() => close(item)}/>
                        }
                      </Tag>
                    })
                }
            </div>
        </div>
    )
};

export default LayoutHeader;