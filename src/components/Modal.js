import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Modal = ({ setSelectedImg, selectedImg }) => {
	const handleClick = (e) => {
		if (e.target.classList.contains('backdrop')) {
			setSelectedImg(null);
		}
	};

	return (
		<div className="backdrop" onClick={handleClick}>
			<GatsbyImage
				image={getImage(selectedImg)}
				alt=""
				layout="fixed"
				className="c-gallery__img"
				width="600"
			/>
		</div>
	);
};

export default Modal;
