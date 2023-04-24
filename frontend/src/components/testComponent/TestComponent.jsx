import React from 'react';
import style from './testComponent.module.css';


const TestComponent = () => {
    return (
        <div>
            RATING(prueba):
            <div className={style.container}>
                <div className={style.rating}>
                    <input type="radio" name='clr1' style={{ color: '#ff9933' }} />
                    <input type="radio" name='clr1' style={{ color: '#ff9933' }} />
                    <input type="radio" name='clr1' style={{ color: '#ff9933' }} />
                    <input type="radio" name='clr1' style={{ color: '#ff9933' }} />
                    <input type="radio" name='clr1' style={{ color: '#ff9933' }} />
                </div>
            </div>
        </div>
    )
}

export default TestComponent
