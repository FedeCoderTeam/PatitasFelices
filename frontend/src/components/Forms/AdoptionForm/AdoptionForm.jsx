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
import { useTranslation } from 'react-i18next';

const AdoptionForm = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

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
			.min(4, t('yupAdop.val1'))
			.matches(
				/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/,
				t('yupAdop.val2'),
			)
			.required(t('yupAdop.val3')),
		age: Yup.number()
			.min(18, t('yupAdop.val4'))
			.required(t('yupAdop.val5')),
		phone: Yup.string()
			.matches(
				/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
				t('yupAdop.val6'),
			)
			.required(t('yupAdop.val7')),
		address: Yup.string().required(t('yupAdop.val8')),
		email: Yup.string()
			.matches(
				/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
				t('yupAdop.val9'),
			)
			.required(t('yupAdop.val10')),
		areas_conditions: Yup.string().oneOf(
			['Excellent', 'Good', 'Bad', 'N/A'],
			t('yupAdop.val11'),
		),
		more_animals: Yup.string().required(t('yupAdop.val11')),
		moreAnimals_details: Yup.string(),
		// .required('Es obligatoria esta información.')
		proper_income: Yup.string().required(t('yupAdop.val12')),
		inHouse_allowance: Yup.string().required('Elige una opción.'),
		outDoor_image: Yup.string().matches(
			/^.*\.(jpg|jpeg|png)$/i,
			t('yupAdop.val13'),
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
			moreAnimals_details:
				values.moreAnimals_details === ''
					? t('adopForm.nodetail')
					: values.moreAnimals_details,
			proper_income: values.proper_income,
			inHouse_allowance: values.inHouse_allowance,
			outDoor_image: url,
			dogId: dogId.id,
		};
		dispatch(requestAction.postAdoptionDog(obj));
		success(t('adopForm.sent') + `${initialValues.name}`, {
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
	}, [dispatch]);

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
								{t('adopForm.title') + `${dogId.name}`} 
							</h1>
							<div className="box-Form">
								<div className="containerInputsLeft-Form">
									<div className="eachField">
										<label htmlFor="name">
											{t('adopForm.name')}
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
										<label htmlFor="age">{t('adopForm.age')}</label>
										<Field name="age" type="number" placeholder="EJ: 25" />
										<ErrorMessage name="age">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="phone">{t('adopForm.phone')}</label>
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
										<label htmlFor="text">{t('adopForm.address')}</label>
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
											{t('adopForm.quest1')}
										</label>
										<div className="more_animals-Container">
											<Field name="more_animals" as="select">
												<option value=""></option>
												<option value="Yes">{t('adopForm.yes')}</option>
												<option value="No">{t('adopForm.no')}</option>
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
													placeholder={t('adopForm.placeholder')}
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
											{t('adopForm.quest2')}
										</label>
										<Field name="proper_income" as="select">
											<option value="all"></option>
											<option value="Yes">{t('adopForm.yes')}</option>
											<option value="No">{t('adopForm.no')}</option>
										</Field>
										<ErrorMessage name="proper_income">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="inHouse_allowance">
											{t('adopForm.quest3')}
										</label>
										<Field as="select" name="inHouse_allowance">
											<option value="all"></option>
											<option value="Yes">{t('adopForm.yes')}</option>
											<option value="No">{t('adopForm.no')}</option>
										</Field>
										<ErrorMessage name="inHouse_allowance">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>

									<div className="eachField">
										<label htmlFor="outDoor_image">
											{t('adopForm.quest4')}
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
											{t('adopForm.quest5')}
										</label>
										<Field name="areas_conditions" as="select">
											<option value="all"></option>
											<option value="Excellent">{t('adopForm.excellent')}</option>
											<option value="Good">{t('adopForm.good')}</option>
											<option value="Bad">{t('adopForm.bad')}</option>
											<option value="N/A">{t('adopForm.n/a')}</option>
										</Field>
										<ErrorMessage name="areas_conditions">
											{(msg) => <div className="errorMessage">{msg}</div>}
										</ErrorMessage>
									</div>
								</div>
							</div>

							<div className="containerBtn-Form">
								<button disabled={Object.keys(errors).length > 0} type="submit">
								{t('adopForm.send')}
								</button>
							</div>
							<div className="containerGoHome-Form">
								<h4>{t('adopForm.ready')}</h4>
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
