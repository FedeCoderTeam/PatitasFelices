import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dogs: [], // filtrado
  allDogs: [] //estado original
}

export const dogsSlice = createSlice({
    name: 'dogs',
    initialState,
    reducers: {
        getAllDogs: (state, action) => {
            state.dogs = action.payload
            state.allDogs = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { getAllDogs } = dogsSlice.actions

export default dogsSlice.reducer