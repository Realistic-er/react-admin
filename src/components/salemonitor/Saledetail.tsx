import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Tag, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Paginationcom from '../../components/Paginationcom';
import styles from '../../style/components/saledetail.module.scss';

interface DataType {
    key: string;
    salername: string;
    salerpart: string;
    saleerinfo: string[];
    salernumber: number;
    email: string;
}
interface arraytype {
    uid: string,
    name: string,
    url: string,
}
const Addprocess: React.FC<any> = forwardRef(
    (props, ref) => {
      useImperativeHandle(ref, () => {
        return {
          showModal: showModal,
          showModalEdit: showModalEdit,
        };
      });
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [recordarray, setIsRecord] = useState([]);
        // useEffect(() => {
        //   form.setFieldsValue({...recordobject})
        // }, [recordobject])
        const showModal = () => {
          setIsModalOpen(true);
        //   form.resetFields();
        //   setFileList([]);
        };

        const showModalEdit = (record:any) => {
          setIsModalOpen(true);
          setIsRecord(record.salerlist);
        };
      
        const handleOk = () => {
            setIsModalOpen(false);
        };
      
        const handleCancel = () => {
          setIsModalOpen(false);
        };

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

        const changePagination = (page:number, pageSize:number) =>{
            message.success({
              content: `当前页码为${page},页数量为${pageSize}`,
            });
        };

        const columns: ColumnsType<DataType> = [
            {
                title: '序号',
                width: 80,
                render:(text,record,index)=>`${index+1}`,
            },
            {
              title: '销售人名称',
              dataIndex: 'salername',
              key: 'salername',
              width: 100,
            },
            {
              title: '销售人身份',
              dataIndex: 'salerpart',
              key: 'salerpart',
              width: 100,
              render: (_, { salerpart }) => {
                let color = '';
                let text = '';
                if (salerpart === '1') {
                    color = 'grey'
                    text = '总监'
                } else if (salerpart === '2') {
                    color = 'green'
                    text = '助理'
                } else {
                    color = 'red'
                    text = '职员'
                }
                return <Tag color={color}>{text}</Tag>
                }
            },
            { title: '货品图片', dataIndex: 'saleimage', key: 'saleimage', render: (_, { saleerinfo }) => (
                <>
                    {saleerinfo.map((saleimage:string, index:number) => {
                    return (
                        <img style={{width: '50px', marginRight: '10px'}} src={saleimage} key={index} />
                    );
                    })}
                </>
           ), width: 100, },
            {
                title: '销售业绩',
                dataIndex: 'salernumber',
                key: 'salernumber',
                width: 100,
            },
            
              {
                  title: '邮箱',
                  dataIndex: 'email',
                  key: 'email',
              },
            //   {
            //       title: '操作',
            //       dataIndex: '',
            //       key: 'x',
            //       render: (_, record) => (
            //         <Space size="middle">
            //             {/* <a>Invite {record.name}</a>
            //             <a>Delete</a> */}
            //             <Button type="link" onClick={() => edit(record)}>编辑</Button>
            //             <Popconfirm
            //                 title="删除"
            //                 description={'确认要删除'+ `${record.salename}`+'?'}
            //                 onConfirm={confirm}
            //                 onCancel={cancel}
            //                 icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            //             > 
            //                 <Button type="link">删除</Button>
            //             </Popconfirm>
            //             <Button type="link" onClick={() => edit(record)}>详情</Button>
            //         </Space>
            //       ),
            //     },
          ];
        return (
          <Modal title="详情" open={isModalOpen} footer="" destroyOnClose={true} width="50%"
            onOk={handleOk} onCancel={handleCancel} forceRender>
            <div className={styles.fathercontainer}>
                <div className={styles.datamonitor}>
                    <Table columns={columns} dataSource={recordarray} pagination={false} bordered={true}
                    rowKey={"email"} scroll={{ y: 400 }}/>
                </div>
                <Paginationcom className={styles.page} onChange={changePagination}/>
            </div>
                
            
          </Modal>
        );
      }
    
);

Addprocess.displayName = 'Addprocess';

export default Addprocess;