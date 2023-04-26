import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import style from '../Nav/nav.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Badge, Divider, ListItemIcon } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { logoutUserAction } from '../../_redux/actions/authAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { setOpenAction } from '../../_redux/actions/productsAction';
import i18n from '../../utils/i18n/i18n'
import {useTranslation} from 'react-i18next';
import StarIcon from '@mui/icons-material/Star';
import { red } from '@mui/material/colors';
import { grey } from '@mui/material/colors';

export default function Nav() {
	const location = useLocation();

	const { t } = useTranslation()

	const dispatch = useDispatch()
	const selector = useSelector((state) => state.authReducer);
	const shoppingCart = useSelector(
		(state) => state.productsReducer.shoppingCart,
	);

	const handleLangChange = async (e) => {
		await i18n.changeLanguage(e.target.value)
	}

	return (
		<div className={style.containerNav}>
			<div className={style.logoContainer}>
				<Link to="/home">
					<img
						className={style.logo}
						src="https://res.cloudinary.com/dreso9ye9/image/upload/v1682299697/Logo_yiz4g6.png"
						alt=""
					/>
				</Link>
			</div>

			<div className={style.containerLeft}>
				<NavLink
					to="/home"
					className={`${style.link} ${
						location.pathname === '/home' ? style.active : ''
					}`}
				>
					<div className={style.divNav}>
						<i className="fa-solid fa-house"></i>
						<p className={style.links}>{t('nav.links.home')}</p>
					</div>
				</NavLink>
				<NavLink
					to="/products"
					className={`${style.link} ${
						location.pathname === '/products' ? style.active : ''
					}`}
				>
					<div className={style.divNav}>
						<i className="fa-solid fa-bone"></i>
						<p className={style.links}>{t('nav.links.product')}</p>
					</div>
				</NavLink>
				<NavLink
					to="/dogs"
					className={`${style.link} ${
						location.pathname === '/dogs' ? style.active : ''
					}`}
				>
					<div className={style.divNav}>
						<i className="fa-solid fa-paw"></i>
						<p className={style.links}>{t('nav.links.dog')}</p>
					</div>
				</NavLink>
				{selector.user?.role === 'Administrador' && (
					<Link to="/dashboard" className={style.link}>
						<div className={style.divNav}>
							<i className="fa-sharp fa-solid fa-screwdriver-wrench"></i>
							<p className={style.links}>Admin</p>
						</div>
					</Link>
				)}
			</div>
			{!selector.isAuthenticated ? (
				<div className={style.containerRight}>
					<Link to="/login" className={style.link}>
						<div className={style.divNav}>
							<i className="fa-solid fa-right-to-bracket"></i>
							<p className={style.links}>Ingresar</p>
						</div>
					</Link>
					<Link to="/register" className={style.link}>
						<div className={style.divNav}>
							<i className="fa-solid fa-user-plus"></i>
							<p className={style.links}>Registrarse</p>
						</div>
					</Link>
				</div>
			) : (
				<div className={style.containerRight}>
					<select onChange={handleLangChange}>
						<option value={'es'}>Español</option>
						<option value={'en'}>English</option>
					</select>
					<IconButton
						arial-label={'primary'}
						onClick={() => dispatch(setOpenAction())}
					>
						<Badge
							badgeContent={shoppingCart.items.reduce(
								(total, item) => total + item.quantity,
								0,
							)}
							color={'primary'}
						>
							<ShoppingCartIcon />
						</Badge>
					</IconButton>
					<AvatarComponent selector={selector} />
				</div>
			)}
		</div>
	);
}

export function AvatarComponent(props) {
	const dispatch = useDispatch();

	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		dispatch(logoutUserAction(props.selector.user.id));
	};

	return (
		<>
			<Box sx={{ flexGrow: 0 }} width={'244px'} textAlign={'end'}>
				<Tooltip title="Mi cuenta">
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar
							alt={props.selector.user.name}
							src={props.selector.user.image}
						/>
					</IconButton>
				</Tooltip>
				<Menu
					sx={{ mt: '45px' }}
					id="menu-appbar"
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
				>
					<MenuItem>
						{props.selector.user.name} {props.selector.user.last}
					</MenuItem>
					<Divider />
					<MenuItem
						onClick={(event) => {
							handleCloseUserMenu(event);
						}}
					>
						<ListItemIcon>
							<StarIcon fontSize="small" color="warning" />
						</ListItemIcon>
						Mis comentarios
					</MenuItem>
					<MenuItem onClick={handleCloseUserMenu}>
						<ListItemIcon>
							<Settings fontSize="small" sx={{ color: grey[900] }} />
						</ListItemIcon>
						Ajustes
					</MenuItem>
					<MenuItem
						onClick={(event) => {
							handleCloseUserMenu(event);
							handleLogout();
						}}
					>
						<ListItemIcon>
							<Logout fontSize="small" sx={{ color: red[500] }} />
						</ListItemIcon>
						Salir
					</MenuItem>
				</Menu>
			</Box>
		</>
	);
}
