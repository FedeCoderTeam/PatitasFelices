import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './donation.module.css';
import video from './images/backgroundCSS.mp4';
import { setLinkDePagos } from '../../_redux/actions/mercadopagoAction';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';


const Donation = () => {
	const { t } = useTranslation();
    const [donation, setDonation] = useState([
        {
            id: 1,
            name: 'Donacion',
            image: 'zazaazaza.png',
            description: 'donacion',
            category: 'donacion',
            quantity: 1,
            price: null,
        },
    ]);

    const dispatch = useDispatch();

    const handleDonation = (e) => {
        let donation2 = donation.map((el) => {
            return {
                ...el,
                price: e.target.value,
            };
        });
        setDonation(donation2);
    };
    const handleClick = async () => {
        dispatch(setLinkDePagos(donation));
    };

    return (
        <>
            <div>
                <video
                    className={style.video}
                    autoplay="true"
                    muted="true"
                    loop="true"
                    src={video}
                ></video>
            </div>
            <div className={style.mainContainer}>
                <div className={style.containerDescription}>
                    <h2>
                        {t('donation.text')}
                    </h2>
                    <h3>{t('dalai.text')}</h3>
                    <h4>~ Dalai Lama</h4>
                </div>
                <div className={style.containerSections}>
                    <div className={style.sectionMercadoPago}>
                        {/* <div> */}
                            <h3>{t('donation.mp')}</h3>
                            <div className={style.containerInputButton}>
                                <input
                                    name="donation"
                                    type="number"
                                    value={donation[0].price}
                                    placeholder={t('donation.placeholder')}
                                    onChange={(e) => {
                                        handleDonation(e);
                                    }}
                                />
                                <div>
                                <button onClick={handleClick}>{t('nav.links.donate')}</button>
                                </div>
                            </div>
                        {/* </div> */}
                    </div>
                    <div className={style.sectionBuyProducts}>
                        <div>
                            <h3>{t('donation.other')}</h3>
                            <button>
                                <Link target="_blank" to="https://wa.me/5493517039524">
                                    {t('donation.talk')}
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Donation;
