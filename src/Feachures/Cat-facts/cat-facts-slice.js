import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    status: 'received',
    error: null,
    fact:[]
}

export const loadCatFacts = createAsyncThunk(
    '@@cat-facts/load',
    async(_, {extra:{api, client}} )=>{
        try {
           
            return client.get(api.BASE_URL_CATS)
        }catch(err){
            return err.message
        }
    }
)

const catsFactsSlice = createSlice({
    name:'@@cat-facts',
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(loadCatFacts.fulfilled, (state,action)=>{
                 state.fact = action.payload.data.fact
            })
            .addCase(loadCatFacts.rejected, (state,action)=>{
                state.status = 'rejected';
                state.error = action.payload || action.meta.error
           })
           .addCase(loadCatFacts.pending, (state,action)=>{
            state.status = 'loading';
            state.error = null
       })

    }
})

export const catsFactsReducer = catsFactsSlice.reducer;

