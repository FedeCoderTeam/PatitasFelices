import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GradingIcon from '@mui/icons-material/Grading';
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { createTheme, ThemeProvider } from '@mui/material';
import { brown } from '@mui/material/colors';
import {
	NavLink,
	Route,
	Routes,
	useLocation,
	useNavigate,
	Link,
} from 'react-router-dom';
import Request from './Admin_request/Request';
import { useEffect } from 'react';
import Products from './Admin_products/Products';
import DogsGrid from './Admin_dogs/DogsGrid';
import CreateDog from './Admin_dogs/Create_dog/CreateDog';
import UpdateDogForm from './Admin_dogs/Update_dog/UpdateDogForm';
import CreateProductForm from './Admin_products/Create_product/CreateProductForm';
import UpdateProductForm from './Admin_products/Update_Product/UpdateProductForm';
import Users from './Admin_users/Users';
import Orders from './Admin_orders/Orders';
import Home from './Admin_home/Home';

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export default function Dashboard() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const customTheme = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: brown[500],
			},
			background: {
				default: '#163440',
				paper: '#592519',
			},
			text: {
				...{
					primary: '#fff',
					secondary: '#fff',
				},
			},
		},
	});
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		if (location.pathname === '/dashboard') navigate('./');
	}, []);
	const links = [
		{ name: 'Inicio', route: '/', icon: <HomeIcon /> },
		{ name: 'Solicitudes', route: '/request', icon: <MailIcon /> },
		{ name: 'Productos', route: '/products', icon: <LocalOfferIcon /> },
		{ name: 'Perros', route: '/dogs', icon: <PetsIcon /> },
		{ name: 'Users', route: '/users', icon: <AccountCircleIcon /> },
		{ name: 'Ordenes', route: '/oders', icon: <GradingIcon /> },
	];

	return (
		<ThemeProvider theme={customTheme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position="fixed" open={open} >
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{
								marginRight: 5,
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon />
						</IconButton>
						{location.pathname === '/dashboard/' && (
							<Typography variant="h6" noWrap component="div">
								Administrador
							</Typography>
						)}
						{location.pathname === '/dashboard/request' && (
							<Typography variant="h6" noWrap component="div">
								Peticiones
							</Typography>
						)}
						{location.pathname === '/dashboard/products' && (
							<Typography variant="h6" noWrap component="div">
								Productos
							</Typography>
						)}
						{location.pathname === '/dashboard/dogs' && (
							<Typography variant="h6" noWrap component="div">
								Perros
							</Typography>
						)}
						{location.pathname === '/dashboard/users' && (
							<Typography variant="h6" noWrap component="div">
								Usuarios
							</Typography>
						)}
						{location.pathname === '/dashboard/oders' && (
							<Typography variant="h6" noWrap component="div">
								Órdenes
							</Typography>
						)}
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" open={open}>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'rtl' ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</DrawerHeader>
					<Divider />
					<List>
						{links.map((link, index) => (
							<ListItem key={index} disablePadding sx={{ display: 'block' }}>
								<ListItemButton
									component={NavLink}
									to={`.${link.route}`}
									selected={location.pathname === `/dashboard${link.route}`}
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										{link.icon}
									</ListItemIcon>
									<ListItemText
										primary={link.name}
										sx={{ opacity: open ? 1 : 0 }}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Drawer>
				<Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '72px' }}>
					<Typography paragraph>
						<Routes>
							<Route path={'/'} element={<Home />} />
							<Route path={'/request'} element={<Request />} />
							<Route path={'/products'} element={<Products />} />
							<Route
								path={'/products/createProduct'}
								element={<CreateProductForm />}
							/>
							<Route
								path={'/products/updateProduct'}
								element={<UpdateProductForm />}
							/>
							<Route path={'/users'} element={<Users />} />
							<Route path={'/oders'} element={<Orders />} />
							<Route path={'/dogs'} element={<DogsGrid />} />
							<Route path={'/dogs/createDog'} element={<CreateDog />} />
							<Route path={'/dogs/updateDog'} element={<UpdateDogForm />} />
						</Routes>
					</Typography>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
