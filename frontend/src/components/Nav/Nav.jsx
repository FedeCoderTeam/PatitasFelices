import React from 'react';
import {Link, NavLink} from 'react-router-dom';
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
import { Divider, ListItemIcon } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { logoutUserAction } from '../../_redux/actions/authAction';

export default function Nav() {
	const location = useLocation();
	const selector = useSelector((state) => state.authReducer);

	return (
		<div className={style.containerNav}>
			<div className={style.containerLeft}>
				<NavLink to="/home" className={`${style.link} ${location.pathname === '/home' ? style.active : ''}`}>
					<div className={style.divNav}>
						<img
							className={style.imgIcons}
							src="https://res.cloudinary.com/dreso9ye9/image/upload/v1681881441/Proyecto%20Final/dog-house_2_rg9isr.png"
							alt="Home"
						/>
						<p className={style.links}>Home</p>
					</div>
				</NavLink>
				<NavLink to="/products" className={`${style.link} ${location.pathname === '/products' ? style.active : ''}`}>
					<div className={style.divNav}>
						<img
							className={style.imgIcons}
							src="https://res.cloudinary.com/dreso9ye9/image/upload/v1681881811/Proyecto%20Final/dog-food_rdlman.png"
							alt="Products"
						/>
						<p className={style.links}>Productos</p>
					</div>
				</NavLink>
				<NavLink to="/dogs" className={`${style.link} ${location.pathname === '/dogs' ? style.active : ''}`}>
					<div className={style.divNav}>
						<img
							className={style.imgIcons}
							src="https://res.cloudinary.com/dreso9ye9/image/upload/v1681882026/Proyecto%20Final/clumber-spaniel_hwr8gz.png"
							alt="Dogs"
						/>
						<p className={style.links}>Perros</p>
					</div>
				</NavLink>
				{selector.user?.role === 'Administrador' && (
					<Link to="/dashboard" className={style.link}>
						<div className={style.divNav}>
							<img
								className={style.imgIcons}
								src="https://res.cloudinary.com/dreso9ye9/image/upload/v1681881441/Proyecto%20Final/dog-house_2_rg9isr.png"
								alt="Home"
							/>
							<p className={style.links}>Admin</p>
						</div>
					</Link>
				)}
			</div>
			{!selector.isAuthenticated ? (
				<div className={style.containerRight}>
					<Link to="/login" className={style.link}>
						<div className={style.divNav}>
							<img
								className={style.imgIcons}
								src="https://res.cloudinary.com/dreso9ye9/image/upload/v1681882773/Proyecto%20Final/log-in_q497ai.png"
								alt="Ingresar"
							/>
							<p className={style.links}>Ingresar</p>
						</div>
					</Link>
					<Link to="/register" className={style.link}>
						<div className={style.divNav}>
							<img
								className={style.imgIcons}
								src="https://res.cloudinary.com/dreso9ye9/image/upload/v1681882433/Proyecto%20Final/document_p66epz.png"
								alt="Registrarse"
							/>
							<p className={style.links}>Registrarse</p>
						</div>
					</Link>
				</div>
			) : (
				<div className={style.containerRight}>
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
	}

	return (
		<>
			<Box sx={{ flexGrow: 0 }}>
				<Tooltip title="Mi cuenta">
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar alt={props.selector.user.name} src={props.selector.user.image} />
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
					<MenuItem onClick={handleCloseUserMenu}>
						<ListItemIcon>
							<Settings fontSize="small" />
						</ListItemIcon>
						Settings
					</MenuItem>
					<MenuItem onClick={(event) => {handleCloseUserMenu(event); handleLogout()}}>
						<ListItemIcon>
							<Logout fontSize="small" />
						</ListItemIcon>
						Logout
					</MenuItem>
				</Menu>
			</Box>
		</>
	);
}
