import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CloudinaryWidget from '../../../../components/Cloudinary/CloudinaryForm/CloudinaryWidget';
import CloudinaryWidgetFull from '../../../../components/Cloudinary/CloudinaryForm/CloudinaryWidgetFull';
import style from './CreateDog.module.css';
import * as dogsAction from '../../../../_redux/actions/dogsAction';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useToast from '../../../../utils/hooks/useToast';

const CreateDog = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [url, setUrl] = useState('');

	const { success } = useToast();

	const temperaments = useSelector((state) => state.dogsReducer.temperaments);

	const initialValues = {
		name: '',
		age: '',
		size: '',
		weight: '',
		castrated: false,
		tempers: [],
		colors: [],
		genders: '',
		image: url,
		description: '',
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
			.min(1, 'Debe introducir una edad aproximada en meses. EJ: 33. *')
			.max(240, '¡WOW!¿Estás seguro que el perro tiene estos meses?')
			.required('La edad es obligatoria'),
		size: Yup.string().required('El tamaño es obligatorio'),
		weight: Yup.number()
			.min(1, 'El peso tiene que ser mayor a 1. *')
			.max(100, '¿Estás dando en adopción un perro o chancho?')
			.required('El peso es obligatorio.'),
		castrated: Yup.string().oneOf(
			['Yes', 'No'],
			'Este campo es obligatorio. *',
		),
		image: Yup.string().matches(
			/^..(jpg|jpeg|png)$/i,
			'Inserte una imagen válida.',
		),
		// .required('La imagen es obligatoria.'),
		description: Yup.string()
			.min(10, 'La descripción debe tener mínimo 20 caracteres. *')
			.matches(
				/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/,
				'Sólo letras de la "A" a la "Z" *',
			)
			.required('La descripción es obligatoria'),
		colors: Yup.array()
			.of(
				Yup.string().oneOf([
					'Negro',
					'Blanco',
					'Gris',
					'Marron',
					'Dorado',
					'Cobrizo',
					'Crema',
				]),
			)
			.min(1, 'Seleccione por lo menos un color'),
		genders: Yup.string().required('Seleccione una opción.'),
		temperaments: Yup.array()
			.of(Yup.string().oneOf([temperaments.map((inst) => inst.name)]))
			.min(1, 'Seleccione por lo menos un color'),
	});

	const handleSubmit = (values) => {
		const obj = {
			name: values.name,
			age: values.age,
			size: values.size,
			weight: values.weight,
			castrated: values.castrated,
			tempers: values.tempers,
			colors: values.colors,
			genders: values.genders,
			image: url,
			description: values.description,
		};
		console.log(obj);
		dispatch(dogsAction.postDogs(obj));
		success(`¡Perro ingresado exitosamente!`, {
			duration: 2000,
		});
		setTimeout(() => {
			navigate('/dashboard/dogs');
		}, 2000);
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		handleSubmit,
	});

	return (
		<div className={style.mainContainerCreateDog}>
			<div className={style.containerCreateDog}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values) => handleSubmit(values)}
				>
					{({ errors }) => (
						<Form>
							<div>
								<Link to="/dashboard/dogs">
									<button className={style.goBackBtn}>
										<i class="fa-solid fa-arrow-left"></i>
									</button>
								</Link>
								<h1 className={style.titleCreateDog}>Ingresar Perro</h1>
							</div>
							<div className={style.boxCreateDog}>
								<div className={style.containerInputsLeftCreateDog}>
									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="name">
											Nombre del Perro
										</label>
										<Field
											className={style.inputs}
											name="name"
											type="text"
											placeholder="Ej: Midu"
										/>
										<ErrorMessage name="name">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="age">
											Edad del Perro
										</label>
										<Field
											className={style.inputs}
											name="age"
											type="number"
											placeholder="Ej: 18 (meses)."
										/>
										<ErrorMessage name="age">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="size">
											Tamaño del Perro
										</label>
										<Field
											className={style.inputs}
											name="size"
											as="select"
											placeholder="Ej: Gigante"
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
											<option className={style.options} value="Mini">
												Mini
											</option>
										</Field>
										<ErrorMessage name="size">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="weight">
											Peso del Perro
										</label>
										<Field
											className={style.inputs}
											name="weight"
											type="number"
											placeholder="Ej: 10 (kg)"
										/>
										<ErrorMessage name="weight">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="genders">
											Seleccione el género
										</label>
										<Field
											className={style.inputSelect}
											as="select"
											id="genders"
											name="genders"
										>
											<option
												className={style.options}
												defaultValue="all"
											></option>
											<option className={style.options} value="Hembra">
												Hembra
											</option>
											<option className={style.options} value="Macho">
												Macho
											</option>
										</Field>
										<ErrorMessage name="genders">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>
								</div>
								<div className={style.containerInputsRightCreateDog}>
									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="castrated">
											¿Está castrado?
										</label>
										<Field
											className={style.inputSelect}
											as="select"
											id="castrated"
											name="castrated"
										>
											<option className={style.options} value="all"></option>
											<option className={style.options} value="Yes">
												Sí
											</option>
											<option className={style.options} value="No">
												No
											</option>
										</Field>
										<ErrorMessage name="castrated">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="description">
											Cuenta sobre la historia del perro
										</label>
										<Field
											className={style.inputTextArea}
											type="string"
											id="description"
											name="description"
										></Field>
										<ErrorMessage name="description">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="colors">
											Seleccione al menos un color
										</label>
										<Field
											className={style.inputSelectMultiple}
											as="select"
											multiple
											id="colors"
											name="colors"
										>
											<option className={style.options} value=""></option>
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
												Marron
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
										<label className={style.labels} htmlFor="tempers">
											Seleccione los temperamentos
										</label>
										<Field
											className={style.inputSelectMultiple}
											as="select"
											multiple
											id="tempers"
											name="tempers"
										>
											<option className={style.options} value="all"></option>
											{temperaments.map((inst) => (
												<option>{inst.name}</option>
											))}
										</Field>
										<ErrorMessage name="tempers">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.eachField}>
										<label className={style.labels} htmlFor="image">
											Adjunte la imagen del perro
										</label>
										<div className={style.containerUploadCreateDog}>
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
													src={url}
													alt={formik.values.title}
													title={formik.values.title}
													loading="lazy"
												/>
											</div>
										</div>
										<ErrorMessage name="image">
											{(msg) => <div className={style.errorMessage}>{msg}</div>}
										</ErrorMessage>
									</div>
								</div>
							</div>
							<div className={style.containerBtnCreateDog}>
								<button
									className={style.btnCreate}
									disabled={Object.keys(errors).length > 0}
									type="submit"
								>
									CREAR
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default CreateDog;
