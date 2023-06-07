import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    status: 'received',
    error: null,
    url:''
};

export const loadDogsImg = createAsyncThunk(
    '@@dog-img/load',
    async({collections, topics,orientation},{extra:{api,client}})=>{
        try{
            return client.get(api.getDogsImgs(collections, topics,orientation))
        } catch(err){
            return err.message
        }
    }
)
const dogsImgSlice = createSlice({
    name:'@@dog-img',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(loadDogsImg.fulfilled, (state,action)=>{
            state.url = action.payload.data.urls.raw
        })
        .addCase(loadDogsImg.rejected, (state,action)=>{
            state.status = 'rejected';
            state.error = action.payload || action.meta.error
        })
        .addCase(loadDogsImg.pending, (state,action)=>{
            state.status = 'loading';
            state.error = null
        })

    }
})

export const dogsImgReducer =  dogsImgSlice.reducer