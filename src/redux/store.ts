import { configureStore } from "@reduxjs/toolkit";
import spritePropReducer from "./features/spritePropSlice";

const store = configureStore({
  reducer: {
    spriteProp: spritePropReducer,
  },
});

export default store;
