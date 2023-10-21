
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

// 获取parentmenu分页数据
export function getparentmenu(currentPage:any, pageSize:any) {
  return request({
    url: '/getparentmenu',
    method: 'get',
    params: {
      currentPage,
      pageSize,
    }
  });
}

// 添加parentmenu数据
export function adddparentmenu(data:any) {
  return request({
    url: '/addparentmenu',
    method: 'post',
    data
  });
}

// 编辑parentmenu数据
export function updateparentmenu(data:any) {
  return request({
    url: '/updateparentmenu',
    method: 'put',
    data
  });
}

// 删除parentmenu数据
export function deleteparentmenu(data:any) {
  return request({
    url: '/deleteparentmenu',
    method: 'delete',
    data
  });
}


// 获取childmenu分页数据
export function getchildmenu(parent_id:any) {
    return request({
      url: '/getchildmenu',
      method: 'get',
      params:{
        parent_id
      },
    });
  }
  
  // 添加childmenu数据
  export function adddchildmenu(data:any) {
    return request({
      url: '/addchildmenu',
      method: 'post',
      data
    });
  }
  
  // 编辑childmenu数据
  export function updatechildmenu(data:any) {
    return request({
      url: '/updatechildmenu',
      method: 'put',
      data
    });
  }
  
  // 删除childmenu数据
  export function deletechildmenu(data:any) {
    return request({
      url: '/deletechildmenu',
      method: 'delete',
      data
    });
  }