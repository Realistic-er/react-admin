import React, { useEffect, useState, useRef } from 'react';
import { Space, Table, Modal, Button,
  Popconfirm, message, DatePicker
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  QuestionCircleOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import Addinfo from '../../components/infocharge/Addinfo';
import Searchinfo from '../../components/infocharge/Searchinfo';
import Paginationcom from '../../components/Paginationcom';
import getinfo from '../../utils/api/infocharge';
import styles from  '../../style/views/sourcematerial.module.scss';

interface DataType {
  key: string;
  info: string;
  infoimage: string[];
  url: string;
  ip: string;
  address: string;
  date: string;
  email: string;
  text: string;
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
const Infocharge: React.FC = () => {
    const { RangePicker } = DatePicker;
    const [data, setData] = useState([]);
    const childRefInfo = useRef();
    const childRefInfoDetail = useRef();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRow, setSelectedRow] = useState<React.Key[]>([]);
    const columns: ColumnsType<DataType> = [
      {
          title: '序号',
          width: 80,
          render:(text,record,index)=>`${index+1}`,
      },
      {
        title: '信息名称',
        dataIndex: 'info',
        key: 'info',
        width: 100,
      },
      { title: '示例图片', dataIndex: 'infoimage', key: 'infoimage', render: (_, { infoimage }) => (
          <>
              {infoimage.map((Sourceimage:string, index:number) => {
              return (
                  <img style={{width: '50px', marginRight: '10px'}} src={Sourceimage} key={index} />
              );
              })}
          </>
      ), width: 100, },
      {
        title: 'url',
        dataIndex: 'url',
        key: 'url',
        width: 100,
      },
      
      {
          title: 'ip',
          dataIndex: 'ip',
          key: 'ip',
          width: 100,
      },
      {
          title: '地址',
          dataIndex: 'address',
          key: 'address',
          width: 200,
      },
      {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
          width: 200,
      },
      {
          title: 'email',
          dataIndex: 'email',
          key: 'email',
          width: 100,
      },
      {
          title: '备注',
          dataIndex: 'text',
          key: 'text',
          width: 200,
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
                    description={'确认要删除'+ `${record.info}`+'?'}
                    onConfirm={confirm}
                    onCancel={cancel}
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                > 
                    <Button type="link">删除</Button>
                </Popconfirm>
                {/* <Button type="link" onClick={() => detail(record)}>详情</Button> */}
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
      (childRefInfo.current as any).showModalEdit(record);
    };
    useEffect(() => {
        getinfo().then((Response) => {
          setData(Response.data.data.data)
        })
    }, []);
    const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: any) => {
      setSelectedRowKeys(newSelectedRowKeys);
      setSelectedRow(selectedRows);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const changePagination = (page:number, pageSize:number) =>{
      message.success({
        content: `当前页码为${page},页数量为${pageSize}`,
      });
    };
    const clickBtn = () =>{
        (childRefInfo.current as any).showModal();
      };
    return (
        <div className={styles.fathercontainer}>
          {/*  */}
          <Searchinfo />
          {/*  */}
          <div>
            <Button type="primary" onClick={clickBtn}>新增</Button>
          </div>
        <div className={styles.datamonitor}>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data}
        pagination={false} bordered={true} rowKey={(record) => record.email}
        scroll={{ y: 600 }}/>
          {/*  */}
          <Addinfo ref={childRefInfo} />
          {/*  */}
        </div>
        <div className={styles.page}>
          <Paginationcom onChange={changePagination}/>
        </div>
      </div>
    )
};

export default Infocharge;