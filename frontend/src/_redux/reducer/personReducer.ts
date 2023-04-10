import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Person {
    id: number;
    name: string;
    email: number;
}

type PersonState = {
    person: Person[];
};

const initialState = {
    person: [],
} as PersonState;

export const person = createSlice({
    name: 'person',
    initialState,
    reducers: {
        addAllPerson: (state, action: PayloadAction<Person[]>) => {
            state.person = action.payload
        }
    }
});

export const {addAllPerson} = person.actions
export default person.reducer;