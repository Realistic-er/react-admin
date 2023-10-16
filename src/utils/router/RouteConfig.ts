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
const Animation = lazy(() => import('../../views/components/Animation'));
const Home = lazy(() => import('../../components/Animation/Home'));
const About = lazy(() => import('../../components/Animation/About'));
const Charts = lazy(() => import('../../views/components/Charts'));
const menu = JSON.parse(window.localStorage.getItem('menu') as string);



const routeconfig:any = [];
menu.forEach((v:any) => {
    if (v.children) {
        v.children.forEach((i:any) => {
            i.component = lazy(() => import('../../views/' + i.child_url));
            routeconfig.push(i)
        })
    } else {
        v.component = lazy(() => require('../../views/' + v.child_url));
        routeconfig.push(v)
    }
});
export default routeconfig;