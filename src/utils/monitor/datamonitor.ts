import Mock from 'mockjs';
import request from '../request/axios';

const dictoryList = Mock.mock(
  {
    'data|10-15': [
      {
        // 字典名称
        dictoryname: '@name()',
        // 字典类型
        dictorytype: '@cname()',
        // 状态
        'status|1': [
          '1',
          '2',
        ],
        // 创建时间
        time: '@datetime("yyyy-MM-dd HH:mm:ss")',
        // 备注
        text: '@cparagraph(1, 3)',
      },
    ],
  },
);

Mock.mock('/dictory/dictorycharge', 'get', () => (
  {
    meta: {
      msg: 'success',
      status: 200,
    },
    data: dictoryList,
  }
));

// 登录
export default function getdictory() {
  return request({
    url: '/dictory/dictorycharge',
    method: 'get',
  });
}
