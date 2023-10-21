import React, { useEffect, useState, useRef } from 'react';
import { Space, Table, Tag, Button, Popconfirm, message } from 'antd';
import {
    QuestionCircleOutlined
  } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TableColumnsType } from 'antd';
import Addparentmenu from '../../components/menucharge/addparentmenu';
import Addchildmenu from '../../components/menucharge/addchildmenu';
import {
  getparentmenu, deleteparentmenu, getchildmenu, deletechildmenu
} from '../../utils/api/menucharge';
import styles from  '../../style/views/datamonitor.module.scss';
interface DataType {
  parent_name: string;
  parent_icon: string;
  parent_id: number;
}

interface ExpandedDataType {
  child_id: number;
  child_name: string;
  child_icon: string;
  child_path: string;
  child_url: string;
}
const Datamonitor: React.FC = () => {
    const childRef = useRef();
    const childmenuRef = useRef();
    const [data, setData] = useState([]);
    const [expanddata, setExpandData] = useState([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [parent_id, setparentId] = useState();
    const expandedRowRender = () => {
      const columns: TableColumnsType<ExpandedDataType> = [
        { title: '子级id', dataIndex: 'child_id', key: 'child_id' },
        { title: '子级名称', dataIndex: 'child_name', key: 'child_name' },
        { title: '子级图标', dataIndex: 'child_icon', key: 'child_icon' },
        { title: '子级路由', dataIndex: 'child_path', key: 'child_path' },
        { title: '文件位置', dataIndex: 'child_url', key: 'child_url' },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: (_, record) => (
            <Space size="middle">

                {/* <a>Invite {record.name}</a>
                <a>Delete</a> */}
                <Button type="link" onClick={() => editchild(record)}>编辑</Button>
                <Popconfirm
                    title="删除"
                    description={'确认要删除'+ `${record.child_name}`+'?'}
                    onConfirm={() => confirmchild(record)}
                    onCancel={cancel}
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                > 
                    <Button type="link">删除</Button>
                </Popconfirm>
                
            </Space>
          ),
        },
      ];
  
      
      return <Table columns={columns} dataSource={expanddata} pagination={false}
      rowKey={"child_id"} bordered={true} />;
    };
    const columns: ColumnsType<DataType> = [
        {
        title: '序号',
        render:(text,record,index)=>`${index+1}`,
        },
      {
        title: '父级名称',
        dataIndex: 'parent_name',
        key: 'parent_name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: '父级图标',
        dataIndex: 'parent_icon',
        key: 'parent_icon',
      },
      {
        title: '操作',
        dataIndex: 'x',
        key: 'x',
        render: (_, record) => (
          <Space size="middle">
              {/* <a>Invite {record.name}</a>
              <a>Delete</a> */}
              <Button type="link" onClick={() => add(record)}>新增</Button>
              <Button type="link" onClick={() => edit(record)}>编辑</Button>
              <Popconfirm
                  title="删除"
                  description={'确认要删除'+ `${record.parent_name}`+'?'}
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
    
    const getdatasource = () => {
      getparentmenu(1, 10).then((res) => {
        setData(res.data.result);
      })
    };
    const getdataparentsource = (parent_id:any) => {
      getchildmenu(parent_id).then((res) => {
        if (res.data.code === 200) {
          setExpandData(res.data.result);
        }
      })
    };
    useEffect(() => {
      getdatasource();
    }, []);
    const confirmchild = (record:any) =>{
      const { child_id } = record;
      deletechildmenu({ child_id }).then((res) => {
        if (res.data.code === 200) {
          getdataparentsource(parent_id);
          message.success({
            content: '删除成功',
          });
        } else {
          message.error({
            content: '删除失败',
          });
        }
      })
    };
    const confirm = (record:any) =>{
      const { parent_id } = record;
      deleteparentmenu({ parent_id }).then((res) => {
        if (res.data.code === 200) {
          getdatasource();
          message.success({
            content: '删除成功',
          });
        } else {
          message.error({
            content: '删除失败',
          });
        }
      })
    };
    const cancel = () =>{
      message.warning({
        content: '取消删除',
      });
    };
    const edit = (record:DataType) => {
      (childRef.current as any).showModalEdit(record);
    };
    const add = (record:any) => {
      (childmenuRef.current as any).showModal(record);
    };
    const editchild = (record:any) => {
      (childmenuRef.current as any).showModalEdit(record);
    };
    const clickBtn = () =>{
      (childRef.current as any).showModal();
    };
    const handleExpand = (expanded:any, record:any) => {
      const temp = [];
      const parent_id = record.parent_id;
      if (expanded) {
        temp.push(parent_id);
        console.log()
        setparentId(record.parent_id);
        getdataparentsource(parent_id);
      }
      setExpandedRowKeys(temp as never);
      
    };
    return (
      <div className={styles.fathercontainer}>
        <div>
          <Button type="primary" onClick={clickBtn}>新增</Button>
        </div>
        <div className={styles.datamonitor}>
          <Table columns={columns} rowKey={"parent_id"} scroll={{ y: 600 }}
          expandable={{ expandedRowRender, expandedRowKeys,onExpand: handleExpand, }}
          dataSource={data} pagination={false} bordered={true}/>
          {/*  */}
          <Addparentmenu ref={childRef} getdatasource={getdatasource} />
          {/*  */}
          <Addchildmenu ref={childmenuRef} getdataparentsource={getdataparentsource} />
        </div>
      </div>
    )
    
}



export default Datamonitor;