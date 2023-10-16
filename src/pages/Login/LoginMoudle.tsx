import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
    selectAccount,
    updateAccount,
  } from "../../store/reducer/saveaccount";
import { Button, Form, Input, message } from 'antd';
import { login } from '../../utils/api/login';
import styles from  '../../style/pages/LoginMoudle.module.scss';


const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  const LoginMoudle: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectAccount);
    const [form] = Form.useForm();
    const onSubmit = (errorInfo: any) => {
        form.validateFields()
            .then((values) => {
                const account = values.username;
                const password = values.password;
                dispatch(updateAccount(account));
                // window.localStorage.setItem('account', account);
                login(account, password).then((res:any) => {
                    
                    const {token, menu} = res.data;
                    window.localStorage.setItem('token', token);
                    window.localStorage.setItem('menu', JSON.stringify(menu));
                    message.success({
                        content: '登录成功'
                    })
                    navigate('/layout');
                })
                
            })
            .catch((errorInfo) => {
                /*
                errorInfo:
                {
                    values: {
                    username: 'username',
                    password: 'password',
                    },
                    errorFields: [
                    { name: ['password'], errors: ['Please input your Password!'] },
                    ],
                    outOfDate: false,
                }
                */
            });
    };
    return (
        <div className={styles.formcontainer}>
            <Form
                form={form}
                name="basic"
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item
                    label="账号"
                    name="username"
                    rules={[{ required: true, message: '账号不能为空' }]}
                >
                    <Input placeholder="请输入账号" />
                </Form.Item>
            
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '密码不能为空' }]}
                >
                    <Input.Password placeholder="请输入密码" />
                </Form.Item>
            
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={onSubmit}>
                    登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
  
  export default LoginMoudle;