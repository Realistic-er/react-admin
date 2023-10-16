
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

// 获取data分页数据
export function getdata(currentPage:any, pageSize:any) {
  return request({
    url: '/getdatamonitor',
    method: 'get',
    params: {
      currentPage,
      pageSize,
    }
  });
}

// 添加data数据
export function adddata(data:any) {
  return request({
    url: '/adddatamonitor',
    method: 'post',
    data
  });
}

// 编辑数据
export function updatedata(data:any) {
  return request({
    url: '/updatedatamonitor',
    method: 'put',
    data
  });
}

// 删除数据
export function deletedata(data:any) {
  return request({
    url: '/deletedatamonitor',
    method: 'delete',
    data
  });
}