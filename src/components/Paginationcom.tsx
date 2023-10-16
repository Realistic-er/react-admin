import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Pagination } from 'antd';

const Paginationcom: React.FC<any> = forwardRef(
    (props, ref) => {
        useImperativeHandle(ref, () => {
            return {
                defaultCurrent: defaultCurrent,
                defaultPageSize: defaultPageSize,
            };
          });
        const onChange = (page:number, pageSize:number) => {
            props.onChange(page, pageSize);
        };
        const defaultCurrent = 1;
        const defaultPageSize = 10;
        return (
            <Pagination defaultCurrent={defaultCurrent} defaultPageSize={defaultPageSize}
            total={props.total} onChange={onChange} />
        )
    }
);

Paginationcom.displayName = 'Paginationcom';

export default Paginationcom;