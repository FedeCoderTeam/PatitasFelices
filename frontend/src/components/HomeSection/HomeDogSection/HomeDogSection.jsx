import React from 'react';
import './homeDogSection.css';

const HomeDogSection = ({ image, name, age, gender }) => {
	return (
		<div
			className="mainContainer-HDS"
			data-aos="fade-up"
			data-aos-duration="1000"
		>
			<div className="container-HDS">
				<div>
					<img src={image} alt="image" />
					<div className="containerData-HDS">
						<p>{name}</p>
						<p>{age}</p>
						<p>{gender}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeDogSection;
