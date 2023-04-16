import { createSlice } from '@reduxjs/toolkit'
import { filter } from '../actions/dogsAction'

const initialState = {
    dogs: [], // el que se puede filtrar
    allDogs: [], //no lo cambies papu
    filtered: [], // el que mantiene el ultimo filtro aplicado
    temperaments: [],
    colors: [],
    genders: [],
    sortBy: '',
    sortOrder: '',
    setSize: "All",
    setColor: "All",
    setGender: "All",
    setTemperaments: "All",
}

export const dogsSlice = createSlice({
    name: 'dogs',
    initialState,
    reducers: {
        getAllDogs: (state, action) => {
            state.dogs = action.payload
            state.allDogs = action.payload
            state.filtered = action.payload
        },

        getAllTemperaments: (state, action) => {
            state.temperaments = action.payload
        },
        
        getAllDogsColors: (state, action) => {
            state.colors = action.payload
        },

        getNameDog: (state, action) => {
            state.allDogs = action.payload
        },

        getGenders: (state, action) => {
            state.genders = action.payload
        },

        // setSort: (state, action) => {
        //     if(action.payload.sortBy) {
        //         state.sortBy = action.payload.sortBy
        //     } else if(action.payload.sortOrder) {
        //         state.sortOrder = action.payload.sortOrder
        //     }
        // },

        sortDogs: (state) => {
            // state.allDogs = state.allDogs.slice().sort((a, b) => {
            //     if(a[state.sortBy] < b[state.sortBy]) {
            //         return state.sortOrder === 'asc' ? -1 : 1;
            //     }
            //     if(a[state.sortBy] < b[state.sortBy]) {
            //         return state.sortOrder === 'asc' ? 1 : -1;
            //     }
            //     return 0;
            // });
            let ordered = state.dogs
            if(state.sortBy === 'age') {
                state.sortOrder === 'asc' 
                ? ordered.sort((a, b) => a.age - b.age) 
                : ordered.sort((a, b) => b.age - a.age)
            }
            if(state.sortBy === 'weight') {
                state.sortOrder === 'asc' 
                ? ordered.sort((a, b) => a.weight - b.weight) 
                : ordered.sort((a, b) => b.weight - a.weight)
            }
            state.dogs = ordered
        },

        setFilters: (state, action) => {
            if(action.payload.setColor) {
                return{
                    ...state,
                    setColor: action.payload.setColor
                }
            }
            if(action.payload.setSize) {
                return{
                    ...state,
                    setSize: action.payload.setSize
                }
            }
            if (action.payload.setTemperaments) {
                return{
                    ...state,
                    setTemperaments: action.payload.setTemperaments
                }
            }
            if(action.payload.setGender){
                return{
                    ...state,
                    setGender: action.payload.setGender
                }
            }
            if (action.payload.sortOrder && action.payload.sortBy) {
                return {
                    ...state,
                    sortBy: action.payload.sortBy,
                    sortOrder: action.payload.sortOrder
                }
            }
        },

        filtered: (state) => {
            let filtered = state.allDogs
            
            if(state.setColor !== 'All'){
                filtered = filtered.filter((el) => el.colors.includes(state.setColor))
            }
            
            if(state.setTemperaments !== "All"){
                filtered = filtered.filter((el) => el.temperaments.includes(state.setTemperaments))
            }
            
            if(state.setSize !== 'All'){
                filtered = filtered.filter((el) => el.size === state.setSize)
            }
            
            if(state.setGender !== 'All'){
                filtered = filtered.filter((el) => el.gender === state.setGender)
            }
            
            state.dogs = filtered
            state.filtered = filtered
        }
    },
})


export const { 
    getAllDogs, 
    getAllTemperaments,
    getAllDogsColors,
    setSort,
    sortDogs,
    getNameDog,
    setFilters,
    filtered,
    getGenders,
    } = dogsSlice.actions


export default dogsSlice.reducer