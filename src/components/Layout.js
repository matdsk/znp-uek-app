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
	currentLang,
	hideTopbar,
	contactData,
}) {
	return (
		<div className="layout">
			{!hideTopbar && <TopBar currentLang={currentLang} />}
			<PageHeader />
			<div className="content mt-4">{children}</div>
			<PageFooter data={contactData} />
		</div>
	);
}
