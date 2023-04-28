import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import './adoptionForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { emptyMaybeAdoptedDogs } from '../../../_redux/actions/dogsAction';
import CloudinaryWidget from '../../Cloudinary/CloudinaryForm/CloudinaryWidget';
import CloudinaryWidgetFull from '../../Cloudinary/CloudinaryForm/CloudinaryWidgetFull';
import * as requestAction from '../../../_redux/actions/requestAction';
import { useNavigate } from 'react-router-dom';
import useToast from '../../../utils/hooks/useToast';

const AdoptionForm = () => {
	const dispatch = useDispatch();
	const dogId = useSelector((state) => state.dogsReducer.maybeAdoptedDog);
	const navigate = useNavigate();

	const [url, setUrl] = useState('');

	const { success } = useToast();

	const initialValues = {
		name: '',
		age: '',
		phone: '',
		address: '',
		email: '',
		areas_conditions: '',
		more_animals: false,
		moreAnimals_details: '',
		proper_income: '',
		inHouse_allowance: '',
		outDoor_image: url,
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(4, 'El nombre debe tener mínimo 4 caracteres. *')
			.matches(
				/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/,
				'Sólo letras de la "A" a la "Z" *',
			)
			.required('El nombre es obligatorio'),
		age: Yup.number()
			.min(18, 'La edad tiene que ser mayor a 18 años. *')
			.required('La edad es obligatoria.'),
		phone: Yup.string()
			.matches(
				/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
				'Ingrese un número válido.',
			)
			.required('El número de celular es de caracter obligatorio.'),
		address: Yup.string().required('La dirección es obligatoria.'),
		email: Yup.string()
			.matches(
				/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
				'Ingrese un email válido.',
			)
			.required('El email es obligatorio.'),
		areas_conditions: Yup.string().oneOf(
			['Excellent', 'Good', 'Bad', 'N/A'],
			'Seleccione una opción.',
		),
		more_animals: Yup.string().required('Seleccione una opción.'),
		moreAnimals_details: Yup.string(),
		// .required('Es obligatoria esta información.')
		proper_income: Yup.string().required('Elige una opción.'),
		inHouse_allowance: Yup.string().required('Elige una opción.'),
		outDoor_image: Yup.string().matches(
			/^.*\.(jpg|jpeg|png)$/i,
			'Inserte una imagen válida.',
		),
	});

	const handleSubmit = (values) => {
		const obj = {
			name: values.name,
			age: values.age,
			phone: values.phone,
			address: values.address,
			email: values.email,
			areas_conditions: values.areas_conditions,
			more_animals: values.more_animals === 'Yes' ? true : false,
			moreAnimals_details: values.moreAnimals_details,
			proper_income: values.proper_income,
			inHouse_allowance: values.inHouse_allowance,
			outDoor_image: url,
			dogId: dogId.id,
		};
		dispatch(requestAction.postAdoptionDog(obj));
		success(`¡Solicitud de adopción de ${initialValues.name} enviada!`, {
			duration: 2000,
		});
		setTimeout(() => {
			navigate('/dogs');
		}, 2000);
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		handleSubmit,
	});

	useEffect(() => {
		return () => {
			dispatch(emptyMaybeAdoptedDogs());
		};
	}, []);

	return (
		<div className="mainContainer-Form" data-aos="fade-up">
			<div className="container-Form">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values) => handleSubmit(values)}
				>
					{({ errors, values }) => (
						<Form>
							<h1 className="title-Form">
								Formulario de Adopción de {dogId.name}
							</h1>
							<div className="box-Form">
								<div className="containerInputsLeft-Form">
									<div className="eachField">
										<label htmlFor="name">
											Nombre completo de la/el adoptante
										</label>
										<Field
											name="name"
											type="text"
											placeholder="EJ: Pepito Juárez"
										/>
										<ErrorMessage name="name">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="age">Edad</label>
										<Field name="age" type="number" placeholder="EJ: 25" />
										<ErrorMessage name="age">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="phone">Teléfono</label>
										<Field
											name="phone"
											type="number"
											placeholder="EJ: +54**********"
										/>
										<ErrorMessage name="phone">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="text">Dirección</label>
										<Field
											name="address"
											type="text"
											placeholder="EJ: Calle Falsa, 123, Springfield"
										/>
										<ErrorMessage name="address">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="email">Email</label>
										<Field
											name="email"
											type="email"
											placeholder="EJ: pepitojuarez1@hotmail/gmail.com"
										/>
										<ErrorMessage name="email">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>
								</div>

								<div className="containerInputsRight-Form">
									<div className="eachField">
										<label htmlFor="more_animals">
											¿Tienes otros animales? Si la respuesta es sí, ¿cuántos y
											de qué tipo?
										</label>
										<div className="more_animals-Container">
											<Field name="more_animals" as="select">
												<option value=""></option>
												<option value="Yes">Si</option>
												<option value="No">No</option>
											</Field>
											{/* {values.more_animals !== false && ( */}
											<div className="hideInput">
												<Field
													disabled={
														values.more_animals === 'No' ||
														values.more_animals === ''
													}
													type="text"
													id="moreAnimals_details"
													value={
														values.more_animals !== 'Yes'
															? ''
															: values.moreAnimals_details
													}
													name="moreAnimals_details"
													placeholder="EJ: 2 gatos, 1 perro."
												/>
												<ErrorMessage name="moreAnimals_details">
													{(msg) => <div className="errorMessage">{msg}</div>}
												</ErrorMessage>
											</div>
											{/* )} */}
										</div>
										<ErrorMessage name="more_animals">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="proper_income">
											¿Tiene los medios económicos para substentar los gastos
											económicos de su mascota?
										</label>
										<Field name="proper_income" as="select">
											<option value="all"></option>
											<option value="Yes">Si</option>
											<option value="No">No</option>
										</Field>
										<ErrorMessage name="proper_income">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="inHouse_allowance">
											¿Consultaste en tu edificio, consorcio o propietario, si
											están de acuerdo con la adopción?
										</label>
										<Field as="select" name="inHouse_allowance">
											<option value="all"></option>
											<option value="Yes">Si</option>
											<option value="No">No</option>
										</Field>
										<ErrorMessage name="inHouse_allowance">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="outDoor_image">
											Foto de su patio/balcón/espacio al aire libre
										</label>

										<div className="containerUpload-Form">
											{url.length > 0 && (
												<div>
													<CloudinaryWidgetFull url={url} setUrl={setUrl} />
												</div>
											)}
											{url.length === 0 && (
												<div>
													<CloudinaryWidget url={url} setUrl={setUrl} />
												</div>
											)}
											<div className="userImageContainer-AdoptionForm">
												<img
													src={url}
													alt={formik.values.title}
													title={formik.values.title}
													loading="lazy"
													className="userImage-AdoptionForm"
												/>
											</div>
										</div>
										<ErrorMessage name="outDoor_image">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="areas_conditions">
											¿Cómo se encuentra el estado de tu patio/balcón?
										</label>
										<Field name="areas_conditions" as="select">
											<option value="all"></option>
											<option value="Excellent">Excelente</option>
											<option value="Good">Bueno</option>
											<option value="Bad">Malo</option>
											<option value="N/A">No aplica</option>
										</Field>
										<ErrorMessage name="areas_conditions">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>
								</div>
							</div>

							<div className="containerBtn-Form">
								<button disabled={Object.keys(errors).length > 0} type="submit">
									ENVIAR
								</button>
							</div>
							<div className="containerGoHome-Form">
								<h4>Aún no sé si estoy listo/a, regresar a</h4>
								<Link to="/home" className="goHome-Form">
									<i className="fa-solid fa-house"></i>
								</Link>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default AdoptionForm;
