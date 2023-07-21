import React from 'react';
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
    GithubOutlined,
    WechatOutlined
  } from '@ant-design/icons';
import { Button, Avatar, Tag, Space, Popover, Image } from 'antd';
import styles from  '../style/components/layoutheader.module.scss';

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
    const close = (e:React.MouseEvent<HTMLElement>,item:tageType) => {
        e.preventDefault();
        const currentpath = location.pathname;
        if (currentpath === item.key) {
            const index = tagArray.indexOf(item);
            const path:string = tagArray[index-1].key;
            navigate(path);
            dispatch(deleteTagArray(item));
        } else {
            dispatch(deleteTagArray(item));
        }
    };
    const jump = (item:tageType) => {
        navigate(item.key);
    };
    const content = (
        // <img style={{width:'100px'}} src={require('../assets/wechat.jpg')}></img>
        <Image
            width={200}
            src={require('../assets/wechat.jpg')}
        />
    );
    return (
        <div className={styles.layoutheader}>
            <div className={styles.top}>
                {/* 折叠按钮 */}
                <Button type="link" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                {/*  */}
                <div className={styles.right}>
                <Space size="middle">
                    <Popover placement="bottom" title="加我微信" content={content} trigger="click">
                        <WechatOutlined />
                    </Popover>
                    <a href='https://github.com/Realistic-er/react-admin'>
                        <GithubOutlined />
                    </a>
                    
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Space>
                    
                </div>
            </div>
            <div className={styles.bottom}>
                {
                    tagArray.map((item:tageType,index:number) => {
                        return <Tag key={index} closable={item.label === '首页' ? false : true} color={item.key === location.pathname ? '#108ee9' : 'purple'}
                        onClick={() => jump(item)} onClose={(e) => close(e,item)}>
                        {item.label}
                      </Tag>
                    })
                }
            </div>
        </div>
    )
};

export default LayoutHeader;