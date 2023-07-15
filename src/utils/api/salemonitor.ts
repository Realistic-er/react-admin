
import Mock from 'mockjs';
import request from '../request/axios';

const dataList = Mock.mock(
  {
    'data|10-15': [
      {
        // 编号
        salecode: '@name()',
        // 货品名字
        salename: '@name()',
        // 货品图片
        saleimage: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',],
        // 库存数量
        "salenumber|100-1000": 100,
        // 状态
        'salestatus|1': [
            // 在生产
          '1',
            //  结束 
          '2',
        ],
        // 备注
        text: '@cparagraph(1, 2)',
        'salerlist|10-15': [
            {
                // 销售人名称
                salername: '@name()',
                // 销售人身份
                'salerpart|1': [
                    // 在生产
                  '总监',
                    //   
                    '助理',
                    //  结束 
                    '职员',
                ],
                // 销售人头像
                saleerinfo: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',],
                // 销售人业绩
                "salernumber|100-1000": 100,
                // 公司邮箱
                email: '@email()',
            }
            
        ]
      },
    ],
  },
);

Mock.mock('/data/salemonitor', 'get', () => (
  {
    meta: {
      msg: 'success',
      status: 200,
    },
    data: dataList,
  }
));

// 登录
export default function getsale() {
  return request({
    url: '/data/salemonitor',
    method: 'get',
  });
}
