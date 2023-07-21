import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Upload, Modal, Form, Input, message, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadProps } from 'antd/es/upload';

interface arraytype {
    uid: string,
    name: string,
    url: string,
}
dayjs.extend(customParseFormat);
const AddSource: React.FC<any> = forwardRef(
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
          const obj = record;
          obj.date = dayjs(new Date(record.date));
          const array:arraytype[] = [];
          record.infoimage.forEach((v:string) => {
            const obj = {
              uid: '',
              name: '',
              url: ''
            };
            obj.url = v;
            array.push(obj)
          })
          setFileList(array);
          setIsRecord(obj);
          setIsModalOpen(true);
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
              label="信息名称"
              name="info"
              rules={[{ required: true, message: '信息名称不能为空!' }]}
              >
                <Input placeholder="请输入信息名称"/>
              </Form.Item>

              <Form.Item label="示例图片" name="infoimage"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: '示例图片不能为空!' }]}>
                <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}>
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
            </Form.Item>

            <Form.Item
            label="url"
            name="url"
            rules={[{ required: true, message: 'url不能为空!' }]}
            >
            <Input placeholder="请输入url"/>
            </Form.Item>
            
            <Form.Item
            label="ip"
            name="ip"
            rules={[{ required: true, message: 'ip不能为空!' }]}
            >
            <Input placeholder="请输入ip"/>
            </Form.Item>

            <Form.Item
            label="地址"
            name="address"
            rules={[{ required: true, message: '地址不能为空!' }]}
            >
                <Input placeholder="请输入地址"/>
            </Form.Item>

            <Form.Item
              label="日期"
              name="date"
              rules={[{ required: true, message: '日期不能为空!' }]}
              >
                <DatePicker />
                {/* <ConfigProvider locale={locale}>
                  <DatePicker defaultValue={dayjs('2015-01-01', 'YYYY-MM-DD')} />
                </ConfigProvider> */}
            </Form.Item>

            <Form.Item
              label="email"
              name="email"
              rules={[{ required: true, message: 'email不能为空!' }]}
              >
                <Input placeholder="请输入email"/>
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

AddSource.displayName = 'AddSource';

export default AddSource;