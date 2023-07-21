import React from 'react';
import { Space,Button, Form, message, Input, Select, DatePicker  } from 'antd';
import styles from  '../../style/components/searchmaterial.module.scss';
const Searchmateral: React.FC = () => {
    const { RangePicker } = DatePicker;
      const [form] = Form.useForm();
      const onReset = () => {
        form.resetFields();
      };
      const search = () => {
        const data = form.getFieldsValue();
        message.info(JSON.stringify(data));
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
                    <Select style={{ width: 100 }}>
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