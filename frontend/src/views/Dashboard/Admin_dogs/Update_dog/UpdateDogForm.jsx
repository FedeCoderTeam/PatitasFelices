import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloudinaryWidget from '../../../../components/Cloudinary/CloudinaryForm/CloudinaryWidget';
import CloudinaryWidgetFull from '../../../../components/Cloudinary/CloudinaryForm/CloudinaryWidgetFull';
import style from './UpdateDogForm.module.css';
import * as dogsAction from '../../../../_redux/actions/dogsAction';
import { Link } from 'react-router-dom';
import useToast from '../../../../utils/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import validation from './ValidationsDog/Validations';
import validationEmpty from './ValidationsDog/ValidationEmpty';

const UpdateDogForm = () => {
	const dispatch = useDispatch();

	const temperaments = useSelector((state) => state.dogsReducer.temperaments);
	const dogToUpdate = useSelector((state) => state.dogsReducer.dogDetail);
	console.log(dogToUpdate);

	const navigate = useNavigate();
	const { success } = useToast();

	useEffect(() => {
		return () => {
			dispatch(dogsAction.setDetail());
		};
	}, [dispatch]);

	const [url, setUrl] = useState('');
	let [errors, setErrors] = useState({});

	let [input, setInput] = useState({
		id: dogToUpdate?.id,
		name: dogToUpdate?.name,
		age: dogToUpdate?.age,
		size: dogToUpdate?.size,
		weight: dogToUpdate?.weight,
		castrated: dogToUpdate?.castrated,
		tempers: dogToUpdate?.temperaments,
		colors: dogToUpdate?.colors,
		gender: dogToUpdate?.gender,
		image: dogToUpdate?.image,
		description: dogToUpdate?.description,
		adopted: dogToUpdate?.adopted,
		isDisabled: dogToUpdate?.isDisabled,
	});

	console.log(input);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (
			input.id &&
			input.name &&
			input.age &&
			input.size &&
			input.weight &&
			input.castrated &&
			input.tempers &&
			input.colors &&
			input.gender &&
			input.image &&
			input.description &&
			// input.adopted &&
			// input.isDisabled &&
			(input.name !== dogToUpdate.name ||
				input.age !== dogToUpdate.age ||
				input.size !== dogToUpdate.size ||
				input.weight !== dogToUpdate.weight ||
				input.castrated !== dogToUpdate.castrated ||
				input.tempers !== dogToUpdate.tempers ||
				input.colors !== dogToUpdate.colors ||
				input.gender !== dogToUpdate.gender ||
				input.description !== dogToUpdate.description)
			// input.adopted !== dogToUpdate.adopted ||
			// input.isDisabled !== dogToUpdate.isDisabled
		) {
			let obj = {
				id: input.id,
				name: input.name,
				age: input.age,
				size: input.size,
				weight: input.weight,
				castrated: input.castrated,
				tempers: input.temperaments,
				colors: input.colors,
				gender: input.gender,
				image: input.image,
				description: input.description,
				adopted: input.adopted,
				isDisabled: input.isDisabled,
			};

			dispatch(dogsAction.updateDogs(obj));
			success(`Perro editado exitosamente!`, {
				duration: 2000,
			});
			setTimeout(() => {
				navigate('/dashboard/dogs');
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
						<Link to="/dashboard/dogs">
							<button className={style.goBackBtn}>
								<i class="fa-solid fa-arrow-left"></i>
							</button>
						</Link>
						<h1 className={style.titleForm}>Editar Perro</h1>
					</div>
					<div className={style.boxForm}>
						<div className={style.containerInputsLeftForm}>
							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="name">
									Nombre
								</label>
								<input
									className={style.inputs}
									value={input.name}
									name="name"
									type="text"
									placeholder="Ej: Otis"
									onChange={(event) => handlerChange(event)}
								/>
								<div className={style.errors}>{errors.name}</div>
							</div>

							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="age">
									Edad (meses)
								</label>
								<input
									className={style.inputs}
									value={input.age}
									name="age"
									type="number"
									placeholder="Ej: 24"
									onChange={(event) => handlerChange(event)}
								/>
								<div className={style.errors}>{errors.age}</div>
							</div>

							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="size">
									Tamaño
								</label>
								<select
									className={style.inputSelect}
									value={input.size}
									id="category"
									name="size"
									onChange={(event) => handlerChange(event)}
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
								</select>
								<div className={style.errors}>{errors.size}</div>
							</div>

							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="weight">
									Peso (kg.)
								</label>
								<input
									className={style.inputs}
									value={input.weight}
									name="weight"
									type="number"
									placeholder="Ej: 24"
									onChange={(event) => handlerChange(event)}
								/>
								<div className={style.errors}>{errors.weight}</div>
							</div>

							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="gender">
									Género
								</label>
								<select
									className={style.inputSelect}
									value={input.gender}
									id="gender"
									name="gender"
									onChange={(event) => handlerChange(event)}
								>
									<option className={style.options} value="all"></option>
									<option className={style.options} value="Hembra">
										Hembra
									</option>
									<option className={style.options} value="Macho">
										Macho
									</option>
								</select>
								<div className={style.errors}>{errors.gender}</div>
							</div>

							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="castrated">
									¿Está castrado?
								</label>
								<select
									className={style.inputSelect}
									value={input.castrated}
									id="castrated"
									name="castrated"
									onChange={(event) => handlerChange(event)}
								>
									<option className={style.options} value="all"></option>
									<option className={style.options} value={true}>
										Sí
									</option>
									<option className={style.options} value={false}>
										No
									</option>
								</select>
								<div className={style.errors}>{errors.castrated}</div>
							</div>
						</div>
						<div className={style.containerInputsRightForm}>
							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="tempers">
									Temperamentos
								</label>
								<select
									className={style.inputSelect}
									value={input.tempers}
									multiple
									id="tempers"
									name="tempers"
									onChange={(event) => handlerChange(event)}
								>
									<option className={style.options} value="all"></option>
									{temperaments.map((temper) => (
										<option className={style.options}>{temper.name}</option>
									))}
								</select>
								<div className={style.errors}>{errors.tempers}</div>
							</div>

							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="colors">
									Colores
								</label>
								<select
									className={style.inputSelect}
									value={input.colors}
									multiple
									id="colors"
									name="colors"
									onChange={(event) => handlerChange(event)}
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
								</select>
								<div className={style.errors}>{errors.colors}</div>
							</div>

							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="description">
									Descripción del Perro
								</label>
								<input
									className={style.inputTextArea}
									value={input.description}
									type="text"
									id="description"
									name="description"
									onChange={(event) => handlerChange(event)}
								/>
								<div className={style.errors}>{errors.description}</div>
							</div>

							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="adopted">
									¿Fue adoptado?
								</label>
								<select
									className={style.inputSelect}
									value={input.adopted}
									id="adopted"
									name="adopted"
									onChange={(event) => handlerChange(event)}
								>
									<option className={style.options} value="all"></option>
									<option className={style.options} value={true}>
										Sí
									</option>
									<option className={style.options} value={false}>
										No
									</option>
								</select>
								<div className={style.errors}>{errors.adopted}</div>
							</div>

							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="isDisabled">
									¿El perrito falleció?
								</label>
								<select
									className={style.inputSelect}
									value={input.isDisabled}
									id="isDisabled"
									name="isDisabled"
									onChange={(event) => handlerChange(event)}
								>
									<option className={style.options} value="all"></option>
									<option className={style.options} value="true">
										Sí
									</option>
									<option className={style.options} value="false">
										No
									</option>
								</select>
								<div className={style.errors}>{errors.isDisabled}</div>
							</div>

							<div className={style.eachField}>
								<label className={style.labels} htmlFor="image">
									Adjunte la imagen de su producto
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
											src={!url.length ? input.image : url}
											alt=""
											loading="lazy"
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

export default UpdateDogForm;
