import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Button, Modal, Form, Input, message, Radio, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile, UploadProps } from 'antd/es/upload';

interface arraytype {
  uid: string,
  name: string,
  url: string,
}
const Addpart: React.FC<any> = forwardRef(
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
        const [fileList, setFileList] = useState<UploadFile[]>([]);
        useEffect(() => {
          form.setFieldsValue({...recordobject})
        }, [recordobject])
        const showModal = () => {
          setIsModalOpen(true);
          form.resetFields();
          setFileList([]);
        };

        const showModalEdit = (record:any) => {
          setIsModalOpen(true);
          setIsRecord(record);
          
          const array:arraytype[] = [];
          record.invoice.forEach((v:string) => {
            const obj = {
              uid: '',
              name: '',
              url: ''
            };
            obj.url = v;
            array.push(obj)
          })
          setFileList(array);
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
        
        const uploadButton = (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        
        const normFile = (e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
        };

        const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>{
          setFileList(newFileList);
        };
        
        return (
          <Modal title="创建" open={isModalOpen} okText="提交" cancelText="取消" destroyOnClose={true}
            onOk={handleOk} onCancel={handleCancel} forceRender>
              <Form
              name="basic"
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

              <Form.Item label="发票" name="invoice"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: '发票不能为空!' }]}>
                <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}>
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
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

Addpart.displayName = 'Addpart';

export default Addpart;