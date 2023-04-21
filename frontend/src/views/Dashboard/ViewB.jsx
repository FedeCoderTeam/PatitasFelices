import React from "react";
import { Link } from 'react-router-dom';

const ViewB = () => {
    return (
        <div>
            <section className="containerBtns-ViewB">
                <div>
                    <button>a</button>
                    <Link to='./CreateDog'><button></button>b</Link>
                    <Link to='./updateProduct'><button>d</button></Link>
                </div>
            </section>
        </div>
    )
}

export default ViewB

