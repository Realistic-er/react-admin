import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Button, Modal, Form, Input, message, Radio } from 'antd';

const Adddata: React.FC<any> = forwardRef(
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
              name="dataname"
              rules={[{ required: true, message: '姓名不能为空!' }]}
              >
                <Input placeholder="请输入你的姓名"/>
              </Form.Item>
      
              <Form.Item
              label="年龄"
              name="dataage"
              rules={[{ pattern: new RegExp(/^[1-9]\d*$/, "g"), required: true, message: '年龄不能为空且为数字!' }]}
              >
                <Input placeholder="请输入你的年龄"/>
              </Form.Item>

              <Form.Item
              label="状态"
              name="statusdata"
              rules={[{ required: true, message: '状态不能为空!' }]}
              >
                <Radio.Group>
                    <Radio value={'1'}>正常</Radio>
                    <Radio value={'2'}>停用</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
              label="email"
              name="email"
              rules={[{ required: true, message: 'email不能为空!' }]}
              >
                <Input placeholder="请输入你的email"/>
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

Adddata.displayName = 'Adddata';

export default Adddata;