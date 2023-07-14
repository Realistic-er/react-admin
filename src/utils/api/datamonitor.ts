
import Mock from 'mockjs';
import request from '../request/axios';

const dataList = Mock.mock(
  {
    'data|10-15': [
      {
        // 字典名称
        dataname: '@name()',
        // 字典类型
        "dataage|1-100": 100,
        // 状态
        'statusdata|1': [
          '1',
          '2',
        ],
        // 邮箱
        email: '@email()',
        // 备注
        text: '@cparagraph(1, 3)',
      },
    ],
  },
);

Mock.mock('/data/datamonitor', 'get', () => (
  {
    meta: {
      msg: 'success',
      status: 200,
    },
    data: dataList,
  }
));

// 登录
export default function getdata() {
  return request({
    url: '/data/datamonitor',
    method: 'get',
  });
}
