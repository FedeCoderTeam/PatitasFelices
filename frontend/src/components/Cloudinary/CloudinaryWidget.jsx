import { useEffect, useRef } from 'react';
import './cloudinaryWidget.css'

const CloudinaryWidget = ({ setUrl }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: 'dmn9piojd',
                uploadPreset: 'perdii'
            }, function(error, result) {
                if(!error && result && result.event === "success"){
                    setUrl(result.info.url)
                }
            }
        );
    }, []);

    return(
        <div className='containerBtn-Form' >
            <button type='button' onClick={() => widgetRef.current.open()}>Adjuntar imagen</button>
        </div>
    );
}

export default CloudinaryWidget;