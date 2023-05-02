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
	let ageInYears =
		age >= 12 ? Math.round(age / 12) + ' año/s' : age + ' mes/es';

	const [open, setOpen] = React.useState(false);

	const handleOpenDialog = () => {
		setOpen(!open);
	};

	return (
		<>
			<div className={style.containerCard}>
				<a href='http://localhost:3000/donation'>
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
						/>{gender}</h3>
					</div>	
					<div className={style.divData}>
						<h3><img 
							className={style.itemIcon} 
							src={'https://res.cloudinary.com/dmn9piojd/image/upload/v1682473119/Iconos/hueso_hiygob.png'} 
							alt='bone' 
						/>{size}</h3>
					</div>
					<div className={style.divData}>
						<h3><img 
							className={style.itemIcon} 
							src={'https://res.cloudinary.com/dmn9piojd/image/upload/v1682473119/Iconos/hueso_hiygob.png'} 
							alt='bone' 
						/>{colors.join(' - ')}</h3>
					</div>
					<div className={style.divData}>
						<h3><img 
							className={style.itemIcon} 
							src={'https://res.cloudinary.com/dmn9piojd/image/upload/v1682473119/Iconos/hueso_hiygob.png'} 
							alt='bone' 
						/> 
						{temperaments.join(' - ')}</h3>
					</div>
				</div>
				{/* <div className={style.containerButton}>
					<button className={style.button} onClick={handleOpenDialog}>
						Ver más información
					</button>
				</div> */}
				{/* CONST dogInfo = [
{
Img: ‘https://……’,
element: name 
},
{
Img: ‘https://……’,
element: gender 
},
{
Img: ‘https://……’,
element: temperaments 
},
{
Img: ‘https://……’,
element: colors 
}
]
{dogInfo.map((object)=>
<div>
	<img src={object.img}/>
	<h3>{object.element}</h3>
</div>
);
} */}
			</div>
			<DialogDogsDetail
				handleOpenDialog={handleOpenDialog}
				open={open}
				dog={{
					image,
					name,
					ageInYears,
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
				default: '#163440',
				paper: '#163440',
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
							<div className={style.dogDetail}>
								<h3>{props.dog.name}</h3>
								<div className={style.avatar}>
									<img src={props.dog.image} alt={props.dog.name} />
								</div>
								<div>
									<p className={style.description}>{props.dog.description}</p>
								</div>
							</div>
							<div className={style.containerInfo}>
								<h3>
									<img 
										className={style.itemIcon} 
										src={'https://res.cloudinary.com/dmn9piojd/image/upload/v1682473119/Iconos/paw_rlhv5l.png'} 

									/>
									{props.dog.ageInYears}
								</h3>
								<h3>
									<img 
										className={style.itemIcon} 
										src={'https://res.cloudinary.com/dmn9piojd/image/upload/v1682473119/Iconos/paw_rlhv5l.png'} 

									/>
									{props.dog.weight + 'kg'}
								</h3>
								<h3>
									<img 
										className={style.itemIcon} 
										src={'https://res.cloudinary.com/dmn9piojd/image/upload/v1682473119/Iconos/paw_rlhv5l.png'} 

									/>
									{props.dog.colors.join(' - ')}
								</h3>
								<h3>
									<img 
										className={style.itemIcon} 
										src={'https://res.cloudinary.com/dmn9piojd/image/upload/v1682473119/Iconos/paw_rlhv5l.png'} 

									/>
									{props.dog.gender}
								</h3>
								<h3>
									<img 
										className={style.itemIcon} 
										src={'https://res.cloudinary.com/dmn9piojd/image/upload/v1682473119/Iconos/paw_rlhv5l.png'} 

									/>
									{props.dog.size}
								</h3>
								<h3>
									<img 
										className={style.itemIcon} 
										src={'https://res.cloudinary.com/dmn9piojd/image/upload/v1682473119/Iconos/paw_rlhv5l.png'} 

									/>
									{props.dog.temperaments.join(' - ')}
								</h3>
							</div>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							onClick={() => {
								handleClick(props.dog.id);
							}}
							autoFocus
						>
							{t('dogCard.toAdopt')}
						</Button>
					</DialogActions>
				</Dialog>
			</ThemeProvider>
		</>
	);
}
