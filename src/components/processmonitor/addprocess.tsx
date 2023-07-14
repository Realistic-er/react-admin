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
const Addprocess: React.FC<any> = forwardRef(
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
          record.processimage.forEach((v:string) => {
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
        const optionsMulti = [
            { value: '1', label: '监督' },
            { value: '2', label: '审核' },
            { value: '3', label: '执行' },
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
              label="负责人"
              name="processname"
              rules={[{ required: true, message: '负责人不能为空!' }]}
              >
                <Select
                    allowClear
                    placeholder="请选择负责人"
                    options={options}
                />
              </Form.Item>
      
              <Form.Item
              label="责任"
              name="process"
              rules={[{ required: true, message: '责任不能为空!' }]}
              >
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="请选择责任"
                    options={optionsMulti}
                />
              </Form.Item>

              <Form.Item
              label="进度"
              name="statusprocess"
              rules={[{ required: true, message: '状态不能为空!' }]}
              >
                <InputNumber min={0} max={100}/>
              </Form.Item>

              <Form.Item
              label="email"
              name="email"
              rules={[{ required: true, message: 'email不能为空!' }]}
              >
                <Input placeholder="请输入你的email"/>
              </Form.Item>

              <Form.Item label="现场图片" name="processimage"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: '现场图片不能为空!' }]}>
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

Addprocess.displayName = 'Addprocess';

export default Addprocess;