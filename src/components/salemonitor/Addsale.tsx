import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Upload, Modal, Form, Input, message, InputNumber, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile, UploadProps } from 'antd/es/upload';

interface arraytype {
    uid: string,
    name: string,
    url: string,
}
const Addsale: React.FC<any> = forwardRef(
    (props, ref) => {
      useImperativeHandle(ref, () => {
        return {
          showModal: showModal,
          showModalEdit: showModalEdit,
        };
      });
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [recordobject, setIsRecord] = useState({});
        const [fileList, setFileList] = useState<UploadFile[]>([]);
        const [form] = Form.useForm();
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
          record.saleimage.forEach((v:string) => {
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
        const options = [
            { value: '1', label: 'Jack' },
            { value: '2', label: 'Lucy' },
            { value: '3', label: 'yiminghe' },
        ];

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
              name="basicprocess"
              form={form}
              labelCol={{ span: 4 }}
              // wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              preserve={false}
            >

            <Form.Item
              label="货物编号"
              name="salecode"
              rules={[{ required: true, message: '货物编号不能为空!' }]}
              >
                <Select
                    allowClear
                    placeholder="请选择货物编号"
                    options={options}
                />
              </Form.Item>

              <Form.Item
              label="货品名字"
              name="salename"
              rules={[{ required: true, message: '货品名字不能为空!' }]}
              >
                <Input placeholder="请输入货品名字"/>
              </Form.Item>
            
              <Form.Item label="货品图片" name="saleimage"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: '货品图片不能为空!' }]}>
                <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}>
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
            </Form.Item>

            <Form.Item
              label="库存数量"
              name="salenumber"
              rules={[{ required: true, message: '库存数量不能为空!' }]}
              >
                <InputNumber min={1} max={10000}/>
            </Form.Item>

            <Form.Item
              label="描述"
              name="text"
              rules={[{ required: true, message: '描述不能为空!' }]}
              >
                <Input placeholder="请输入描述"/>
              </Form.Item>
          </Form>
          </Modal>
        );
      }
    
);

Addsale.displayName = 'Addsale';

export default Addsale;