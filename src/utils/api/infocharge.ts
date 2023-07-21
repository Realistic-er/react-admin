
import Mock from 'mockjs';
import request from '../request/axios';

const dataList = Mock.mock(
  {
    'data|10-15': [
      {
        // 信息名称
        info: '@name()',
        // 示例图片
        infoimage: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',],
        // url
        url: '@url()',
        // ip
        ip: '@ip()',
        // 地址
        address: '@county(true)',
        // 日期
        date: '@date()',
        // 邮箱
        email: '@email()',
        // 备注
        text: '@cparagraph(1, 3)',
      },
    ],
  },
);

Mock.mock('/info/infocharge', 'get', () => (
  {
    meta: {
      msg: 'success',
      status: 200,
    },
    data: dataList,
  }
));

// 登录
export default function getinfo() {
  return request({
    url: '/info/infocharge',
    method: 'get',
  });
}
