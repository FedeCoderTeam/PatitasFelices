import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloudinaryWidget from '../../../../components/Cloudinary/CloudinaryForm/CloudinaryWidget';
import CloudinaryWidgetFull from '../../../../components/Cloudinary/CloudinaryForm/CloudinaryWidgetFull';
import style from './UpdateProductForm.module.css';
import * as productsAction from '../../../../_redux/actions/productsAction';
import { Link } from 'react-router-dom';
import useToast from '../../../../utils/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import validation from './ValidationsProduct/Validations';
import validationEmpty from './ValidationsProduct/ValidationEmpty';

const UpdateProductForm = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	let [url, setUrl] = useState('');

	let productToUpdate = useSelector(
		(state) => state.productsReducer.productDetail,
	);

	const { success } = useToast();

	useEffect(() => {
		return () => {
			dispatch(productsAction.setDetail());
		};
	}, [dispatch]);

	let [input, setInput] = useState({
		id: productToUpdate?.id,
		name: productToUpdate?.name,
		description: productToUpdate?.description,
		price: Number(productToUpdate?.price),
		image: productToUpdate?.image,
		brand: productToUpdate?.brand,
		stock: productToUpdate?.stock,
		isDisabled: productToUpdate?.isDisabled,
		category: productToUpdate?.category,
		subCategory: productToUpdate?.subCategory,
	});

	let [errors, setErrors] = useState({});

	let handleSubmit = (event) => {
		event.preventDefault();

		if (
			input.id &&
			input.name &&
			input.description &&
			input.price &&
			input.image &&
			input.brand &&
			input.stock &&
			input.isDisabled &&
			input.category &&
			input.subCategory &&
			(input.name !== productToUpdate.name ||
				input.description !== productToUpdate.description ||
				Number(input.price) !== productToUpdate.price ||
				input.image !== productToUpdate.image ||
				input.isDisabled !== productToUpdate.isDisabled ||
				input.category !== productToUpdate.category ||
				input.subCategory !== productToUpdate.subCategory)
		) {
			let obj = {
				id: input.id,
				name: input.name,
				description: input.description,
				price: Number(input.price),
				image: url ? url : input.image,
				brand: input.brand,
				stock: input.stock,
				isDisabled: input.isDisabled,
				categoryId: input.category === 'Alimentos' ? 1 : 2,
				subCategoryId:
					input.subCategory === 'Adulto'
						? 1
						: input.subCategory === 'Cachorro'
						? 2
						: input.subCategory === 'Comederos'
						? 3
						: input.subCategory === 'Collares'
						? 4
						: input.subCategory === 'Juguetes'
						? 5
						: 6,
			};

			dispatch(productsAction.updateProduct(obj));
			success(`¡Producto editado exitosamente!`, {
				duration: 2000,
			});
			setTimeout(() => {
				navigate('/dashboard/products');
			}, 2000);
		} else {
			setErrors(validationEmpty({ ...input }));
		}
	};

	let handlerChange = (event) => {
		setInput({
			...input,
			[event.target.name]: event.target.value,
		});

		setErrors(
			validation({ ...input, [event.target.name]: event.target.value }),
		);
	};

	return (
		<div className={style.mainContainerForm}>
			<div className={style.containerForm}>
				<form onSubmit={(event) => handleSubmit(event)}>
					<div>
						<Link to="/dashboard/products">
							<button className={style.goBackBtn}>
								<i
									className={style.goBackBtn}
									class="fa-solid fa-arrow-left"
								></i>
							</button>
						</Link>
						<h1 className={style.titleForm}>Editar Producto</h1>
					</div>

					<div className={style.boxForm}>
						<div className={style.containerInputsLeftForm}>
							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="name">
									Nombre del producto
								</label>
								<input
									className={style.inputs}
									value={input.name}
									name="name"
									type="text"
									placeholder="Ej: Buzo Cali Azulino"
									onChange={(event) => handlerChange(event)}
								/>
								<div className={style.errors}>{errors.name}</div>
							</div>

							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="description">
									Descripción
								</label>
								<input
									className={style.inputs}
									value={input.description}
									name="description"
									type="text"
									placeholder="Ej: Alimento para perros adultos."
									onChange={(event) => handlerChange(event)}
								/>
								<div className={style.errors}>{errors.description}</div>
							</div>

							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="price">
									Precio
								</label>
								<input
									className={style.inputs}
									value={input.price}
									name="price"
									type="number"
									placeholder="Ej: 2000"
									onChange={(event) => handlerChange(event)}
								/>
								<div className={style.errors}>{errors.price}</div>
							</div>

							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="stock">
									Stock
								</label>
								<input
									className={style.inputs}
									value={input.stock}
									name="stock"
									type="number"
									placeholder="Ej: 10"
									onChange={(event) => handlerChange(event)}
								/>
								<div className={style.errors}>{errors.stock}</div>
							</div>
						</div>

						<div className={style.containerInputsRightForm}>
							<div className={style.containerInputsMarca}>
								<label className={style.labels} htmlFor="brand">
									Marca del producto
								</label>
								<input
									className={style.inputs}
									value={input.brand}
									name="brand"
									type="text"
									placeholder="Ej: Royal Canin"
									onChange={(event) => handlerChange(event)}
								/>
								<div className={style.errors}>{errors.brand}</div>
							</div>

							<div className={style.containerInputsMarca}>
								<label className={style.labels} htmlFor="isDisabled">
									¿Descontinuado?
								</label>
								<select
									defaultValue="false"
									className={style.inputSelect}
									value={input.isDisabled}
									id="isDisabled"
									name="isDisabled"
									onChange={(event) => handlerChange(event)}
								>
									<option className={style.options} value={true}>
										Sí
									</option>
									<option className={style.options} value={false}>
										No
									</option>
								</select>
								<div className={style.errors}>{errors.isDisabled}</div>
							</div>

							<div className={style.containerInputsMarca}>
								<label className={style.labels} htmlFor="category">
									Seleccione una categoría
								</label>
								<select
									className={style.inputSelect}
									value={input.category}
									id="category"
									name="category"
									onChange={(event) => handlerChange(event)}
								>
									<option className={style.options} value="Alimentos">
										Alimentos
									</option>
									<option className={style.options} value="Accesorios">
										Accesorios
									</option>
								</select>
								<div className={style.errors}>{errors.category}</div>
							</div>
							{input.category && input.category === 'Alimentos' && (
								<div className={style.containerInputsMarca}>
									<label className={style.labels} htmlFor="subCategory">
										Seleccione una subcategoría
									</label>
									<select
										className={style.inputSelect}
										value={input.subCategory}
										id="subCategory"
										name="subCategory"
										onChange={(event) => handlerChange(event)}
									>
										<option className={style.options} value="Adulto">
											Adulto
										</option>
										<option className={style.options} value="Cachorro">
											Cachorro
										</option>
									</select>
									<div className={style.errors}>{errors.subCategory}</div>
								</div>
							)}

							{input.category && input.category === 'Accesorios' && (
								<div className={style.containerInputsMarca}>
									<label className={style.labels} htmlFor="subCategory">
										Seleccione una subcategoría
									</label>
									<select
										className={style.inputSelect}
										value={input.subCategory}
										id="subCategory"
										name="subCategory"
										onChange={(event) => handlerChange(event)}
									>
										<option className={style.options} value="Comederos">
											Comederos
										</option>
										<option className={style.options} value="Collares">
											Collares
										</option>
										<option className={style.options} value="Juguetes">
											Juguetes
										</option>
										<option className={style.options} value="Vestimenta">
											Vestimenta
										</option>
									</select>
									<div className={style.errors}>{errors.subCategory}</div>
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
											onChange={(event) => handlerChange(event)}
											className={style.imgUser}
											src={!url.length ? input.image : url}
											loading="lazy"
											alt=""
										/>
									</div>
								</div>
								<div className={style.errors}>{errors.image}</div>
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
				</form>
			</div>
		</div>
	);
};

export default UpdateProductForm;
