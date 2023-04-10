'use client'
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/_redux/hooks';
import {decrement, increment} from '@/_redux/reducer/counterSlice';
import {addAllPersonAsync} from '@/_redux/actions/personAction';


const About = () : JSX.Element => {
    const count = useAppSelector((state) => state.counterReducer.value);
    const person = useAppSelector((state) => state.personReducer.person)
    const dispatch = useAppDispatch();

    return(
        <div>
            <h1>About</h1>
            <h3>Count: {count}</h3>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>

            <button onClick={() => dispatch(addAllPersonAsync())}>Add all person</button>

            <h3>{person.length > 0 && person.map((value, index) => (<div key={index}>{value.name}</div>))}</h3>
        </div>
    )
}

export default About