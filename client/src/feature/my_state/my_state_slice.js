import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
const Api = import.meta.env.VITE_API_URL


let data = {
  notes:[],
  links:[],
  contacts:[],
  passwords:[],
  tasks: []
}

export const getData = createAsyncThunk("my_state/getData", async ()=>{
  try{
    const req = await fetch(Api+"/all",{credentials: "include"})
    const res = await req.json()
    console.log(res)
    if(req.ok) return res
  }catch(err){
    console.log(err)
  }
})


const initialState = {
  isLoadeing: false,
  isError: false,
  error: null,
  data
}


export const my_state_Slice = createSlice({
  name: 'my_state',
  initialState,
  reducers: {
    add: (state,action)=>{
      const { name, data } = action.payload
      try{
        console.log(name,data)
        state.data[name].push(data)
      }catch(err){}
    },
    edit: (state,action)=>{
      const { name, data } = action.payload
      try{
        const index = state.data[name].findIndex(d=> d._id === data._id)
        state.data[name].splice(index,1,data)
      }catch(err){console.log(err)}
    },
    _delete: (state,action)=>{
      const { name, id } = action.payload
      try{
        const index = state.data[name].findIndex(d=> d._id === id)
        state.data[name].splice(index,1)
      }catch(err){console.log(err)}
    }
    
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoadeing = false
      state.data = {...state.data ,...action.payload}
    })
    builder.addCase(getData.pending, (state, action) => {
      state.isLoadeing = true
    })
    builder.addCase(getData.rejected, (state, action) => {
      state.isError =  true
      state.error = "Faild to fetch data!"
    })
  },
})

// Action creators are generated for each case reducer function
export const { add, edit, _delete } = my_state_Slice.actions

export default my_state_Slice.reducer