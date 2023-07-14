import { createSlice } from "@reduxjs/toolkit";

const routearray  = [
    {
        key: '/layout/monitor/datamonitor',
        label: '数据监控',
    },
    {
        key: '/layout/monitor/partmonitor',
        label: '部门监控',
    },
    {
        key: '/layout/monitor/processmonitor',
        label: '流程监控',
    },
];
const initialState = {
    tagarray: [
        {
            key: '/layout',
            label: '首页',
        }
    ],
};
export const tagsSlice = createSlice({
  name: "tagarraySpace", // 命名空间，在调用action的时候会默认的设置为action的前缀,保证唯一.不重名
  initialState,
  reducers: {
    // reducer函数 state当前组件的数据 
    //第二个参数为{payload:{},type:"""} 想想就写法或者vuex
    updateTagArray(state, actions) {
        const index = state.tagarray.findIndex(item => {
            return item.key === actions.payload;
        })
        if (index === -1) {
            const tag = routearray.find((ele) => {
                return ele.key === actions.payload;
            });
            if (tag !== undefined) state.tagarray.push(tag)
            
        }
    },
    // 删除标签
    deleteTagArray(state, actions) {
        const index = state.tagarray.indexOf(actions.payload);
        state.tagarray.splice(index, 1);
    },
  },
});
export const { updateTagArray,deleteTagArray } = tagsSlice.actions;
export const selectTagArray = (state:any) => state.rootTag.tagarray;

export default tagsSlice.reducer;