import { useEffect, useRef } from 'react';
import './cloudinaryWidgetFull.css';
import { useTranslation } from 'react-i18next';


const CloudinaryWidgetFull = ({ setUrl }) => {
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
        <div className='containerCloudinaryFullBtn-AdoptionForm' >
            <button type='button' onClick={() => widgetRef.current.open()}>{t('cloudWidgFull.attachSuccess')} <i class="fa-solid fa-circle-check"></i></button>
        </div>
    );
}

export default CloudinaryWidgetFull;