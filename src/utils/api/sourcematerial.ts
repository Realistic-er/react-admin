
import Mock from 'mockjs';
import request from '../request/axios';

const dataList = Mock.mock(
  {
    'data|10-15': [
      {
        // 编号
        sourcename: '@name()',
        // 素材名字
        sourcetheme: '@name()',
        // 素材图片
        sourceimage: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',],
        // 使用次数
        "sourcenumber|100-1000": 100,
        // 状态
        'sourcestatus|1': [
            // 正常
          '1',
            //  禁用
          '2',
        ],
        // 日期
        sourcedate: '@date()',
        // 备注
        sourcetext: '@cparagraph(1, 1)',
      },
    ],
  },
);

Mock.mock('/data/sourcematerial', 'get', () => (
  {
    meta: {
      msg: 'success',
      status: 200,
    },
    data: dataList,
  }
));

// 登录
export default function getsource() {
  return request({
    url: '/data/sourcematerial',
    method: 'get',
  });
}
