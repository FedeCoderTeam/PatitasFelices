import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	dogs: [], // el que se puede filtrar
	allDogs: [], //no cambiar
	filtered: [], // el que mantiene el ultimo filtro aplicado
	dogDetail: {},
	temperaments: [],
	colors: [],
	genders: [],
	currentPage: 1,
	maybeAdoptedDog: {},
	sort: {
		age: 'asc',
		weight: ''
	},
	filter: {
		size: 'All',
		color: 'All',
		gender: 'All',
		temperament: 'All'
	}
};

export const dogsSlice = createSlice({
	name: 'dogs',
	initialState,
	reducers: {
		setPage: (state, action) => {
			state.currentPage = action.payload;
		},

		setSort: (state, action) => {
			state.sort.age = action.payload.age
			state.sort.weight = action.payload.weight
		},

		setFilter: (state, action) => {
			if(action.payload.size) {
				state.filter.size = action.payload.size
			}
			if(action.payload.color) {
				state.filter.color = action.payload.color
			}
			if(action.payload.gender) {
				state.filter.gender = action.payload.gender
			}
			if(action.payload.temperament) {
				state.filter.temperament = action.payload.temperament
			}
		},

		sort: (state) => {
			const { age, weight } = state.sort
			const sortedDogs = [...state.dogs]
			sortedDogs.sort((a, b) => a.id - b.id)

			if(age === 'asc') {
				sortedDogs.sort((a, b) => a.age - b.age)
			} else if(age === 'desc') {
				sortedDogs.sort((a, b) => b.age - a.age)
			}

			if(weight === 'asc') {
				sortedDogs.sort((a, b) => a.weight - b.weight)
			} else if(weight === 'desc') {
				sortedDogs.sort((a, b) => b.weight - a.weight)
			}

			state.dogs = sortedDogs
		},

		filter: (state) => {
			let filtered = state.allDogs;

			if (state.filter.size !== 'All') {
				filtered = filtered.filter((el) => el.size === state.filter.size);
			}

			if (state.filter.color !== 'All') {
				filtered = filtered.filter((el) => el.colors.includes(state.filter.color));
			}

			if (state.filter.gender !== 'All') {
				filtered = filtered.filter((el) => el.gender === state.filter.gender);
			}

			if (state.filter.temperament !== 'All') {
				filtered = filtered.filter((el) =>
					el.temperaments.includes(state.filter.temperament),
				);
			}

			state.dogs = filtered;
			state.filtered = filtered;
		},

		getAllDogs: (state, action) => {
			state.dogs = action.payload;
			state.allDogs = action.payload;
			state.filtered = action.payload;
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

		getDogDetail: (state, action) => {
			state.dogDetail = action.payload;
		},

		setEmptyDetail: (state) => {
			state.dogDetail = {};
		},

		setMaybeAdoptedDog: (state, action) => {
			state.maybeAdoptedDog = state.allDogs.find((el) => el.id === action.payload);
		},

		emptyMaybeAdoptedDog: (state) => {
			state.maybeAdoptedDog = {};
		},

	},
});

export const {
	setPage,
	setSort,
	setFilter,
	sort,
	filter,
	getAllDogs,
	getAllTemperaments,
	getAllDogsColors,
	getNameDog,
	getGenders,
	getDogDetail,
	setEmptyDetail,
	setMaybeAdoptedDog,
	emptyMaybeAdoptedDog,
} = dogsSlice.actions;

export default dogsSlice.reducer;
