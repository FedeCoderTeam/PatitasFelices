import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CloudinaryWidget from '../../Cloudinary/CloudinaryWidget';
import CloudinaryWidgetFull from '../../Cloudinary/CloudinaryWidgetFull';
import style from './UpdateDogForm.module.css';
import * as dogsAction from '../../../_redux/actions/dogsAction';

const UpdateDogForm = (props) => {
	const dispatch = useDispatch();

	const temperaments = useSelector((state) => state.dogsReducer.temperaments);
	const dogToUpdate = useSelector((state) => state.dogsReducer.dogDetail);
	const navigate = useNavigate();
	console.log(dogToUpdate);

	useEffect(() => {
		return () => {
			dispatch(dogsAction.setDetail());
		};
	}, []);

	const [url, setUrl] = useState('');

	const initialValues = {
		id: dogToUpdate.id,
		name: dogToUpdate.name,
		age: dogToUpdate.age,
		size: dogToUpdate.size,
		weight: dogToUpdate.weight,
		castrated: dogToUpdate.castrated,
		tempers: dogToUpdate.tempers,
		colors: dogToUpdate.colors,
		gender: dogToUpdate.gender,
		image: dogToUpdate.image,
		description: dogToUpdate.description,
		adopted: dogToUpdate.adopted,
		isDisabled: dogToUpdate.isDisabled,
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(4, 'El nombre debe tener mínimo 4 caracteres. *')
			.matches(
				/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/,
				'Sólo letras de la "A" a la "Z". *',
			)
			.required('El nombre es obligatorio. *'),
		age: Yup.number()
			.min(1, 'Debe introducir una edad aproximada en meses. *')
			.max(240, '¡WOW!¿Estás seguro que el perro tiene estos meses? *')
			// .matches(/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/, 'Sólo letras de la "A" a la "Z" *')
			.required('La edad es obligatoria. *'),
		size: Yup.string().oneOf(
			['Giant', 'Large', 'Medium', 'Small', 'Mini'],
			'El tamaño es obligatorio. *',
		),
		weight: Yup.number()
			.min(1, 'El peso tiene que ser mayor a 1. *')
			.max(110, '¡WOW!¿Estás seguro que es un perro? *')
			.required('El peso es obligatorio. *'),
		gender: Yup.string().oneOf(
			['Hembra', 'Macho'],
			'El género es obligatorio. *',
		),
		castrated: Yup.boolean().oneOf(
			['Yes', 'No'],
			'Este campo es obligatorio. *',
		),
		colors: Yup.string().oneOf(
			['Negro', 'Blanco', 'Gris', 'Marron', 'Dorado', 'Cobrizo', 'Crema'],
			'El color es obligatorio. *',
		),
		description: Yup.string().required('La descripción es obligatoria. *'),
		adopted: Yup.boolean().oneOf(['Yes', 'No'], 'Este campo es obligatorio. *'),
		isDisabled: Yup.boolean().oneOf(
			['Yes', 'No'],
			'Este campo es obligatorio. *',
		),
		image: Yup.string()
			.matches(/^.*\.(jpg|jpeg|png)$/i, 'Inserte una imagen válida. *')
			.required('La imagen es obligatoria. *'),
	});

	const handleSubmit = async (values) => {
		const obj = {
			id: values.id,
			name: values.name,
			age: values.age,
			size: values.size,
			weight: values.weight,
			castrated: values.castrated,
			tempers: values.tempers,
			colors: values.colors,
			genders: values.genders,
			image: values.image,
			description: values.description,
			adopted: values.adopted,
			isDisabled: values.isDisabled,
		};
		console.log(obj);
		await dispatch(dogsAction.updateDogs(obj));
		alert(JSON.stringify(obj, null, 2));
		navigate('/dashboard/dogs');
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		handleSubmit,
	});

	return (
		<div className={style.mainContainerForm}>
			<div className={style.containerForm}>
				<Formik
					initialValues={formik.initialValues}
					validationSchema={validationSchema}
					onSubmit={formik.handleSubmit}
				>
					{({ errors, values }) => (
						<Form>
							<h1 className={style.titleForm}>Editar Perro</h1>
							<div className={style.boxForm}>
								<div className={style.containerInputsLeftForm}>
									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="name">
											Nombre
										</label>
										<Field
											className={style.inputs}
											value={initialValues.name}
											name="name"
											type="text"
											placeholder="Ej: Otis"
											onChange={formik.handleChange}
										/>
										<ErrorMessage name="name">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="age">
											Edad (meses)
										</label>
										<Field
											className={style.inputs}
											value={initialValues.age}
											name="age"
											type="number"
											placeholder="Ej: 24"
											onChange={formik.handleChange}
										/>
										<ErrorMessage name="age">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="size">
											Tamaño
										</label>
										<Field
											className={style.inputSelect}
											value={initialValues.size}
											as="select"
											id="size"
											name="size"
											onChange={formik.handleChange}
										>
											<option className={style.options} value="all"></option>
											<option className={style.options} value="Giant">
												Gigante
											</option>
											<option className={style.options} value="Large">
												Grande
											</option>
											<option className={style.options} value="Medium">
												Mediano
											</option>
											<option className={style.options} value="Small">
												Pequeño
											</option>
											<option className={style.options} value="Medium">
												Muy pequeño
											</option>
										</Field>
										<ErrorMessage name="size">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="weight">
											Peso (kg.)
										</label>
										<Field
											className={style.inputs}
											value={initialValues.weight}
											name="weight"
											type="number"
											placeholder="Ej: 24"
											onChange={formik.handleChange}
										/>
										<ErrorMessage name="weight">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="gender">
											Género
										</label>
										<Field
											className={style.inputSelect}
											value={initialValues.gender}
											as="select"
											id="genders"
											name="genders"
											onChange={formik.handleChange}
										>
											<option className={style.options} value="all"></option>
											<option className={style.options} value="Hembra">
												Hembra
											</option>
											<option className={style.options} value="Macho">
												Macho
											</option>
										</Field>
										<ErrorMessage name="gender">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="castrated">
											¿Está castrado?
										</label>
										<Field
											className={style.inputSelect}
											value={initialValues.castrated}
											as="select"
											id="castrated"
											name="castrated"
											onChange={formik.handleChange}
										>
											<option className={style.options} value="all"></option>
											<option className={style.options} value={true}>
												Sí
											</option>
											<option className={style.options} value={false}>
												No
											</option>
										</Field>
										<ErrorMessage name="castrated">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>
								</div>
								<div className={style.containerInputsRightForm}>
									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="tempers">
											Temperamentos
										</label>
										<Field
											className={style.inputSelect}
											value={initialValues.tempers}
											as="select"
											id="tempers"
											name="tempers"
											onChange={formik.handleChange}
										>
											<option className={style.options} value="all"></option>
											{temperaments.map((temper) => (
												<option className={style.options} value={temper.name}>{temper.name}</option>
											))}
										</Field>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="colors">
											Colores
										</label>
										<Field
											className={style.inputSelect}
											value={initialValues.colors}
											as="select"
											id="colors"
											name="colors"
											onChange={formik.handleChange}
										>
											<option className={style.options} value="all"></option>
											<option className={style.options} value="Negro">
												Negro
											</option>
											<option className={style.options} value="Blanco">
												Blanco
											</option>
											<option className={style.options} value="Gris">
												Gris
											</option>
											<option className={style.options} value="Marron">
												Marrón
											</option>
											<option className={style.options} value="Dorado">
												Dorado
											</option>
											<option className={style.options} value="Cobrizo">
												Cobrizo
											</option>
											<option className={style.options} value="Crema">
												Crema
											</option>
										</Field>
										<ErrorMessage name="colors">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="description">
											Descripción del Perro
										</label>
										<Field
											className={style.inputTextArea}
											value={initialValues.description}
											type="text"
											id="description"
											name="description"
											onChange={formik.handleChange}
										/>
										<ErrorMessage name="description">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="adopted">
											¿Fue adoptado?
										</label>
										<Field
											className={style.inputSelect}
											value={initialValues.adopted}
											as="select"
											id="adopted"
											name="adopted"
											onChange={formik.handleChange}
										>
											<option className={style.options} value="all"></option>
											<option className={style.options} value={true}>
												Sí
											</option>
											<option className={style.options} value={false}>
												No
											</option>
										</Field>
										<ErrorMessage name="adopted">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="isDisabled">
											¿El perrito falleció?
										</label>
										<Field
											className={style.inputSelect}
											value={initialValues.isDisabled}
											as="select"
											id="isDisabled"
											name="isDisabled"
										>
											<option className={style.options} value="all"></option>
											<option className={style.options} value={true}>
												Sí
											</option>
											<option className={style.options} value={false}>
												No
											</option>
										</Field>
										<ErrorMessage name="isDisabled">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.eachField}>
										<label className={style.labels} htmlFor="image">
											Adjunte imagen del perro a editar
										</label>
										<div className={style.containerUploadForm}>
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
											<div className={style.divImgUser}>
												<img
													className={style.imgUser}
													src={!url.length ? initialValues.image : url}
													alt={formik.values.title}
													title={formik.values.title}
													loading="lazy"
												/>
											</div>
										</div>
										<ErrorMessage name="image">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>
								</div>
							</div>
							<div className={style.containerBtnForm}>
								<button
									className={style.btnCreate}
									disabled={Object.keys(errors).length > 0}
									type="submit"
								>
									EDITAR
								</button>
							</div>
						</Form>
					)} 
				</Formik>
			</div>
		</div>
	);
};

export default UpdateDogForm;
