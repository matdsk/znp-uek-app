import React from 'react';
import TopBar from './TopBar';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import { Container } from 'react-bootstrap';

import { Breadcrumb } from 'gatsby-plugin-breadcrumb';

import '../styles/global.css';
import '../styles/breadcrumb.css';

export default function Layout({
	children,
	location,
	crumbLabel,
	currentLang,
	hideTopbar,
	contactData,
}) {
	return (
		<div className="layout">
			{!hideTopbar && <TopBar currentLang={currentLang} />}
			<PageHeader />
			{location.pathname !== '/' && location.pathname !== '/en/' && (
				<Container className="c-breadcrumb mb-4 mt-3">
					<Breadcrumb
						location={location}
						crumbLabel={crumbLabel}
						crumbSeparator=""
					/>
				</Container>
			)}
			<div className="content mt-4">{children}</div>
			<PageFooter data={contactData} />
		</div>
	);
}
