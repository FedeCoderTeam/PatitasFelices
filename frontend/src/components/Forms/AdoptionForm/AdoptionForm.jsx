import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import './adoptionForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { emptyMaybeAdoptedDogs } from '../../../_redux/actions/dogsAction';
import CloudinaryWidget from '../../Cloudinary/CloudinaryWidget';

const AdoptionForm = () => {
	const dispatch = useDispatch();
	const dogId = useSelector((state) => state.dogsReducer.maybeAdoptedDog);

	const [url, setUrl] = useState('');

	const initialValues = {
		fullName: '',
		age: '',
		phone: '',
		address: '',
		email: '',
		state: '',
		otherAnimals: false,
		howMany: '',
		income: '',
		allowance: '',
		image: url,
	};

	const validationSchema = Yup.object().shape({
		fullName: Yup.string()
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
		state: Yup.string().oneOf(
			['Excelente', 'Bueno', 'Malo', 'No aplica'],
			'Seleccione una opción.',
		),
		otherAnimals: Yup.string().required('Seleccione una opción.'),
		howMany: Yup.string().required('Es obligatoria esta información.'),
		income: Yup.string().required('Elige una opción.'),
		allowance: Yup.string().required('Elige una opción.'),
		image: Yup.string().matches(
			/^.*\.(jpg|jpeg|png)$/i,
			'Inserte una imagen válida.',
		),
		/* .test('FILE_SIZE', 'imagen demasiado grande', (value) => value && value.size < 1024 * 1024) */
		/* .required('La imagen es obligatoria') */
	});

	const handleSubmit = async (values) => {
		const obj = {
			fullName: values.fullName,
			age: values.age,
			phone: values.phone,
			address: values.address,
			email: values.email,
			state: values.state,
			otherAnimals: false,
			howMany: values.howMany,
			income: values.income,
			allowance: values.allowance,
			image: url,
		};
		// await dispatch(post(obj))
		// alert(JSON.stringify(values, null, 2))
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		handleSubmit: () => {
			console.log(formik.values);
		},
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
										<label htmlFor="fullName">
											Nombre completo de la/el adoptante
										</label>
										<Field
											name="fullName"
											type="text"
											placeholder="EJ: Pepito Juárez"
										/>
										<ErrorMessage name="fullName">
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
										<label htmlFor="otherAnimals">
											¿Tienes otros animales? Si la respuesta es sí, ¿cuántos y
											de qué tipo?
										</label>
										<div className="otherAnimals-Container">
											<Field
												type="checkbox"
												id="otherAnimals"
												name="otherAnimals"
												className="checkbox"
											/>
											{values.otherAnimals && (
												<div className="hideInput">
													{/* <label htmlFor="howMany">¿Cuántos son y qué tipo de animales son?</label> */}
													<Field
														type="text"
														id="howMany"
														name="howMany"
														placeholder="EJ: 2 gatos, 1 perro."
													/>
													<ErrorMessage name="howMany">
														{(msg) => <div className="errorMessage">{msg}</div>}
													</ErrorMessage>
												</div>
											)}
										</div>
										<ErrorMessage name="otherAnimals">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="income">
											¿Tiene los medios económicos para substentar los gastos
											económicos de su mascota?
										</label>
										<Field name="income" as="select">
											<option value="all"></option>
											<option value="si">Si</option>
											<option value="no">No</option>
										</Field>
										<ErrorMessage name="income">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="allowance">
											¿Consultaste en tu edificio, consorcio o propietario, si
											están de acuerdo con la adopción?
										</label>
										<Field as="select" name="allowance">
											<option value="all"></option>
											<option value="si">Si</option>
											<option value="no">No</option>
										</Field>
										<ErrorMessage name="allowance">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="image">
											Foto de su patio/balcón/espacio al aire libre
										</label>
										<div className="containerUpload-Form">
											<div>
												<CloudinaryWidget url={url} setUrl={setUrl} />
											</div>
											<div>
												<img
													src={url}
													alt={formik.values.title}
													title={formik.values.title}
													loading="lazy"
												/>
											</div>
										</div>
										<ErrorMessage name="image">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="state">
											¿Cómo se encuentra el estado de tu patio/balcón?
										</label>
										<Field name="state" as="select">
											<option value="all"></option>
											<option value="Excelente">Excelente</option>
											<option value="Bueno">Bueno</option>
											<option value="Malo">Malo</option>
											<option value="No aplica">No aplica</option>
										</Field>
										<ErrorMessage name="state">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>
								</div>
							</div>

							<div className="containerBtn-Form">
								<button disabled={Object.keys(errors).length > 0} type="submit">
									{' '}
									ENVIAR{' '}
								</button>
							</div>
							<div className="containerGoHome-Form">
								<h4>Aún no sé si estoy listo/a, regresar a</h4>
								<Link to="/home" className="goHome-Form">
									<i class="fa-solid fa-house"></i>
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
