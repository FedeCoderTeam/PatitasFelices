import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type PersonState = {
    person: Array<Object>;
};

const initialState = {
    person: [],
} as PersonState;

export const person = createSlice({
    name: 'person',
    initialState,
    reducers: {
        getAll: (state, action: PayloadAction<any>) => {

        }
    }
});

export const {} = person.actions
export default person.reducer;