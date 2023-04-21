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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {createTheme, ThemeProvider} from '@mui/material';
import {brown} from '@mui/material/colors';
import {NavLink, Route, Routes, useLocation, useNavigate, Link} from 'react-router-dom';
import ViewA from './ViewA';
import {useEffect} from 'react';
import ViewB from './ViewB';
import ViewC from './ViewC';
import CreateDog from './components/createDog/CreateDog'
import CreateProductForm from '../../components/Forms/CreateProductForm/CreateProductForm';
import UpdateDogForm from '../../components/Forms/UpdateDogForm/UpdateDogForm';


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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
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
    }),
);

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
                paper: '#592519'
            },
            text: {
                ...{
                    primary: '#fff',
                    secondary: '#fff'
                }
            }
        },
    });
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        if(location.pathname === '/dashboard') navigate('./')
    }, [])
    const links = [
        {name: 'Home', route: '/', icon: <MailIcon /> },
        { name: 'viewB', route: '/viewB', icon: <MailIcon /> },
        { name: 'viewC', route: '/viewC', icon: <MailIcon /> }
    ]

    return (
        <ThemeProvider theme={customTheme}>
            <Link to='/dashboard'><button style={{marginTop: '40px'}}>OLVERA HOME DASHBOARD</button></Link>
            <Link to='/home'><button style={{marginTop: '40px'}}>VOLVER A HOME</button></Link>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
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
                        <Typography variant="h6" noWrap component="div">
                            Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {
                            links.map((link, index) => (
                                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton component={NavLink} to={`.${link.route}`} selected={location.pathname === `/dashboard${link.route}`} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }} >
                                            {link.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={link.name} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Typography paragraph>
                        <Routes>
                            <Route path={'/'} element={<ViewA />} />
                            <Route path={'/viewB'} element={<ViewB />} />
                            <Route path={'/viewC'} element={<ViewC />} />
                            <Route path={'/viewB/createDog'} element={<CreateDog />} />
                            <Route path={'/viewB/createProductForm'} element={<CreateProductForm />} />
                            <Route path={'/viewB/updateDog'} element={<UpdateDogForm />} />
                        </Routes>
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}