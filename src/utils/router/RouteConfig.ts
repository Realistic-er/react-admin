import React, { Component, lazy, Suspense } from "react";
import { useSelector, } from "react-redux";
import { selectAccount, } from "../../store/reducer/saveaccount";

interface routetype {
    key: string,
    label: string,
    auth?: string[],
    component: any,
    children: routetype[],
}
const DashBoard = lazy(() => import('../../views/dashboard/DashBoard'));
const DataMonitor = lazy(() => import('../../views/monitor/DataMonitor'));
const Partmonitor = lazy(() => import('../../views/monitor/partmonitor'));
const Processmonitor = lazy(() => import('../../views/monitor/ProcessMonitor'));
const Salemonitor = lazy(() => import('../../views/monitor/SaleMonitor'));
const sourcematerial = lazy(() => import('../../views/charge/SourceMaterial'));
const Infocharge = lazy(() => import('../../views/charge/InfoCharge'));
const Animation = lazy(() => import('../../views/components/Animation'));
const Home = lazy(() => import('../../components/Animation/Home'));
const About = lazy(() => import('../../components/Animation/About'));
const Charts = lazy(() => import('../../views/components/Charts'));


const routeconfig = [
    {
        key: '',
        label: '首页',
        auth: ['admin', 'visit'],
        component: DashBoard,
    },
    {
        key: 'monitor/datamonitor',
        label: '数据监控',
        auth: ['admin', 'visit'],
        component: DataMonitor,
    },
    {
        key: 'monitor/partmonitor',
        label: '部门监控',
        auth: ['admin', 'visit'],
        component: Partmonitor,
    },
    {
        key: 'monitor/processmonitor',
        label: '流程监控',
        auth: ['admin', 'visit'],
        component: Processmonitor,
    },
    {
        key: 'monitor/salemonitor',
        label: '货品监控',
        auth: ['admin', 'visit'],
        component: Salemonitor,
    },
    {
        key: 'charge/sourcematerial',
        label: '素材管理',
        auth: ['admin', 'visit'],
        component: sourcematerial,
    },
    {
        key: 'charge/infocharge',
        label: '信息管理',
        auth: ['admin', 'visit'],
        component: Infocharge,
    },
    {
        key: 'components/animation',
        label: '动画',
        auth: ['admin', 'visit'],
        component: Animation,
        children: [
            {
                key: '',
                label: '主页',
                auth: ['admin', 'visit'],
                component: Home,
            },
            {
                key: 'about',
                label: '关于',
                auth: ['admin', 'visit'],
                component: About,
            }
        ],
    },
    {
        key: 'components/charts',
        label: '图表',
        auth: ['admin', 'visit'],
        component: Charts,
    },
];
export default routeconfig;