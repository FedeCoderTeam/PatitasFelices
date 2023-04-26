import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reviews: [],
}

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        getAllReviews: (state, action) => {
            state.reviews = action.payload
        }
    }
});

export const {
    getAllReviews
} = reviewsSlice.actions;

export default reviewsSlice.reducer;