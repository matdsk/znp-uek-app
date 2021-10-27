import React from 'react';
import { Carousel } from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import '../styles/slider.css';

export default function Slider({ data }) {
	const sliders = data.edges;
	return (
		<Carousel className="c-slider">
			{data &&
				sliders.map((slide) => (
					<Carousel.Item key={slide.node.id} className="c-slider__item">
						<GatsbyImage
							image={getImage(slide.node.Image[0].localFile)}
							alt=""
							layout="fixed"
							className="c-slider__img d-block w-100"
						/>
						<Carousel.Caption>
							<h2>{slide.node.Title}</h2>
							<p>{slide.node.Text}</p>
						</Carousel.Caption>
					</Carousel.Item>
				))}
		</Carousel>
	);
}
