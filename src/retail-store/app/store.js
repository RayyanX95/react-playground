import { configureStore } from "@reduxjs/toolkit";
import retailSlice from "../retail-slice";

export default configureStore({
  reducer: { retail: retailSlice },
});
