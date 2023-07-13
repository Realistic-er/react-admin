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

const user = window.localStorage.getItem('account');

const routeconfig = [
    {
        key: '',
        label: '首页',
        auth: ['admin', 'visit'],
        component: DashBoard,
        children: [],
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
    }
];
export default routeconfig;