import React, { useEffect, useState, useRef } from 'react';
import { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Table, Tag, Button, message, Popconfirm } from 'antd';
import getpart from '../../utils/api/partmonitor';
import Paginationcom from '../../components/Paginationcom';
import '../../style/views/datamonitor.scss';
import Addpart from '../../components/partmonitor/partmonitor';
import Addpartchild from '../../components/partmonitor/addpartchild';

interface DataType {
    key: React.Key;
    partname: string;
    part: string;
    status: string;
    invoice: string[];
    text: string;
    childlist: ExpandedDataType[];
}
interface ExpandedDataType {
    key: React.Key;
    partname: string;
    part: string;
    status: string;
    text: string;
}
const items = [
    { key: '1', label: 'Action 1' },
    { key: '2', label: 'Action 2' },
];
const Partmonitor: React.FC = () => {
    const childRef = useRef();
    const childExpandRef = useRef();
    
    const expandedRowRender = (record:DataType) => {
      // 
      const editExpand = (record:DataType) => {
        (childExpandRef.current as any).showModalExpanEdit(record);
      };
        const columns: TableColumnsType<ExpandedDataType> = [
          {
            title: '序号',
            render:(text,record,index)=>`${index+1}`,
          },
          { title: '申请人', dataIndex: 'partname', key: 'partname' },
          { title: '部门', dataIndex: 'part', key: 'part' },
          { title: '状态', dataIndex: 'status', key: 'status', render: (_, { status }) => {
            let color = '';
            let text = '';
            if (status === '1') {
                color = 'grey'
                text = '未处理'
            } else if (status === '2') {
                color = 'green'
                text = '通过'
            } else {
                color = 'red'
                text = '打回'
            }
            return <Tag color={color}>{text}</Tag>
            }},
            { title: '备注', dataIndex: 'text', key: 'text' },
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: () => (
              <Button type="link" block onClick={() => editExpand(record)}>
                编辑
              </Button>
            ),
          },
        ];

        return <Table
        rowKey={"partname"}
        bordered={true}
        columns={columns}
        dataSource={record.childlist}
        pagination={false} />;
    };
    // 
    const addExpand = () => {
      (childExpandRef.current as any).showModal();
    };
    
    
    // 
    const confirmPass = () =>{
      message.success({
        content: '通过成功',
      });
    };
    const cancelPass = () =>{
      message.warning({
        content: '取消通过',
      });
    };
    // 
    const confirmRefuse = () =>{
      message.success({
        content: '打回成功',
      });
    };
    const cancelRefuse = () =>{
      message.warning({
        content: '取消打回',
      });
    };
    const editPart = (record:DataType) => {
      (childRef.current as any).showModalEdit(record);
    };
    const columns: TableColumnsType<DataType> = [
        {
          title: '序号',
          width: 50,
          render:(text,record,index)=>`${index+1}`,
        },
        { title: '申请人', dataIndex: 'partname', key: 'partname', width: 100, },
        { title: '职位', dataIndex: 'part', key: 'part', width: 100, },
        { title: '状态', dataIndex: 'status', key: 'status', render: (_, { status }) => {
            let color = '';
            let text = '';
            if (status === '1') {
                color = 'grey'
                text = '未处理'
            } else if (status === '2') {
                color = 'green'
                text = '通过'
            } else {
                color = 'red'
                text = '打回'
            }
            return <Tag color={color}>{text}</Tag>
        }, width: 70,  },
        { title: '发票', dataIndex: 'invoice', key: 'invoice', render: (_, { invoice }) => (
            <>
                {invoice.map((invoice, index) => {
                  return (
                    <img style={{width: '50px'}} src={invoice} key={index} />
                  );
                })}
            </>
        ), width: 150, },
        { title: '备注', dataIndex: 'text', key: 'text' },
        { title: '操作', key: 'operation', render: (_, record) => (
          <div style={{display:'flex'}}>
            
            <Button type="link" block onClick={addExpand}
            style={{display:record.status !==  '2' ? 'block':'none'}}>
              新增
            </Button>
            {/*  */}
            <Button type="link" block onClick={() => editPart(record)}
            style={{display:record.status !==  '2' ? 'block':'none'}}>
              编辑
            </Button>
            {/*  */}
            <Popconfirm
                title="通过"
                description={'确认要通过'+ `${record.partname}`+'的申请?'}
                onConfirm={confirmPass}
                onCancel={cancelPass}
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              >
                <Button type="link" block
                style={{display:record.status !==  '2' ? 'block':'none'}}>
                  通过
                </Button>
              </Popconfirm>
            
            {/*  */}
            <Popconfirm
                title="打回"
                description={'确认要打回'+ `${record.partname}`+'的申请?'}
                onConfirm={confirmRefuse}
                onCancel={cancelRefuse}
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              >
                <Button type="link" block
              style={{display:record.status !==  '3' ? 'block':'none'}}>
                打回
              </Button>
              </Popconfirm>
          </div>
          )
        },
        
    ];
    const [data, setData] = useState([]);
    useEffect(() => {
        getpart().then((Response) => {
          setData(Response.data.data.data)
        })
    }, []);
    const changePagination = (page:number, pageSize:number) =>{
        message.success({
          content: `当前页码为${page},页数量为${pageSize}`,
        });
    };
    const clickBtn = () =>{
      (childRef.current as any).showModal();
    };
    
    return (
      <div className="fathercontainer">
        <div>
          <Button type="primary" onClick={clickBtn}>新增</Button>
        </div>
        <div className="datamonitor">
            <Table
                bordered={true}
                pagination={false}
                rowKey={"partname"}
                columns={columns}
                expandable={{ expandedRowRender }}
                dataSource={data}
                scroll={{ y: 600 }}
            />
            {/*  */}
            <Addpart ref={childRef} />
            {/*  */}
            <Addpartchild ref={childExpandRef} />
        </div>
        
        <div className="page">
          <Paginationcom onChange={changePagination}/>
        </div>
      </div>
    )
    
}



export default Partmonitor;