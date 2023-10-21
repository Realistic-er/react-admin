import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { adddparentmenu, updateparentmenu } from '../../utils/api/menucharge'


const Addparentmenu: React.FC<any> = forwardRef(
    (props, ref) => {
      useImperativeHandle(ref, () => {
        return {
          showModal: showModal,
          showModalEdit: showModalEdit,
        };
      });
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [recordobject, setIsRecord] = useState({});
        const [isEdit, setIsEdit] = useState(false);
        const [parent_id, setId] = useState();
        const [form] = Form.useForm();
        useEffect(() => {
          form.setFieldsValue({...recordobject})
        }, [recordobject])
        const showModal = () => {
            setIsModalOpen(true);
            setIsEdit(false);
            form.resetFields();
        };
        const showModalEdit = (record:any) => {
          setIsModalOpen(true);
          setIsRecord(record);
          setIsEdit(true);
          setId(record.parent_id);
        };
        const handleOk = () => {
            form.validateFields()
              .then((values) => {
                if (isEdit) {
                  const { parent_name, parent_icon} = values;
                  updateparentmenu({parent_id: parent_id, parent_name, parent_icon}).then((res) => {
                    console.log(parent_id, parent_name, parent_icon)
                    if (res.data.code === 200) {
                      props.getdatasource();
                      message.success({
                        content: '修改成功'
                      });
                      form.resetFields();
                      setIsModalOpen(false);
                      setIsEdit(false);
                    } else {
                      message.error({
                        content: '修改失败'
                      });
                    }
                  })
                } else {
                  const { parent_name, parent_icon } = values;
                  adddparentmenu({parent_name, parent_icon}).then((res) => {
                    if (res.data.code === 200) {
                      props.getdatasource();
                      message.success({
                        content: '添加成功'
                      });
                      form.resetFields();
                      setIsModalOpen(false);
                    } else {
                      message.error({
                        content: '添加失败'
                      });
                    }
                  })
                }
                
                
                
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
          <Modal title={isEdit ? '编辑' : '创建'} open={isModalOpen} okText="提交" cancelText="取消" destroyOnClose={true}
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
              label="父级名称"
              name="parent_name"
              rules={[{ required: true, message: '父级名称不能为空!' }]}
              >
                <Input placeholder="请输入父级名称"/>
              </Form.Item>

              <Form.Item
              label="父级图标"
              name="parent_icon"
              rules={[{ required: true, message: '父级图标不能为空!' }]}
              >
              <Input placeholder="请输入父级图标"/>
              </Form.Item>
          </Form>
          </Modal>
        );
      }
    
);

Addparentmenu.displayName = 'Addparentmenu';

export default Addparentmenu;