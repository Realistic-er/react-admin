import React, { lazy, Suspense, } from "react";
import {
BrowserRouter as Router, Route, Routes, Navigate
} from 'react-router-dom';
import routeconfig from '../utils/router/RouteConfig';
import Private from '../components/Authroute';
import SpinLoading from '../components/Spin';
const LoginMoudle = lazy(() => import('../pages/Login/LoginMoudle'));
const LayoutMenu = lazy(() => import('../pages/Layout/LayoutMenu'));

const routes:React.FC<any> = () => {
    return (
        <Router>
            <Suspense fallback={<SpinLoading />}>
                <Routes>
                    <Route path=''  Component={LoginMoudle}></Route>
                    <Route path='/layout/*' Component={LayoutMenu}>
                        {
                           routeconfig.map((v) => {
                                return <Route
                                element={<Private Component={v.component} />}
                                path={v.key} key={v.key}/>
                           })
                        }
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
};

export default routes;