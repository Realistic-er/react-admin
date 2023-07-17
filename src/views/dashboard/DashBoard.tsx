import React, { Component, useRef } from "react";
import { Table, Button, Space, message, Popconfirm } from 'antd';
import {
    QuestionCircleOutlined
  } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import Addboard from '../../components/dashboard/Addboard';
import styles from  '../../style/views/dashboard.module.scss';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
  }
  
  
const DashBoard: React.FC = () => {
    const childRef = useRef();
    const edit = (record:DataType) => {
      (childRef.current as any).showModalEdit(record);
    };
    const columns: ColumnsType<DataType> = [
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '年龄', dataIndex: 'age', key: 'age' },
        { title: '地址', dataIndex: 'address', key: 'address' },
        { title: '描述', dataIndex: 'description', key: 'description' },
        {
          title: '操作',
          dataIndex: '',
          key: 'x',
          render: (_, record) => (
            <Space size="middle">
                {/* <a>Invite {record.name}</a>
                <a>Delete</a> */}
                <Button type="link" onClick={() => edit(record)}>编辑</Button>
                <Popconfirm
                    title="删除"
                    description={'确认要删除'+ `${record.name}`+'?'}
                    onConfirm={confirm}
                    onCancel={cancel}
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                > 
                    <Button type="link">删除</Button>
                </Popconfirm>
                
            </Space>
          ),
        },
      ];
      
    const data: DataType[] = [
      {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      },
      {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
      },
      {
        key: 3,
        name: 'Not Expandable',
        age: 29,
        address: 'Jiangsu No. 1 Lake Park',
        description: 'This not expandable',
      },
      {
        key: 4,
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
      },
    ];
    const [messageApi, contextHolder] = message.useMessage();
    const confirm = () =>{
      messageApi.open({
        type: 'success',
        content: '删除成功',
      });
    };
    const cancel = () =>{
      messageApi.open({
        type: 'warning',
        content: '取消删除',
      });
    };
    const clickBtn = () =>{
      (childRef.current as any).showModal();
    };
  return (
    
      <div className={styles.dashboard}>
          {contextHolder}
          <Button type="primary" onClick={clickBtn}>新增</Button>
          <Table
            columns={columns}
            bordered
            dataSource={data}
          />
          {/*  */}
          <Addboard ref={childRef} />
      </div>
  )
}

export default DashBoard;