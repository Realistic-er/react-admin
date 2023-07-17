import React, { useEffect, useState, useRef } from 'react';
import { Space, Table, Modal, Button, Form,
  Checkbox, message, Switch, Input, Select, DatePicker  } from 'antd';
import {
    QuestionCircleOutlined,
    ExclamationCircleFilled,
    SearchOutlined,
    } from '@ant-design/icons';
    import styles from  '../../style/components/searchmaterial.module.scss';
const Searchmateral: React.FC = () => {
    const { RangePicker } = DatePicker;
      const [data, setData] = useState([]);
      const childRefSource = useRef();
      const childRefSourceDetail = useRef();
      const changePagination = (page:number, pageSize:number) =>{
          message.success({
            content: `当前页码为${page},页数量为${pageSize}`,
          });
      };
      const clickBtn = () =>{
          (childRefSource.current as any).showModal();
        };
      const [form] = Form.useForm();
      const onReset = () => {
        form.resetFields();
      };
      const search = () => {
        const data = form.getFieldsValue();
        message.info(JSON.stringify(data),);
      };
      return (
                <Form
                  name="basicsearchsource"
                  className={styles.formcon}
                  labelCol={{ span: 8 }}
                  // wrapperCol={{ span: 16 }}
                  // style={{ minWidth: 600 }}
                  // initialValues={{ remember: true }}
                  autoComplete="off"
                  form={form}
                >
                  <Form.Item
                    label="素材编号"
                    name="sourcename"
                  >
                    <Input placeholder='请输入素材编号'/>
                  </Form.Item>

                  <Form.Item
                    label="素材名字"
                    name="sourcetheme"
                  >
                    <Input placeholder='请输入素材主题'/>
                  </Form.Item>

                  <Form.Item name="sourcestatus" label="状态">
                    <Select style={{ width: 200 }}>
                      <Select.Option value="1">正常</Select.Option>
                      <Select.Option value="2">禁用</Select.Option>
                    </Select>
                  </Form.Item>

                  
                  <Form.Item
                    label="备注"
                    name="sourcetext"
                  >
                    <Input placeholder='请输入备注'/>
                  </Form.Item>


                  <Form.Item label="日期" name="sourcedate">
                    <RangePicker />
                  </Form.Item>


                  

                  <Form.Item style={{display: 'flex'}} wrapperCol={{ offset: 8, }}>
                    <Space >
                      <Button type="primary" onClick={search}>
                        搜索
                      </Button>
                      <Button  onClick={onReset}>
                        清空
                      </Button>
                    </Space>
                    
                  </Form.Item>
                </Form>
      )
};

  Searchmateral.displayName = 'Searchmateral';

export default Searchmateral;