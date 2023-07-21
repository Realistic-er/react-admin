import React, { useEffect, useState, useRef } from 'react';
import { Space, Table, Modal, Button,
  Popconfirm, message, Switch,  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    QuestionCircleOutlined,
    ExclamationCircleFilled,
  } from '@ant-design/icons';
import AddSource from '../../components/sourcematerial/AddSource';
import Sourcedetail from '../../components/sourcematerial/SourceDetail';
import Searchmateral from '../../components/sourcematerial/Searchmateral';
import Paginationcom from '../../components/Paginationcom';
import getsource from '../../utils/api/sourcematerial';
import styles from  '../../style/views/sourcematerial.module.scss';

interface DataType {
  key: string;
  sourcename: string;
  sourcetheme: string;
  sourceimage: string[];
  sourcenumber: number;
  sourcestatus: string;
  sourcedate: string;
  sourcetext: string;
}


const { confirm } = Modal;
const onChange = (sourcestatus:string) => {
    let title = '';
    let content = '';
    if (sourcestatus === '1') {
        title = '确定要禁用这条素材嘛？';
        content = '禁用成功';
    } else {
        title = '确定要使用这条素材嘛？';
        content = '使用成功';
    }
    confirm({
        title,
        icon: <ExclamationCircleFilled />,
        onOk() {
          message.success({
            content,
          });
        },
        onCancel() {
          message.warning({
            content: '取消操作',
          });
        },
        });
};
const Sourcematerial: React.FC = () => {
    const [data, setData] = useState([]);
    const childRefSource = useRef();
    const childRefSourceDetail = useRef();
    const columns: ColumnsType<DataType> = [
        {
            title: '序号',
            width: 80,
            render:(text,record,index)=>`${index+1}`,
        },
        {
          title: '素材编号',
          dataIndex: 'sourcename',
          key: 'sourcename',
          width: 100,
        },
        {
          title: '素材主题',
          dataIndex: 'sourcetheme',
          key: 'sourcetheme',
          width: 100,
        },
        { title: '素材图片', dataIndex: 'sourceimage', key: 'sourceimage', render: (_, { sourceimage }) => (
            <>
              {sourceimage.map((Sourceimage:string, index:number) => {
              return (
                <img style={{width: '50px', marginRight: '10px'}} src={Sourceimage} key={index} />
              );
              })}
            </>
       ), width: 100, },
        {
            title: '使用次数',
            dataIndex: 'sourcenumber',
            key: 'sourcenumber',
            width: 100,
        },
        {
          title: '状态',
          dataIndex: 'sourcestatus',
          key: 'sourcestatus',
          width: 100,
          render: (_, { sourcestatus }) => <Switch defaultChecked={sourcestatus === '1' ? true : false} 
          onChange={() => onChange(sourcestatus)}/>,
        },
        {
            title: '素材日期',
            dataIndex: 'sourcedate',
            key: 'sourcedate',
        },
          {
              title: '描述',
              dataIndex: 'sourcetext',
              key: 'sourcetext',
          },
          {
              title: '操作',
              dataIndex: '',
              key: 'x',
              render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => edit(record)}>编辑</Button>
                    <Popconfirm
                        title="删除"
                        description={'确认要删除'+ `${record.sourcename}`+'?'}
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
      (childRefSource.current as any).showModalEdit(record);
    };
    const detail = (record:DataType) => {
      (childRefSourceDetail.current as any).showModal();
    };
    useEffect(() => {
        getsource().then((Response) => {
          setData(Response.data.data.data)
        })
    }, []);
    const changePagination = (page:number, pageSize:number) =>{
        message.success({
          content: `当前页码为${page},页数量为${pageSize}`,
        });
    };
    const clickBtn = () =>{
      (childRefSource.current as any).showModal();
    };
    return (
        <div className={styles.fathercontainer}>
          {/*  */}
          <Searchmateral />
          {/*  */}
          <div>
            <Button type="primary" onClick={clickBtn}>新增</Button>
          </div>
        <div className={styles.datamonitor}>
        <Table columns={columns} dataSource={data} pagination={false} bordered={true}
        rowKey={"sourcetext"} scroll={{ y: 600 }}/>
          {/*  */}
          <AddSource ref={childRefSource} />
          {/*  */}
          <Sourcedetail ref={childRefSourceDetail}/>
        </div>
        <div className={styles.page}>
          <Paginationcom onChange={changePagination}/>
        </div>
      </div>
    )
};

export default Sourcematerial;