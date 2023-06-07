import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name:'',
    isNameEntered:false
};

const userNameSlice = createSlice({
    name:'@@user-name',
    initialState:initialState,
    reducers:{
        setUserName:(state,action)=>{
            state.name= action.payload;
            
        },
        setIsNameEntered:(state,action)=>{
            state.isNameEntered = true
        }
    }
});

export const {setUserName, setIsNameEntered} = userNameSlice.actions;
export const userNameReducer = userNameSlice.reducer