// AuthRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const Private = (props:any) => {
    const { Component } = props;
    const auth = window.localStorage.getItem('account');
    return auth !== null ? <Component /> : <Navigate to="/401" />
}

export default Private;