import { createSlice } from "@reduxjs/toolkit";



const initialState={
   user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
   loading: false,
   profileId:localStorage.getItem("profileId") ? JSON.parse(localStorage.getItem("profileId")) : null,
}


const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload
        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
          setProfileId(state, value) {
            state.profileId = value.payload; // Set the profileId in your state
          },
    }
})

export const {setUser,setLoading,setProfileId}=profileSlice.actions;
export default profileSlice.reducer;
