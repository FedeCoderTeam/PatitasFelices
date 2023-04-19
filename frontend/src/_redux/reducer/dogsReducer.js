import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	dogs: [], // el que se puede filtrar
	allDogs: [], //no cambiar
	filtered: [], // el que mantiene el ultimo filtro aplicado
	dogDetail: {},
	temperaments: [],
	colors: [],
	genders: [],
	sortBy: '',
	sortOrder: '',
	setSize: 'All',
	setColor: 'All',
	setGender: 'All',
	setTemperaments: 'All',
	currentPage: 1,
	maybeAdoptedDog: {},
};

export const dogsSlice = createSlice({
	name: 'dogs',
	initialState,
	reducers: {
		getAllDogs: (state, action) => {
			state.dogs = action.payload;
			state.allDogs = action.payload;
			state.filtered = action.payload;
		},

		getDogDetail: (state, action) => {
			state.dogDetail = action.payload;
		},

		setEmptyDetail: (state) => {
			state.dogDetail = {};
		},

		getAllTemperaments: (state, action) => {
			state.temperaments = action.payload;
		},

		getAllDogsColors: (state, action) => {
			state.colors = action.payload;
		},

		getNameDog: (state, action) => {
			state.allDogs = action.payload;
		},

		getGenders: (state, action) => {
			state.genders = action.payload;
		},

		setFilters: (state, action) => {
			if (action.payload.setColor) {
				return {
					...state,
					setColor: action.payload.setColor,
				};
			}
			if (action.payload.setSize) {
				return {
					...state,
					setSize: action.payload.setSize,
				};
			}
			if (action.payload.setTemperaments) {
				return {
					...state,
					setTemperaments: action.payload.setTemperaments,
				};
			}
			if (action.payload.setGender) {
				return {
					...state,
					setGender: action.payload.setGender,
				};
			}
			if (action.payload.sortOrder && action.payload.sortBy) {
				return {
					...state,
					sortBy: action.payload.sortBy,
					sortOrder: action.payload.sortOrder,
				};
			}
		},

		filtered: (state) => {
			let filtered = state.allDogs;

			if (state.setColor !== 'All') {
				filtered = filtered.filter((el) => el.colors.includes(state.setColor));
			}

			if (state.setTemperaments !== 'All') {
				filtered = filtered.filter((el) =>
					el.temperaments.includes(state.setTemperaments),
				);
			}

			if (state.setSize !== 'All') {
				filtered = filtered.filter((el) => el.size === state.setSize);
			}

			if (state.setGender !== 'All') {
				filtered = filtered.filter((el) => el.gender === state.setGender);
			}

			state.dogs = filtered;
			state.filtered = filtered;
		},

		sortDogs: (state) => {
			let ordered = state.dogs;
			if (state.sortBy === 'age') {
				state.sortOrder === 'asc'
					? ordered.sort((a, b) => a.age - b.age)
					: ordered.sort((a, b) => b.age - a.age);
			}
			if (state.sortBy === 'weight') {
				state.sortOrder === 'asc'
					? ordered.sort((a, b) => a.weight - b.weight)
					: ordered.sort((a, b) => b.weight - a.weight);
			}
			state.dogs = ordered;
		},

		setPages: (state, action) => {
			state.currentPage = action.payload;
		},
		setMaybeAdoptedDog: (state, action) => {
			let dog = state.allDogs.find((el)=>el.id === action.payload)
			if(!dog){
				state.maybeAdoptedDog = {};
			}
			state.maybeAdoptedDog = dog;

		}
	},
});

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
	getDogDetail,
	setEmptyDetail,
	setPages,
	setMaybeAdoptedDog,
} = dogsSlice.actions;

export default dogsSlice.reducer;
