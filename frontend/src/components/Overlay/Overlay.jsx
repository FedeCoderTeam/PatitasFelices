import {useSelector} from 'react-redux';
import './Overlay.css'
import logo from './google.png'

const Overlay = () => {
    const showOverlay = useSelector(state => state.authReducer.showOverlay)

    return (<>
        {showOverlay && <div className={'overlay'} data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="300" data-aos-offset="0"><img src={logo} alt={'Google'} draggable={false} /></div>}
    </>)
}

export default Overlay