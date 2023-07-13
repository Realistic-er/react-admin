
import Mock from 'mockjs';
import request from '../request/axios';

const dataList = Mock.mock(
  {
    'data|10-15': [
      {
        // 申请人
        partname: '@name()',
        // 申请人职位
        part: '@name()',
        // 状态
        'status|1': [
            // 未处理
          '1',
            //  通过
          '2',
            //   打回
           '3'  
        ],
        // 发票
        'invoice': ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
        // 备注
        text: '@cparagraph(1, 3)',
        // childlist
        'childlist|2-5': [
            {
                partname: '@name()',
                part: '@name()',
                'status|1': [
                    // 未处理
                  '1',
                    //  通过
                  '2',
                    //   打回
                   '3'  
                ],
                text: '@cparagraph(1, 3)',
            }
        ]
      },
    ],
  },
);

Mock.mock('/data/partmonitor', 'get', () => (
  {
    meta: {
      msg: 'success',
      status: 200,
    },
    data: dataList,
  }
));

// 登录
export default function getpart() {
  return request({
    url: '/data/partmonitor',
    method: 'get',
  });
}
