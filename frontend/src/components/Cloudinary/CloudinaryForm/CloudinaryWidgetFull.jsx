import { useEffect, useRef } from 'react';
import './cloudinaryWidgetFull.css'

const CloudinaryWidgetFull = ({ setUrl }) => {
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
        <div className='containerCloudinaryFullBtn-AdoptionForm' >
            <button type='button' onClick={() => widgetRef.current.open()}>Imagen subida con éxito <i class="fa-solid fa-circle-check"></i></button>
        </div>
    );
}

export default CloudinaryWidgetFull;