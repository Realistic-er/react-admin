
import Mock from 'mockjs';
import request from '../request/axios';

const dataList = Mock.mock(
  {
    'data|10-15': [
      {
        // 申请人
        'processname|1': [
          // waitting
          '1',
            //  process
          '2',
            //   finished
          '3'
        ],
        // 申请人职位
        'process': [
          // waitting
          '1',
            //  process
          '2',
            //   finished
          '3'
        ],
        // 状态
        "statusprocess|1-100": 100,
        // 练习电话
        email: '@email',
        // 
        'processimage': ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
        // 备注
        text: '@cparagraph(1, 3)',
      },
    ],
  },
);

Mock.mock('/data/processmonitor', 'get', () => (
  {
    meta: {
      msg: 'success',
      status: 200,
    },
    data: dataList,
  }
));

// 登录
export default function getprocess(currentPage:any, pageSize:any) {
  return request({
    url: '/getprocessmonitor',
    method: 'get',
    params: {
      currentPage,
      pageSize,
    }
  });
}
