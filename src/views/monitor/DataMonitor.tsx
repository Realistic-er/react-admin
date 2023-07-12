import React, { useEffect, useState, useRef } from 'react';
import { Space, Table, Tag, Button, Popconfirm, message } from 'antd';
import {
    QuestionCircleOutlined
  } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import Adddata from '../../components/datamonitor/Adddata';
import getdata from '../../utils/api/datamonitor';
import '../../style/views/datamonitor.scss';
interface DataType {
  dataname: string;
  dataage: number;
  status: string;
  email: string;
  text: string;
}



// let data: DataType[] = [];

const Datamonitor: React.FC = () => {
    const childRef = useRef();
    const columns: ColumnsType<DataType> = [
        {
        title: '序号',
        render:(text,record,index)=>`${index+1}`,
        },
      {
        title: '名称',
        dataIndex: 'dataname',
        key: 'dataname',
        render: (text) => <a>{text}</a>,
      },
      {
        title: '年龄',
        dataIndex: 'dataage',
        key: 'dataage',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (_, { status }) => (
            <Tag color={ status === '1' ? 'blue' : 'red' }>
                { status === '1' ? '正常' : '停用' }
            </Tag>
        ),
      },
      {
        title: 'email',
        key: 'email',
        dataIndex: 'email',
      },
      {
        title: '备注',
        key: 'text',
        dataIndex: 'text',
      },
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
                  description={'确认要删除'+ `${record.dataname}`+'?'}
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
    const [data, setData] = useState([]);
    useEffect(() => {
        getdata().then((Response) => {
          setData(Response.data.data.data)
        })
    }, []);
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
    const edit = (record:DataType) => {
      (childRef.current as any).showModalEdit(record);
    };
    const clickBtn = () =>{
      (childRef.current as any).showModal();
    };
    return (
        <div className="datamonitor">
          <Button type="primary" onClick={clickBtn}>新增</Button>
          <Table columns={columns} rowKey={"dataname"}
          dataSource={data} pagination={false} bordered={true}/>
          <Adddata ref={childRef} />
        </div>
        
    )
    
}



export default Datamonitor;