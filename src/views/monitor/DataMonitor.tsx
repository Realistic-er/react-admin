import React, { useEffect, useState, useRef } from 'react';
import { Space, Table, Tag, Button, Popconfirm, message } from 'antd';
import {
    QuestionCircleOutlined
  } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import Adddata from '../../components/datamonitor/Adddata';
import Paginationcom from '../../components/Paginationcom';
import { getdata, deletedata } from '../../utils/api/datamonitor';
import styles from  '../../style/views/datamonitor.module.scss';
interface DataType {
  data_name: string;
  data_age: number;
  data_status: number;
  email: string;
  text: string;
}

const Datamonitor: React.FC = () => {
    const childRef = useRef();
    const columns: ColumnsType<DataType> = [
        {
        title: '序号',
        render:(text,record,index)=>`${index+1}`,
        },
      {
        title: '名称',
        dataIndex: 'data_name',
        key: 'data_name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: '年龄',
        dataIndex: 'data_age',
        key: 'data_age',
      },
      {
        title: '状态',
        dataIndex: 'data_status',
        key: 'data_status',
        render: (_, { data_status }) => (
            <Tag color={ data_status === 1 ? 'blue' : 'red' }>
                { data_status === 1 ? '正常' : '停用' }
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
                  description={'确认要删除'+ `${record.data_name}`+'?'}
                  onConfirm={() => confirm(record)}
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
    const [total, setTotal] = useState();
    const getdatasource = () => {
      getdata(1, 10).then((Response) => {
        setData(Response.data.results);
        setTotal(Response.data.total);
      })
    }
    useEffect(() => {
      getdatasource()
    }, []);
    const confirm = (record:any) =>{
      const { id } = record;
      deletedata({ id }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          message.success({
            content: '删除成功',
          });
        } else {
          message.error({
            content: '删除s',
          });
        }
      })
      
    };
    const cancel = () =>{
      message.warning({
        content: '取消删除',
      });
    };
    const changePagination = (page:number, pageSize:number) =>{
      message.success({
        content: `当前页码为${page},页数量为${pageSize}`,
      });
    };
    const edit = (record:DataType) => {
      (childRef.current as any).showModalEdit(record);
      console.log(record)
    };
    const clickBtn = () =>{
      (childRef.current as any).showModal();
    };
    return (
      <div className={styles.fathercontainer}>
        <div>
          <Button type="primary" onClick={clickBtn}>新增</Button>
        </div>
        <div className={styles.datamonitor}>
          <Table columns={columns} rowKey={"data_name"} scroll={{ y: 600 }}
          dataSource={data} pagination={false} bordered={true}/>
          {/*  */}
          <Adddata ref={childRef} />
          {/*  */}
        </div>
        <div className={styles.page}>
          <Paginationcom total={total} onChange={changePagination}/>
        </div>
      </div>
    )
    
}



export default Datamonitor;