import request from '../request/axios';

export function login(account:string,password:string) {
    return request({
      url: '/login',
      method: 'post',
      data: {
        account,
        password,
      }
    });
  }