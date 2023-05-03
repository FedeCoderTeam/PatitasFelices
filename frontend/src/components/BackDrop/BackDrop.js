import {Backdrop, CircularProgress} from '@mui/material';
import {useSelector} from 'react-redux';
import {createPortal} from 'react-dom';

export default function BackDrop() {
    const isFetchingAuth = useSelector(state => state.authReducer.isFetchingAuth)
    return createPortal(
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isFetchingAuth} >
            <CircularProgress color="inherit" />
        </Backdrop>, document.body
    )
}