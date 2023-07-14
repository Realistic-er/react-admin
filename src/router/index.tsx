import React, { Component, lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
BrowserRouter as Router, Route, Routes, Navigate
} from 'react-router-dom';
import routeconfig from '../utils/router/RouteConfig';
import {
    selectAccount,
  } from "../store/reducer/saveaccount";
import { Spin } from 'antd';
const LoginMoudle = lazy(() => import('../pages/Login/LoginMoudle'));
const LayoutMenu = lazy(() => import('../pages/Layout/LayoutMenu'));

const routes:React.FC = () => {
    const user = window.localStorage.getItem('account');
    // useEffect(()=>{
    //     console.log(user)
    // },[user]) //count更新时执行
    return (
        <Router>
            <Suspense>
                <Routes>
                    <Route path='' Component={LoginMoudle}></Route>
                    <Route path='/layout/*' Component={LayoutMenu}>
                        {
                           routeconfig.map((v) => {
                                return <Route element={ user !== null && v.auth.indexOf(user) !== -1  ? <v.component /> : <Navigate to='' /> }
                                path={v.key} key={v.key} />
                           }) 
                        }
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
};

export default routes;