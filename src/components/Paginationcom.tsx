import React from 'react';
import { Pagination } from 'antd';

const Paginationcom: React.FC<any> = (props) => {
    const onChange = (page:number, pageSize:number) => {
        props.onChange(page, pageSize);
    };
    return (
        <Pagination defaultCurrent={1} total={500} onChange={onChange} />
    )
}



export default Paginationcom;