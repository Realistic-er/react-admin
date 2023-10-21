import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { adddchildmenu, updatechildmenu } from '../../utils/api/menucharge'


const Addchildmenu: React.FC<any> = forwardRef(
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
        const [child_id, setchildId] = useState();
        const [parent_id, setparentId] = useState();
        const [form] = Form.useForm();
        useEffect(() => {
          form.setFieldsValue({...recordobject})
        }, [recordobject])
        const showModal = (record:any) => {
            setIsModalOpen(true);
            setIsEdit(false);
            setparentId(record.parent_id);
            form.resetFields();
        };
        const showModalEdit = (record:any) => {
          setIsModalOpen(true);
          setIsRecord(record);
          setIsEdit(true);
          setchildId(record.child_id);
          setparentId(record.parent_id);
        };
        const handleOk = () => {
            form.validateFields()
              .then((values) => {
                if (isEdit) {
                  const { child_name, child_icon, child_path, child_url } = values;
                  updatechildmenu({child_id: child_id, parent_id: parent_id, child_path, child_url, child_name, child_icon}).then((res) => {
                    if (res.data.code === 200) {
                      props.getdataparentsource(parent_id);
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
                  const { child_name, child_icon, child_path, child_url } = values;
                  adddchildmenu({ parent_id: parent_id, child_name, child_icon, child_path, child_url }).then((res) => {
                    if (res.data.code === 200) {
                      props.getdataparentsource(parent_id);
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
                label="子级名称"
                name="child_name"
                rules={[{ required: true, message: '父级名称不能为空!' }]}
              >
                <Input placeholder="请输入父级名称"/>
              </Form.Item>

              <Form.Item
                label="子级图标"
                name="child_icon"
                rules={[{ required: true, message: '子级图标不能为空!' }]}
              >
                <Input placeholder="请输入子级图标"/>
              </Form.Item>

              <Form.Item
                label="子级路由"
                name="child_path"
                rules={[{ required: true, message: '子级路由不能为空!' }]}
              >
              <Input placeholder="请输入子级路由"/>
              </Form.Item>

              <Form.Item
                label="文件位置"
                name="child_url"
                rules={[{ required: true, message: '文件位置不能为空!' }]}
              >
                <Input placeholder="请输入文件位置"/>
              </Form.Item>

              
          </Form>
          </Modal>
        );
      }
    
);

Addchildmenu.displayName = 'Addchildmenu';

export default Addchildmenu;