import React from "react";
import { Spin } from 'antd';
import style from '../style/components/spin.module.scss';
const SpinLoading:React.FC<any> = () => {
    return (
        <div className={style.spin}>
            <Spin />
        </div>
    )
};

export default SpinLoading;