'use client'
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/_redux/hooks';
import {decrement, increment} from '@/_redux/reducer/counterSlice';
import {useSelector} from 'react-redux';

const About = () : JSX.Element => {
    const count = useAppSelector((state) => state.counterReducer.value);
    const dispatch = useAppDispatch();
    return(
        <div>
            <h1>About</h1>
            <h3>Count: {count}</h3>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    )
}

export default About