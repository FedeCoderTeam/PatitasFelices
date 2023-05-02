import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reviews: [],
}

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        getAllReviews: (state, action) => {
            state.reviews = action.payload.reverse()
        },
        getDeleteReview: (state, action) => {
            state.reviews = state.reviews.filter(review => review.id !== action.payload)
        }
    }
});

export const {
    getAllReviews,
    getDeleteReview
} = reviewsSlice.actions;

export default reviewsSlice.reducer;