// 引入
import {configureStore} from '@reduxjs/toolkit';
import counterSlice from "../store/reducer/saveaccount";
import collapseSlice from "../store/reducer/operamenu";

export default configureStore({
  reducer:{
    rootCounter: counterSlice,
    rootMenu: collapseSlice,
  }
})