import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Button, Modal, Form, Input, message, Radio, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile, UploadProps } from 'antd/es/upload';

const Addpartchild: React.FC<any> = forwardRef(
    (props, ref) => {
      useImperativeHandle(ref, () => {
        return {
          showModalExpand: showModalExpand,
          showModalExpanEdit: showModalExpanEdit,
        };
      });
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [recordobject, setIsRecord] = useState({});
        const [form] = Form.useForm();
        useEffect(() => {
          form.setFieldsValue({...recordobject})
        }, [recordobject])
        const showModalExpand = () => {
          setIsModalOpen(true);
          form.resetFields();
        };

        const showModalExpanEdit = (record:any) => {
            console.log(record);
          setIsModalOpen(true);
          setIsRecord(record);
        };
      
        const handleOk = () => {
          form.validateFields()
            .then((values) => {
              console.log(values);
              message.success({
                content: '提交成功'
              })
              form.resetFields();
              setIsModalOpen(false);
            })
            .catch((errorInfo) => {
              message.error({
                content: '提交失败'
              })
            });
        };
      
        const handleCancel = () => {
          setIsModalOpen(false);
        };
    
        const onFinish = (values: any) => {
          console.log('Success:', values);
        };
        
        const onFinishFailed = (errorInfo: any) => {
          console.log('Failed:', errorInfo);
        };
        return (
          <Modal title="创建" open={isModalOpen} okText="提交" cancelText="取消" destroyOnClose={true}
            onOk={handleOk} onCancel={handleCancel} forceRender>
              <Form
              name="addpart"
              form={form}
              labelCol={{ span: 4 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              preserve={false}
            >
              <Form.Item
              label="申请人"
              name="partname"
              rules={[{ required: true, message: '申请人不能为空!' }]}
              >
                <Input placeholder="请输入你的姓名"/>
              </Form.Item>
      
              <Form.Item
              label="职位"
              name="part"
              rules={[{ required: true, message: '职位不能为空!' }]}
              >
                <Input placeholder="请输入你的职位"/>
              </Form.Item>

              <Form.Item
              label="备注"
              name="text"
              rules={[{ required: true, message: '备注不能为空!' }]}
              >
                <Input placeholder="请输入备注"/>
              </Form.Item>
          </Form>
          </Modal>
        );
      }
    
);

Addpartchild.displayName = 'Addpartchild';

export default Addpartchild;