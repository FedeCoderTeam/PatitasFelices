import React from 'react';
import Header from '../../components/Header/Header';
import { useSelector } from 'react-redux';
import './Home.css';
import { Link } from 'react-router-dom';
import HomeDonationSection from '../../components/HomeSection/HomeDonationSection/HomeDonationSection';
import HomeProductSection from '../../components/HomeSection/HomeProductSection/HomeProductSection';
import HomeReviewSection from '../../components/HomeSection/HomeReviewSection/HomeReviewSection';
import { useTranslation } from 'react-i18next';
import ReviewCard from '../../components/Cards/ReviewCard/ReviewCard';
import { Player } from '@lottiefiles/react-lottie-player';
import GirlAndDog from '../../utils/animations/GirlAndDogHome.json'

const Home = () => {
	//navbar
	//header
	//cards
	// const [dogsPerPage] = useState(7);
	const { t } = useTranslation();
	const allReviews = useSelector((state) => state.reviewsReducer.reviews);
	// console.log(allReviews);
	return (
		<>
			<Header />
			<div
				className="mainContainerCardsHDS-Home"
				data-aos="fade-down"
				data-aos-duration="1000"
			>
				<div className="dogSectionContainer">
					<div className="dogSectionContainer-LeftSide">
						<h1>
							{t('home.section.dog.our')}{' '}
							<span>{t('home.section.dog.rescues')}</span>
						</h1>
						<h4>{t('home.section.dog.text1')}</h4>
						<h3>{t('home.section.dog.text2')}</h3>
						<div>
							<Link to="/dogs">
								<button className="button">
									{t('home.section.dog.meetThemAll')}
								</button>
							</Link>
						</div>
					</div>
					<div className="containerCardsHDS-Home">
						<Link to="/dogs">
							<Player
								autoplay
								loop
								src={GirlAndDog}
								className='dogSectionImage'
							/>
						</Link>
					</div>
				</div>

				<div
					className="sectionDonationProducts-Home"
					data-aos="fade-down"
					data-aos-duration="1000"
				>
					<HomeDonationSection />
				</div>

				<div data-aos="fade-down" data-aos-duration="1000">
					<HomeProductSection />
				</div>

				<div data-aos="fade-down" data-aos-duration="1000">
					<HomeReviewSection />
				</div>

			</div>
		</>
	);
};

export default Home;
