import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    collapsed: false,
};
export const collapseSlice = createSlice({
  name: "collapseSpace", // 命名空间，在调用action的时候会默认的设置为action的前缀,保证唯一.不重名
  initialState,
  reducers: {
    // reducer函数 state当前组件的数据 
    //第二个参数为{payload:{},type:"""} 想想就写法或者vuex
    updateCollapsed(state) {
        state.collapsed = !state.collapsed;
        window.localStorage.setItem('collapsed', JSON.stringify(state.collapsed));
    },
  },
});
export const { updateCollapsed } = collapseSlice.actions;
export const selectCollapse = (state:any) => state.rootMenu.collapsed;

export default collapseSlice.reducer;