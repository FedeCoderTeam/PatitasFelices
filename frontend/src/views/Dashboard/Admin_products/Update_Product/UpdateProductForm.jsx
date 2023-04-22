import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CloudinaryWidget from '../../../../components/Cloudinary/CloudinaryForm/CloudinaryWidget';
import CloudinaryWidgetFull from '../../../../components/Cloudinary/CloudinaryForm/CloudinaryWidgetFull';
import style from './UpdateProductForm.module.css';

const UpdateProductForm = () => {
	const dispatch = useDispatch();

	const [url, setUrl] = useState('');

	const initialValues = {
		id: '',
		name: '',
		description: '',
		price: '',
		image: url,
		brand: '',
		stock: '',
		isDisabled: false,
		categoryId: '',
		subCategoryId: '',
	};

	const validationSchema = Yup.object().shape({
		id: Yup.number()
			.min(1, 'El id debe ser mayor a 0. *')
			.required('El id es obligatorio'),
		name: Yup.string()
			.min(4, 'El nombre debe tener mínimo 4 caracteres. *')
			.matches(
				/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/,
				'Sólo letras de la "A" a la "Z" *',
			)
			.required('El nombre es obligatorio'),
		description: Yup.string()
			.min(10, 'La descripción debe tener mínimo 20 caracteres. *')
			.matches(
				/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/,
				'Sólo letras de la "A" a la "Z" *',
			)
			.required('La descripción es obligatoria'),
		price: Yup.number()
			.min(1, 'El precio tiene que ser mayor a 1. *')
			.required('El precio es obligatorio.'),
		image: Yup.string().matches(
			/^.*\.(jpg|jpeg|png)$/i,
			'Inserte una imagen válida.',
		),
		brand: Yup.string()
			.min(2, 'La marca debe tener mínimo 2 caracteres. *')
			.matches(
				/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/,
				'Sólo letras de la "A" a la "Z" *',
			)
			.required('La marca es obligatoria'),
		stock: Yup.number()
			.min(0, 'El stock tiene que ser mayor o igual a 0. *')
			.required('El stock tiene que ser obligatorio.'),
		isDisabled: Yup.boolean().required('Este campo es obligatorio.'),
		categoryId: Yup.number().oneOf([1, 2], 'Seleccione una opción.'),
		subCategoryId: Yup.number().oneOf(
			[1, 2, 3, 4, 5, 6],
			'Seleccione una opción.',
		),
	});

	const handleSubmit = async (values) => {
		const obj = {
			id: values.id,
			name: values.name,
			description: values.description,
			price: values.price,
			image: url,
			brand: values.brand,
			stock: values.stock,
			isDisabled: false,
			categoryId: Number(values.categoryId),
			subCategoryId: Number(values.subCategoryId),
		};

		alert(JSON.stringify(values, null, 2));
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
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values) => handleSubmit(values)}
				>
					{({ errors, values }) => (
						<Form>
							<h1 className={style.titleForm}>Editar Producto</h1>
							<div className={style.boxForm}>
								<div className={style.containerInputsLeftForm}>
									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="id">
											Id del producto
										</label>
										<Field
											className={style.inputs}
											name="id"
											type="number"
											placeholder="Ej: 1"
										/>
										<ErrorMessage name="id">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="name">
											Nombre del producto
										</label>
										<Field
											className={style.inputs}
											name="name"
											type="text"
											placeholder="Ej: Buzo Cali Azulino"
										/>
										<ErrorMessage name="name">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="description">
											Descripción
										</label>
										<Field
											className={style.inputs}
											name="description"
											type="text"
											placeholder="Ej: Alimento para perros adultos pequeños. Desde los 18 meses."
										/>
										<ErrorMessage name="description">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="price">
											Precio
										</label>
										<Field
											className={style.inputs}
											name="price"
											type="number"
											placeholder="Ej: 2000"
										/>
										<ErrorMessage name="price">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputs}>
										<label className={style.labels} htmlFor="stock">
											Stock
										</label>
										<Field
											className={style.inputs}
											name="stock"
											type="number"
											placeholder="Ej: 10"
										/>
										<ErrorMessage name="stock">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>
								</div>
								<div className={style.containerInputsRightForm}>
									<div className={style.containerInputsMarca}>
										<label className={style.labels} htmlFor="brand">
											Marca del producto
										</label>
										<Field
											className={style.inputs}
											name="brand"
											type="brand"
											placeholder="Ej: Royal Canin"
										/>
										<ErrorMessage name="brand">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>

									<div className={style.containerInputsMarca}>
										<label className={style.labels} htmlFor="categoryId">
											Seleccione una categoría
										</label>
										<Field
											className={style.inputSelect}
											as="select"
											id="categoryId"
											name="categoryId"
										>
											<option className={style.options} value={Number('1')}>
												Alimentos
											</option>
											<option className={style.options} value={Number('2')}>
												Accesorios
											</option>
										</Field>
										<ErrorMessage name="categoryId">
											{(msg) => <div className={style.errors}>{msg}</div>}
										</ErrorMessage>
									</div>
									{values.categoryId && values.categoryId === '1' && (
										<div className={style.containerInputsMarca}>
											<label className={style.labels} htmlFor="subCategoryId">
												Seleccione una subcategoría
											</label>
											<Field
												className={style.inputSelect}
												as="select"
												id="subCategoryId"
												name="subCategoryId"
											>
												<option className={style.options} value={Number('1')}>
													Adulto
												</option>
												<option className={style.options} value={Number('2')}>
													Cachorro
												</option>
											</Field>
											<ErrorMessage name="subCategoryId">
												{(msg) => <div className={style.errors}>{msg}</div>}
											</ErrorMessage>
										</div>
									)}

									{values.categoryId && values.categoryId === '2' && (
										<div className={style.containerInputsMarca}>
											<label className={style.labels} htmlFor="subCategoryId">
												Seleccione una subcategoría
											</label>
											<Field
												className={style.inputSelect}
												as="select"
												id="subCategoryId"
												name="subCategoryId"
											>
												<option className={style.options} value={Number('3')}>
													Comederos
												</option>
												<option className={style.options} value={Number('4')}>
													Collares
												</option>
												<option className={style.options} value={Number('5')}>
													Juguetes
												</option>
												<option className={style.options} value={Number('6')}>
													Vestimenta
												</option>
											</Field>
											<ErrorMessage name="subCategoryId">
												{(msg) => <div className={style.errors}>{msg}</div>}
											</ErrorMessage>
										</div>
									)}

									<div className={style.eachField}>
										<label className={style.labels} htmlFor="image">
											Adjunte la imagen de su producto
										</label>
										<div className={style.containerUploadForm}>
											{url.length > 0 && (
												<div className={style.divCloudinaryBtn}>
													<CloudinaryWidgetFull url={url} setUrl={setUrl} />
												</div>
											)}
											{url.length === 0 && (
												<div className={style.divCloudinaryBtn}>
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

export default UpdateProductForm;
