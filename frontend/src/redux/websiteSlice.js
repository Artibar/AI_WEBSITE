import {createSlice} from '@reduxjs/toolkit';

const websiteSlice = createSlice({
    name:"website",
    initialState:{
        websiteData:null
    },
     reducers:{
        setWebsiteData:(state, action)=>{
          state.websiteData = action.payload
        }
    }
})

export const {setWebsiteData} = websiteSlice.actions
export default websiteSlice.reducer