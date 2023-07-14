import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';

const Addboard: React.FC<any> = forwardRef(
    (props, ref) => {
      useImperativeHandle(ref, () => {
        return {
          showModal: showModal,
          showModalEdit: showModalEdit,
        };
      });
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [recordobject, setIsRecord] = useState({});
        const [form] = Form.useForm();
        useEffect(() => {
          form.setFieldsValue({...recordobject})
        }, [recordobject])
        const showModal = () => {
          setIsModalOpen(true);
          form.resetFields();
        };

        const showModalEdit = (record:any) => {
          setIsModalOpen(true);
          setIsRecord(record);
        };
      
        const handleOk = () => {
          form.validateFields()
            .then((values) => {
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
              name="basic"
              labelCol={{ span: 4 }}
              form={form}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              preserve={false}
            >
              <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: '姓名不能为空!' }]}
              >
              <Input placeholder="请输入你的姓名"/>
              </Form.Item>
      
              <Form.Item
              label="年龄"
              name="age"
              rules={[{ pattern: new RegExp(/^[1-9]\d*$/, "g"), required: true, message: '年龄不能为空!' }]}
              >
              <Input placeholder="请输入你的年龄"/>
              </Form.Item>

              <Form.Item
              label="地址"
              name="address"
              rules={[{ required: true, message: '地址不能为空!' }]}
              >
              <Input placeholder="请输入你的地址"/>
              </Form.Item>

              <Form.Item
              label="描述"
              name="description"
              rules={[{ required: true, message: '描述不能为空!' }]}
              >
              <Input placeholder="请输入描述"/>
              </Form.Item>
          </Form>
          </Modal>
        );
      }
    
);

Addboard.displayName = 'Addboard';

export default Addboard;