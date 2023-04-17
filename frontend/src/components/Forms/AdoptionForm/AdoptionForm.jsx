import React from 'react';
import './adoptionForm.css';
import upload from './images/upload.png'

const AdoptionForm = () => {
   const handleClick = () => {

   }
    return (
        <div className='mainContainer-Form'>
            <div className='container-Form'>
                <form>
                    <h1 className='title-Form'>Formulario de Adopción</h1>
                    <div className='box-Form'>
                        <div className='containerInputsLeft-Form'>
                            <label>Nombre completo de la/el adoptante *</label>
                            <input type="text" />
                            <label>Edad *</label>
                            <input type="number" />
                            <label>Teléfono *</label>
                            <input type="number" />
                            <label>Dirección *</label>
                            <input type="text" />
                            <label>¿Cómo se encuentra el estado de tu patio/balcón?</label>
                            <input type="text" />
                        </div>
                        <div className='containerInputsRight-Form'>
                            <label>¿Tenés otros animales?</label>
                            <input type="text" />
                            <label>¿A qué espacios de tu hogar tendría acceso el nuevo integrante?</label>
                            <input type="text" />
                            <label>¿Cómo afrontarías los gastos económicos que requiere tu mascota?</label>
                            <input type="text" />
                            <label>¿Consultaste en tu edificio, consorcio o propietario, si están de acuerdo con la adopción?</label>
                            <input type="text" />
                            <div className='containerUpload-Form'>
                            <input className='upload-Form' type="file" />
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                    <div className='containerBtn-Form'>
                        <button type='submit'>ENVIAR</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdoptionForm
