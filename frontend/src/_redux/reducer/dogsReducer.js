import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dogs: [], // filtrado
    allDogs: [], //estado original
    temperaments: []
}

export const dogsSlice = createSlice({
    name: 'dogs',
    initialState,
    reducers: {
        getAllDogs: (state, action) => {
            state.dogs = action.payload
            state.allDogs = action.payload
        },

        getAllTemperaments: (state, action) => {
            state.temperaments = action.payload
        },
        
    },

})

// Action creators are generated for each case reducer function
export const { getAllDogs, getAllTemperaments } = dogsSlice.actions


export default dogsSlice.reducer