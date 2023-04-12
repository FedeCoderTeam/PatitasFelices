import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dogs: [], // filtrado
    allDogs: [], //estado original
    temperaments: [],
    colors: [],
    sortBy: 'name',
    sortOrder: 'asc',
    filterByWeigth: null,
    filterBySize: null,
    filterByAge: null,
    filterByGenre: null,
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
        
        getAllDogsColors: (state, action) => {
            state.colors = action.payload
        },

        setSortBy(state, action) {
            state.sortBy = action.payload;
            state.allDogs = state.allDogs.slice().sort((a, b) => {
                if(a[state.sortBy] < b[state.sortBy]) {
                    return state.sortOrder === 'asc' ? -1 : 1;
                }
                if(a[state.sortBy] < b[state.sortBy]) {
                    return state.sortOrder === 'asc' ? 1 : -1;
                }
                return 0;
            });
        },
        setSortOrder(state, action) {
            state.sortOrder = action.payload;
        },
        setfilterByWeigth(state, action) {
            state.filterByWeigth = action.payload;
        },
        setfilterBySize(state, action) {
            state.filterBySize = action.payload;
        },
        setfilterByAge(state, action) {
            state.filterByAge = action.payload;
        },
    },

})


export const { 
    getAllDogs, 
    getAllTemperaments,
    getAllDogsColors,
    setSortBy,
    setSortOrder,
    setfilterByWeigth,
    setfilterBySize,
    setfilterByAge,
    } = dogsSlice.actions


export default dogsSlice.reducer