import React from 'react';
import './adoptionForm.css';
import upload from './images/upload.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const AdoptionForm = () => {
	const initialValues = {
		fullName: '',
		age: '',
		phone: '',
		address: '',
		email: '',
		state: '',
		otherAnimals: '',
		howMany: '',
		income: '',
		allowance: '',
		image: '',
	};

	const handleSubmit = (values) => {
		console.log(values);
	};

	return (
		<div className="mainContainer-Form">
			<div className="container-Form">
				<Formik initialValues={initialValues} onSubmit={handleSubmit}>
					{({ errors, touched }) => (
						<Form>
							<h1 className="title-Form">Formulario de Adopción</h1>
							<div className="box-Form">
								<div className="containerInputsLeft-Form">
									<label htmlFor="fullName">
										Nombre completo de la/el adoptante
									</label>
									<Field name="fullName" type="text" />
									<ErrorMessage name="fullName" />
									{/* <input value='' name='name' placeholder='Ej: Marcos Galará' type="text" /> */}
									<label>Edad</label>
									<input type="number" />
									<label>Teléfono</label>
									<input type="number" />
									<label>Dirección</label>
									<input type="text" />
									<label>Email</label>
									<input type="email" />
									<label>
										¿Cómo se encuentra el estado de tu patio/balcón?
									</label>
									<input type="text" />
								</div>
								<div className="containerInputsRight-Form">
									<label>¿Tenés otros animales?</label>
									<input type="text" />
									<label>¿Cuántos son y cuáles son?</label>
									<input type="text" />
									<label>
										¿Tiene los medios económicos para substentar los gastos
										económicos de su mascota?
									</label>
									<input type="text" />
									<label>
										¿Consultaste en tu edificio, consorcio o propietario, si
										están de acuerdo con la adopción?
									</label>
									<input type="text" />
									<label>Foto de su patio/balcón/espacio al aire libre</label>
									<div className="containerUpload-Form">
										<input className="upload-Form" type="file" />
									</div>
								</div>
							</div>
							<div></div>
							<div className="containerBtn-Form">
								<button type="submit">ENVIAR</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default AdoptionForm;
