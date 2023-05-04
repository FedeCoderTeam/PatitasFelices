import {createSlice, current} from '@reduxjs/toolkit';

const initialState = {
	products: [], //filtrado
	allProducts: [], //estado original
	filtered: [], // el que mantiene el filtro aplicado
	productDetail: {},
	categories: [],
	subCategory: [],
	currentPage: 1,
	name: '',
	shoppingCart: {
		isOpen: false,
		items: [],
	},
	sort: {
		price: 'asc',
		name: ''
	},
	filter: {
		category: 'All',
		subCategory: 'All'
	},
	isFetching: false
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setIsFetching: (state, action) => {
			state.isFetching = action.payload
		},
		getAllProducts: (state, action) => {
			state.products = action.payload;
			state.allProducts = action.payload;
			state.filtered = action.payload;
		},
		getNameProduct: (state, action) => {
			state.allProducts = action.payload;
		},
		getProductDetail: (state, action) => {
			state.productDetail = action.payload;
		},
		setPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setEmptyDetail: (state) => {
			state.productDetail = {};
		},
		idSubCategories: (state, action) => {
			state.setSubCategoryId = action.payload;
		},
		getSubCategories: (state, action) => {
			if (state.setSubCategoryId > 0) {
				let filterCategory = action.payload.filter(
					(el) => el.categoryId === state.setSubCategoryId,
				);
				return {
					...state,
					subCategory: filterCategory,
				};
			}
			state.subCategory = [];
		},

		set_name: (state, action) => {
			state.name = action.payload.name;
		},

		getByName: (state) => {
			state.products = state.name === ''
				? state.filtered
				: state.filtered.filter((el) =>
					el.name.toLowerCase().includes(state.name.toLowerCase()),
				);
		},
		setOpen: (state) => {
			state.shoppingCart.isOpen = !state.shoppingCart.isOpen;
		},

		setItems: (state, action) => {
			state.shoppingCart.items = action.payload;
		},
		setSort: (state, action) => {
			state.sort.price = action.payload.price
			state.sort.name = action.payload.name
		},
		setFilter: (state, action) => {
			if(action.payload.category) {
				state.filter.category = action.payload.category
			}
			if(action.payload.subCategory) {
				state.filter.subCategory = action.payload.subCategory
			}
		},
		sort: (state) => {
			const { price, name } = state.sort
			const sortedProducts = [...state.products]
			sortedProducts.sort((a,b) => a.id - b.id)

			if(price === 'asc') {
				sortedProducts.sort((a, b) => Number(a.price) - Number(b.price))
			} else if(price === 'desc') {
				sortedProducts.sort((a, b) => Number(b.price) - Number(a.price))
			}

			if(name === 'asc') {
				sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
			} else if(name === 'desc') {
				sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
			}

			state.products = sortedProducts
		},
		filter: (state) => {
			let filtered = state.allProducts

			if(state.filter.category !== 'All') {
				filtered = filtered.filter((el) => el.category.includes(state.filter.category))
			}
			if(state.filter.subCategory !== 'All') {
				filtered = filtered.filter((el) => el.subCategory.includes(state.filter.subCategory))
			}

			state.products = filtered
			state.filtered = filtered
		},
		getCategories: (state, action) => {
			state.categories = action.payload
		}
	},
});

export const {
	setPage,
	setSort,
	setFilter,
	sort,
	filter,
	getAllProducts,
	getNameProduct,
	getProductDetail,
	setEmptyDetail,
	getSubCategories,
	idSubCategories,
	getByName,
	set_name,
	setOpen,
	setItems,
	getCategories,
	setIsFetching
} = productsSlice.actions;

export default productsSlice.reducer;
