import React from 'react';
import '../styles/top-bar.css';
import UekImg from '../images/logo_uek_white.svg';
import plIcon from '../images/pl.png';
import engIcon from '../images/eng.png';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';

export default function TopBar({ currentLang }) {
	const { languages, originalPath } = useI18next();
	return (
		<div className="container-fluid c-top-bar">
			<div className="container d-flex justify-content-between align-items-center py-2">
				<a href="https://uek.krakow.pl/">
					<div className="c-top-bar__logo">
						<img src={UekImg} alt="Logo" />
					</div>
				</a>
				<div className="c-top-bar__nav">
					<ul>
						{languages.map((lng) => (
							<li key={lng}>
								<Link to={originalPath} language={lng}>
									{currentLang !== lng &&
										((lng === 'en' && <img src={engIcon} alt={lng} />) ||
											(lng === 'pl' && <img src={plIcon} alt={lng} />))}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
