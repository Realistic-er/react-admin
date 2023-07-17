import React, { useEffect, useState, useRef } from 'react';
import { Space, Table, Tag, Button, Popconfirm, message, Badge  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    QuestionCircleOutlined
  } from '@ant-design/icons';
  import AddSale from '../../components/salemonitor/Addsale';
  import Saledetail from '../../components/salemonitor/Saledetail';
  import Paginationcom from '../../components/Paginationcom';
import getsale from '../../utils/api/salemonitor';
import styles from  '../../style/views/datamonitor.module.scss';

interface DataType {
  key: string;
  salecode: string;
  salename: string;
  saleimage: string[];
  salenumber: number;
  salestatus: string;
  text: string;
}



const Salemonitor: React.FC = () => {
    const [data, setData] = useState([]);
    const childRefSale = useRef();
    const childRefDetail = useRef();
    const columns: ColumnsType<DataType> = [
        {
            title: '序号',
            width: 80,
            render:(text,record,index)=>`${index+1}`,
        },
        {
          title: '货物编号',
          dataIndex: 'salecode',
          key: 'salecode',
          width: 100,
        },
        {
          title: '货品名字',
          dataIndex: 'salename',
          key: 'salename',
          width: 100,
        },
        { title: '货品图片', dataIndex: 'saleimage', key: 'saleimage', render: (_, { saleimage }) => (
            <>
                {saleimage.map((saleimage:string, index:number) => {
                return (
                    <img style={{width: '50px', marginRight: '10px'}} src={saleimage} key={index} />
                );
                })}
            </>
       ), width: 100, },
        {
            title: '库存数量',
            dataIndex: 'salenumber',
            key: 'salenumber',
            width: 100,
        },
        {
          title: '状态',
          dataIndex: 'salestatus',
          key: 'salestatus',
          width: 100,
          render: (_, { salestatus }) => <Badge status={salestatus === '1' ? 'processing' : 'success'}
          text={salestatus === '1' ? '生产中' : '结束'} />,
        },
        
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
                        description={'确认要删除'+ `${record.salename}`+'?'}
                        onConfirm={confirm}
                        onCancel={cancel}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    > 
                        <Button type="link">删除</Button>
                    </Popconfirm>
                    <Button type="link" onClick={() => detail(record)}>详情</Button>
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
      (childRefSale.current as any).showModalEdit(record);
    };
    const detail = (record:DataType) => {
        (childRefDetail.current as any).showModalEdit(record);
      };
    useEffect(() => {
        getsale().then((Response) => {
          setData(Response.data.data.data)
        })
    }, []);
    const changePagination = (page:number, pageSize:number) =>{
        message.success({
          content: `当前页码为${page},页数量为${pageSize}`,
        });
    };
    const clickBtn = () =>{
        (childRefSale.current as any).showModal();
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
          <AddSale ref={childRefSale} />
          {/*  */}
          <Saledetail ref={childRefDetail}/>
        </div>
        <div className={styles.page}>
          <Paginationcom onChange={changePagination}/>
        </div>
      </div>
    )
};

export default Salemonitor;