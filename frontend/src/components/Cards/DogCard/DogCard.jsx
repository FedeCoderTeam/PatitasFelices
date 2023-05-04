import * as React from 'react';
import style from './dogCard.module.css';
import {
	Button,
	createTheme,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	ThemeProvider,
} from '@mui/material';
import { brown } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMaybeAdoptedDogs } from '../../../_redux/actions/dogsAction';
import { useTranslation } from 'react-i18next';

const DogCard = ({
	image,
	name,
	age,
	gender,
	size,
	weight,
	colors,
	temperaments,
	id,
	description,
}) => {
	const [open, setOpen] = React.useState(false);

	const handleOpenDialog = () => {
		setOpen(!open);
	};

	return (
		<>
			<div className={style.containerCard}>
				<a href='https://patitas-felices.vercel.app/donation'>
					<div className={style.containerIcon}>
						<img className={style.Icon} 
							src={'https://res.cloudinary.com/dmn9piojd/image/upload/v1682473119/Iconos/perro_hjswvs.png'} 
							alt="Icon-Donate" 
							title='Donar'
						/>
					</div>
				</a>
				<div className={style.pic}>
					<h3 className={style.divDataName}>
						{name}
					</h3>
					<div className={style.containerImg}>
						<img src={image} 
							alt="Dog-pic" 
						/>
					</div>
				</div>
				<div className={style.divDogInfo} onClick={handleOpenDialog} title='Más Información'>
					<div className={style.divData}>
						<h3><img 
							className={style.itemIcon} 
							src={'https://res.cloudinary.com/dmn9piojd/image/upload/v1682473119/Iconos/hueso_hiygob.png'} 
							alt='bone' 
						/>{gender}
						</h3>
					</div>	
					<div className={style.divData}>
						<h3><img 
							className={style.itemIcon} 
							src={'https://res.cloudinary.com/dmn9piojd/image/upload/v1682473119/Iconos/hueso_hiygob.png'} 
							alt='bone' 
						/>{size}
						</h3>
					</div>
					<div className={style.divData}>
						<h3><img 
							className={style.itemIcon} 
							src={'https://res.cloudinary.com/dmn9piojd/image/upload/v1682473119/Iconos/hueso_hiygob.png'} 
							alt='bone' 
						/>{colors.join(' - ')}
						</h3>
					</div>
					<div className={style.divData}>
						<h3><img 
							className={style.itemIcon} 
							src={'https://res.cloudinary.com/dmn9piojd/image/upload/v1682473119/Iconos/hueso_hiygob.png'} 
							alt='bone' 
						/> 
						{temperaments.join(' - ')}
						</h3>
					</div>
				</div>
			</div>
			<DialogDogsDetail
				handleOpenDialog={handleOpenDialog}
				open={open}
				dog={{
					image,
					name,
					age,
					gender,
					size,
					weight,
					colors,
					temperaments,
					id,
					description,
				}}
			/>
		</>
	);
};

export default DogCard;

export function DialogDogsDetail(props) {
	const dispatch = useDispatch();
	const handleClick = (id) => {
		dispatch(setMaybeAdoptedDogs(id));
		navigate('/form');
	};
	const navigate = useNavigate();
	const { t } = useTranslation();


	const innerTheme = createTheme({
		palette: {
			primary: {
				main: brown[500],
			},
			background: {
				default: 'transparent',
				paper: 'transparent',
			},
			text: {
				...{
					primary: '#fff',
					secondary: '#fff',
				},
			},
		},
	});

	return (
		<>
			<ThemeProvider theme={innerTheme}>
				<Dialog
					sx={{
						'& .MuiDialog-container': {
							'& .MuiPaper-root': {
								borderRadius: '5px',
								maxWidth: '1350px',
								maxHeight: '770px'
							},
						},
					}}
					open={props.open}
					onClose={props.handleOpenDialog}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent dividers>
						<DialogContentText
							id="alert-dialog-description"
							className={style.dialogDescription}
						>
								<div className={style.div1}>

									<div className={style.div2}>
										<img className={style.img} src={props.dog.image} alt={props.dog.name} />
									<div className={style.divTitles}>
										<span className={style.title}>{props.dog.name}</span>
										<span className={style.subtitle}>{props.dog.temperaments.join(' - ')}</span>
									</div>
									
									</div>

									<div className={style.div3}>
										<h3 className={style.spanTitle}>Tamaño: <span className={style.spanSubtitle}>{props.dog.size}</span></h3>
										<hr />
										<h3 className={style.spanTitle}>Peso: <span className={style.spanSubtitle}>{props.dog.weight + 'kg'}</span></h3>
										<hr />
										<h3 className={style.spanTitle}>Edad: <span className={style.spanSubtitle}>{props.dog.age}</span></h3> 
										<hr />
										<h3 className={style.spanTitle}>Colores: <span className={style.spanSubtitle}>{props.dog.colors.join(' - ')}</span></h3>
										<hr />
										<div className={style.descriptionContainer}>
											<h3 className={style.spanTitle}>Descripción: <span className={style.spanSubtitle}>{props.dog.description}</span></h3>
										</div>
										<DialogActions>
											<div className={style.buttonContainer}>
												<button className={style.button} onClick={() => {
														handleClick(props.dog.id);
													}}>{t('dogCard.toAdopt')}</button>
											</div>
										</DialogActions>
									</div>
								
								</div>
							

						</DialogContentText>
					</DialogContent>
					
				</Dialog>
			</ThemeProvider>
		</>
	);
}
