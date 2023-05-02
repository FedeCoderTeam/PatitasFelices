import {useSelector} from 'react-redux';
import './Overlay.css'
import { Player } from '@lottiefiles/react-lottie-player';
import Google from './Google.json'

const Overlay = () => {
    const showOverlay = useSelector(state => state.authReducer.showOverlay)

    return (<>
        {showOverlay && <div className={'overlay'} data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="300" data-aos-offset="0">
            <Player
                autoplay
                src={Google}
                keepLastFrame
                style={{ height: '600px', width: '600px' }}
            />
        </div>}
    </>)
}

export default Overlay