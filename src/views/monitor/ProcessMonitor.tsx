import React, { useEffect, useState, useRef } from 'react';
import { Space, Table, Tag, Button, Popconfirm, message, Progress  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    QuestionCircleOutlined
  } from '@ant-design/icons';
  import Addprocess from '../../components/processmonitor/addprocess';
  import Paginationcom from '../../components/Paginationcom';
import getprocess from '../../utils/api/processmonitor';
import styles from  '../../style/views/datamonitor.module.scss';

interface DataType {
  key: string;
  processname: string;
  process: string[];
  statusprocess: number;
  email: string;
  processimage: string[];
  text: string;
}



const Processmonitor: React.FC = () => {
    const [data, setData] = useState([]);
    const childRefProcess = useRef();
    const columns: ColumnsType<DataType> = [
        {
            title: '序号',
            width: 80,
            render:(text,record,index)=>`${index+1}`,
        },
        {
          title: '负责人',
          dataIndex: 'processname',
          key: 'processname',
          render: (_, { processname }) => {
            let color = '';
            let text = '';
            if (processname === '1') {
                color = 'grey'
                text = 'Jack'
            } else if (processname === '2') {
                color = 'green'
                text = 'Lucy'
            } else {
                color = 'red'
                text = 'yiminghe'
            }
            return <Tag color={color}>{text}</Tag>
          }, width: 100,},
        {
          title: '责任',
          dataIndex: 'process',
          key: 'process',
          render: (_, { process }) => (
            <>
                {process.map((process, index) => {
                    let text = '';
                    if (process === '1') {
                        text = '监督'
                    } else if (process === '2') {
                        text = '审核'
                    } else {
                        text = '执行'
                    }
                    return (
                        <Tag color='blue' key={process}>{text}</Tag>
                    );
                })}
            </>
       ),width: 200,},
        {
          title: '进度',
          dataIndex: 'statusprocess',
          key: 'statusprocess',
          width: 100,
          render: (_, { statusprocess }) => (
            <Progress percent={statusprocess} size="small" />
          )
        },
        {
          title: '联系方式',
          dataIndex: 'email',
          key: 'email',
          width: 180,
        },
        { title: '现场图片', dataIndex: 'processimage', key: 'processimage', render: (_, { processimage }) => (
              <>
                  {processimage.map((processimage, index) => {
                  return (
                      <img style={{width: '50px', marginRight: '10px'}} src={processimage} key={index} />
                  );
                  })}
              </>
         ), width: 250, },
          {
              title: '描述',
              dataIndex: 'text',
              key: 'text',
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
                        description={'确认要删除'+ `${record.processname}`+'?'}
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
    const confirm = () =>{
        message.success({
          content: '删除成功',
        });
    };
    const cancel = () =>{
        message.warning({
          content: '取消删除',
        });
    };
    const edit = (record:DataType) => {
      (childRefProcess.current as any).showModalEdit(record);
    };
    useEffect(() => {
        getprocess().then((Response) => {
          setData(Response.data.data.data)
        })
    }, []);
    const changePagination = (page:number, pageSize:number) =>{
        message.success({
          content: `当前页码为${page},页数量为${pageSize}`,
        });
    };
    const clickBtn = () =>{
        (childRefProcess.current as any).showModal();
      };
    return (
        

        <div className={styles.fathercontainer}>
        <div>
          <Button type="primary" onClick={clickBtn}>新增</Button>
        </div>
        <div className={styles.datamonitor}>
        <Table columns={columns} dataSource={data} pagination={false} bordered={true}
        rowKey={"text"} scroll={{ y: 600 }}/>
          {/*  */}
          <Addprocess ref={childRefProcess} />
          {/*  */}
        </div>
        <div className={styles.page}>
          <Paginationcom onChange={changePagination}/>
        </div>
      </div>
    )
};

export default Processmonitor;