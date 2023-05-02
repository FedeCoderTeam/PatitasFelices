import * as React from 'react';
import style from '../UserSettings/UserSettings.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as authAction from '../../_redux/actions/authAction';
import { useNavigate, useParams } from 'react-router-dom';
import validation from './Validations/Validations';
import validationEmpty from './Validations/ValidationsEmpty';
import CloudinaryWidget from '../../components/Cloudinary/CloudinaryForm/CloudinaryWidget';
import CloudinaryWidgetFull from '../../components/Cloudinary/CloudinaryForm/CloudinaryWidgetFull';
import useToast from '../../utils/hooks/useToast';
import { getUserById } from '../../_redux/actions/authAction';

const UserSettings = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    let userId = useSelector((state) => state.authReducer.userDetail);

    useEffect(() => {
	    dispatch(getUserById(id));
	}, [dispatch]);

    let [input, setInput] = useState({
        id: userId?.id,
        name: userId?.name,
        googleId: userId?.googleId,
        email: userId?.email,
        last: userId?.last,
        image: userId?.image,
        password: userId?.password,
        isDisabled: userId?.isDisabled,
        isVerified: userId?.isVerified,
        roleId: userId?.roleId,
	});


    let [errors, setErrors] = useState({});

    let [url, setUrl] = useState('');

    const { success } = useToast();

    let handleSubmit = (event) => {
		event.preventDefault();

			let obj = {
                id: input.id,
                name: input.name,
                googleId: input.googleId,
                email: input.email,
                last: input.last,
                image: url ? url : input.image,
                password: input.password,
                isDisabled: input.isDisabled,
                isVerified: input.isVerified,
                roleId: input.roleId,
			};

			dispatch(authAction.updateUser(obj));
			success(`Usuario editado exitosamente!`, {
				duration: 2000,
			});
			setTimeout(() => {
				navigate('/home');
			}, 2000);
		
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


    return(
        <div className={style.mainContainer}>
            <div className={style.containerForm}>
				<form onSubmit={(event) => handleSubmit(event)}>
					<div>
						<h1 className={style.titleForm}>Editar Usuario</h1>
					</div>

					<div className={style.boxForm}>
							<div className={style.containerInputs}>
								<label className={style.labels} htmlFor="password">
									Cambiar contraseña
								</label>
								<input
									className={style.inputs}
									value={input.password}
									name="password"
									type="text"
									placeholder="Ingrese su nueva contraseña"
									onChange={(event) => handlerChange(event)}
								/>
								<div className={style.errors}>{errors.password}</div>
							</div>

							<div className={style.eachField}>
								<label className={style.labels} htmlFor="image">
									Adjunte su nueva foto de perfil
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
					<div className={style.containerBtnForm}>
						<button
							className={style.btnCreate}
							disabled={Object.keys(errors).length > 0}
							type="submit"
						>
							GUARDAR
						</button>
					</div>
				</form>
			</div>
        </div>
    )

};

export default UserSettings;