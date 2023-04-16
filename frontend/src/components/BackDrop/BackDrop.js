import {Backdrop, CircularProgress} from '@mui/material';
import {useSelector} from 'react-redux';
import {createPortal} from 'react-dom';

export default function BackDrop() {
    const isFetching = useSelector(state => state.authReducer.isFetching)
    return createPortal(
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isFetching} >
            <CircularProgress color="inherit" />
        </Backdrop>, document.body
    )
}