import {configureStore} from "@reduxjs/toolkit";
import FormSlice from "./form-slice";
const store =configureStore({

    reducer:{
       form: FormSlice.reducer
    }
});

export default store