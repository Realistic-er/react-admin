import React, { useState, useRef } from 'react';
import { Space,Button, Form,message, Input, DatePicker  } from 'antd';
import styles from  '../../style/components/searchinfo.module.scss';
const Searchinfo: React.FC = () => {
    const { RangePicker } = DatePicker;
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
                  autoComplete="off"
                  form={form}
                >
                  <Form.Item
                    label="信息名称"
                    name="info"
                  >
                    <Input placeholder='请输入信息名称'/>
                  </Form.Item>

                  <Form.Item
                    label="url"
                    name="url"
                  >
                    <Input placeholder='请输入url'/>
                  </Form.Item>

                  <Form.Item
                    label="ip"
                    name="ip"
                  >
                    <Input placeholder='请输入ip'/>
                  </Form.Item>

                  <Form.Item
                    label="地址"
                    name="address"
                  >
                    <Input placeholder='请输入地址'/>
                  </Form.Item>
                  


                  <Form.Item label="日期" name="date">
                    <RangePicker />
                  </Form.Item>

                  <Form.Item
                    label="email"
                    name="email"
                    >
                        <Input placeholder="请输入email"/>
                    </Form.Item>

                  <Form.Item
                    label="备注"
                    name="sourcetext"
                  >
                    <Input placeholder='请输入备注'/>
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

  Searchinfo.displayName = 'Searchinfo';

export default Searchinfo;