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
import { Badge, Button, Divider, Fab, ListItemIcon } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { logoutUserAction } from '../../_redux/actions/authAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
	setItemsAction,
	setOpenAction,
} from '../../_redux/actions/productsAction';
import i18n from '../../utils/i18n/i18n';
import { useTranslation } from 'react-i18next';
import StarIcon from '@mui/icons-material/Star';
import { red } from '@mui/material/colors';
import { grey } from '@mui/material/colors';

export default function Nav() {
	const location = useLocation();

	const { t } = useTranslation();

	const dispatch = useDispatch();
	const selector = useSelector((state) => state.authReducer);
	const shoppingCart = useSelector(
		(state) => state.productsReducer.shoppingCart,
	);

	const handleLangChange = (lang) => {
		i18n.changeLanguage(lang).then();
	};

	const getFlag = (lang) => {
		switch (lang) {
			case 'es':
				return (
					<img
						src="https://flagcdn.com/w320/ar.png"
						width="45"
						height="30"
						alt={lang}
					/>
				);
			case 'en':
				return (
					<img
						src="https://flagcdn.com/w320/us.png"
						width="45"
						height="30"
						alt={lang}
					/>
				);
			default:
				return (
					<img
						src="https://www.otherworldproject.com/wiki/images/9/96/Unknown_flag.png"
						width="40"
						height="25"
						alt={'default'}
					/>
				);
		}
	};

	const [anchorElLang, setAnchorElLang] = React.useState(null);
	const handleOpenLang = (event) => {
		setAnchorElLang(event.currentTarget);
	};
	const handleCloseLang = () => {
		setAnchorElLang(null);
	};

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
				<NavLink
					to="/donation"
					className={`${style.link} ${
						location.pathname === '/donation' ? style.active : ''
					}`}
				>
					<div className={style.divNav}>
						<i className="fa-solid fa-heart-circle-plus"></i>
						<p className={style.links}>{t('nav.links.donate')}</p>
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
							<p className={style.links}>{t('nav.links.signIn')}</p>
						</div>
					</Link>
					<Link to="/register" className={style.link}>
						<div className={style.divNav}>
							<i className="fa-solid fa-user-plus"></i>
							<p className={style.links}>{t('nav.links.signUp')}</p>
						</div>
					</Link>
				</div>
			) : (
				<div className={style.user}>
					<div>
						<Button onClick={handleOpenLang}>{getFlag(i18n.language)}</Button>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElLang}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElLang)}
							onClose={handleCloseLang}
						>
							<MenuItem
								selected={i18n.language === 'es'}
								onClick={() => {
									handleCloseLang();
									handleLangChange('es');
								}}
							>
								{getFlag('es')} Español
							</MenuItem>
							<MenuItem
								selected={i18n.language === 'en'}
								onClick={() => {
									handleCloseLang();
									handleLangChange('en');
								}}
							>
								{getFlag('en')} English
							</MenuItem>
						</Menu>
					</div>
					<Tooltip title={t('nav.cart.myCart')}>
						<Fab
							size={'small'}
							sx={{
								backgroundColor: '#163440',
								color: '#FFF',
								':hover': { backgroundColor: '#D9AD77' },
							}}
							onClick={() => dispatch(setOpenAction())}
						>
							<Badge badgeContent={shoppingCart.items.length} color={'error'}>
								<ShoppingCartIcon />
							</Badge>
						</Fab>
					</Tooltip>
					<AvatarComponent selector={selector} />
				</div>
			)}
		</div>
	);
}

export function AvatarComponent(props) {
	const dispatch = useDispatch();

	const { t } = useTranslation();

	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		dispatch(logoutUserAction(props.selector.user.id));
		localStorage.setItem('products', JSON.stringify([]));
		dispatch(setItemsAction());
	};

	return (
		<>
			<Box sx={{ flexGrow: 0 }} textAlign={'end'}>
				<Tooltip title={t('nav.account.myAccount')}>
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar
							alt={props.selector.user.name}
							src={props.selector.user ? props.selector.user.image : ''}
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
							<StarIcon fontSize="small" color="warning" textDecoration />
						</ListItemIcon>
						<Link to={'/myreviews'} className={style.myReviews}>
							{t('nav.account.myComments')}
						</Link>
					</MenuItem>
					<MenuItem onClick={handleCloseUserMenu}>
						<ListItemIcon>
							<Settings fontSize="small" sx={{ color: grey[900] }} />
						</ListItemIcon>
						{t('nav.account.settings')}
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
						{t('nav.account.logout')}
					</MenuItem>
				</Menu>
			</Box>
		</>
	);
}
