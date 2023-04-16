import React from "react";
import { Link } from "react-router-dom";
import style from '../Nav/nav.module.css';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import {Divider, ListItemIcon} from '@mui/material';
import {Settings, Logout} from '@mui/icons-material';
import {logoutUserAction} from '../../_redux/actions/authAction';


export default function Nav() {

    const selector = useSelector(state => state.authReducer)

    return(
        <div className={style.containerNav}>
            <div className={style.containerLeft}>
                <Link to="/home" className={style.link}>
                    <p className={style.links}>Home</p>
                </Link>
                <Link to="/products" className={style.link}>
                    <p className={style.links}>Productos</p>
                </Link>
                <Link to="/dogs" className={style.link}>
                    <p className={style.links}>Perros</p>
                </Link>
            </div>
            {
                !selector.isAuthenticated
                    ?
                    <div className={style.containerRight}>
                        <Link to="/login" className={style.link}>
                            <p className={style.links}>Ingresar</p>
                        </Link>
                        <Link to="/register" className={style.link}>
                            <p className={style.links}>Registrarse</p>
                        </Link>
                    </div>
                    :
                    <>
                        <AvatarComponent selector={selector} />
                    </>
            }
        </div>
    )
}

export function AvatarComponent(props) {
    const dispatch = useDispatch()

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        dispatch(logoutUserAction(props.selector.user.id))
    };

    return(<>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Mi cuenta">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={props.selector.user.name}/>
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
                    <MenuItem onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
            </Menu>
        </Box>
    </>)
}