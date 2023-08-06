import React, { useEffect, useState, useRef } from 'react';
import MenuHeader from '../../components/Animation/MenuHeader';
import { Outlet } from 'react-router';
import styles from '../../style/views/animation.module.scss';

const Animation: React.FC = () => {
    return (
        <div className={styles.box}>
            <MenuHeader />
            <Outlet />
        </div>
    )
};

export default Animation;