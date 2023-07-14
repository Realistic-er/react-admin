// 引入
import {configureStore} from '@reduxjs/toolkit';
import counterSlice from "../store/reducer/saveaccount";
import collapseSlice from "../store/reducer/operamenu";
import tagsSlice from "../store/reducer/tagopera";

export default configureStore({
  reducer:{
    rootCounter: counterSlice,
    rootMenu: collapseSlice,
    rootTag: tagsSlice,
  }
})