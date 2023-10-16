import React, { lazy, Suspense, } from "react";
import {
BrowserRouter as Router, Route, Routes, Navigate
} from 'react-router-dom';
import routeconfig from '../utils/router/RouteConfig';
import Private from '../components/Authroute';
import SpinLoading from '../components/Spin';
const LoginMoudle = lazy(() => import('../pages/Login/LoginMoudle'));
const LayoutMenu = lazy(() => import('../pages/Layout/LayoutMenu'));
const Notfound = lazy(() => import('../pages/Error/Notfound'));
const Notpermission = lazy(() => import('../pages/Error/Notpermission'));


const routes:React.FC<any> = () => {
    return (
        <Router>
            <Suspense fallback={<SpinLoading />}>
                <Routes>
                    <Route path=''  Component={LoginMoudle}></Route>
                    <Route path='/layout' Component={LayoutMenu}>
                        {
                           routeconfig.map((v:any) => {
                                return <Route Component={v.component} path={v.child_url} key={v.child_url}/>
                           })
                        }
                    </Route>
                    {/*  */}
                    <Route path='/401'  Component={Notpermission}></Route>
                    <Route path='*'  Component={Notfound}></Route>
                </Routes>
            </Suspense>
        </Router>
    )
};

export default routes;