import { combineReducers } from "@reduxjs/toolkit"

import authReducer from '../Slice/authSlice'
import profileSlice from '../Slice/profileSlice'
import cartSlice from "../Slice/cartSlice"
import courseSlice from "../Slice/courseSlice"
import viewCourseSlice from '../Slice/viewCourseSlice'

const rootReducer=combineReducers({
    auth:authReducer,
    profile:profileSlice,
    cart:cartSlice,
    course:courseSlice,
    viewCourse:viewCourseSlice
    


})



export default rootReducer

