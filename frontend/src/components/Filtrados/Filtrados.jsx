import React from 'react';
import { useDispatch } from 'react-redux';

const Filtros = () => {

    //HOOKS
    const dispatch = useDispatch();

    
    return(
        <div>
            <select>
                <option value="Todos"> Todos Temperaments </option> {/* Falta agregar onChange para traer todos los temperamentos */}
                {temperaments.map((temp) => {
                    return(
                        <option value={temp} key={temp}>
                            {temp}
                        </option>
                    )
                })}
            </select>

            <select>
                <option value="Todos"> Todos Colores </option>
            </select>
            <select></select>
            <select></select>
            <select></select>
        </div>
    )
}

export default Filtros;