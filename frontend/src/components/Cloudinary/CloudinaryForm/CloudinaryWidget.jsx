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
    
        <div className='containerCloudinaryBtn-AdoptionForm' >
            <button type='button' onClick={() => widgetRef.current.open()}>Adjuntar imagen <i className="fa-solid fa-upload"></i></button>
        </div>
    );
}

export default CloudinaryWidget;