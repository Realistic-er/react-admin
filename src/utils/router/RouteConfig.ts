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
interface icontype {
    key: string,
    label: string,
    icon: any,
}
export const menu = JSON.parse(window.localStorage.getItem('menu') as string);
console.log(menu);

export const routeconfig:any = [];
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