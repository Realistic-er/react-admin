import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  account: '',
};
export const counterSlice = createSlice({
  name: "accountSpace", // 命名空间，在调用action的时候会默认的设置为action的前缀,保证唯一.不重名
  initialState,
  reducers: {
    // reducer函数 state当前组件的数据 
    //第二个参数为{payload:{},type:"""} 想想就写法或者vuex
    updateAccount(state, actions) {
      state.account = actions.payload;
    },
  },
});
export const { updateAccount } = counterSlice.actions;
export const selectAccount = (state:any) => state.rootCounter.account;

export default counterSlice.reducer;
