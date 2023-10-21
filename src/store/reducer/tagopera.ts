import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tagarray: [
        {
            child_path: '/layout',
            child_name: '首页',
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
        const data = actions.payload;
        const index = state.tagarray.findIndex(item => {
            return item.child_path === data.child_path;
        })
        if (index === -1) {
            const tag = {
                child_path: '',
                child_name: '',
            }
            tag.child_name = data.child_name;
            tag.child_path = data.child_path;
            if (tag !== undefined) state.tagarray.push(tag);
        }
    },
    // 删除标签
    deleteTagArray(state, actions) {
        console.log(actions)
        // const index = state.tagarray.indexOf(actions.payload);
        const index = state.tagarray.findIndex(item => {
            return item.child_path === actions.payload.child_path;
        })
        state.tagarray.splice(index, 1);
    },
  },
});
export const { updateTagArray,deleteTagArray } = tagsSlice.actions;
export const selectTagArray = (state:any) => state.rootTag.tagarray;

export default tagsSlice.reducer;