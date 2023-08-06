import React, { useEffect, useState, useRef } from 'react';
import { Outlet } from 'react-router';
import styles from '../../../style/components/circle.module.scss';

const Circle: React.FC = () => {
    return (
        <div className={styles.animatewave}>
            <div className={styles.ws1}></div>
            <div className={styles.ws2}></div>
            <div className={styles.ws3}></div>
            <div className={styles.ws4}></div>
            <div className={styles.ws5}></div>
            <div className={styles.ws6}></div>
        </div>
    )
};

export default Circle;