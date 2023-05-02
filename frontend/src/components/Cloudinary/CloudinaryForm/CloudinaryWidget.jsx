import { useEffect, useRef } from 'react';
import './cloudinaryWidget.css'
import { useTranslation } from 'react-i18next';


const CloudinaryWidget = ({ setUrl }) => {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();
	const { t } = useTranslation();


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
            <button type='button' onClick={() => widgetRef.current.open()}>{t('cloudWidg.attach')} <i className="fa-solid fa-upload"></i></button>
        </div>
    );
}

export default CloudinaryWidget;