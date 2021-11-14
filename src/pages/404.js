import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';

import '../styles/not-found.css';

const NotFoundPage = ({ data, location }) => {
	return (
		<Layout
			currentLang={data.locales.edges[0].node.language}
			contactData={data.allStrapiContacts}
		>
			<Container className="c-not-found pt-5">
				<Row>
					<Col className="d-flex flex-column align-items-center">
						<h2>404</h2>
						<h1>Podana strona nie istnieje.</h1>
						<Link to="/">Powrót do strony głównej</Link>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default NotFoundPage;

export const query = graphql`
	query NotFoundPage($language: String!) {
		locales: allLocale(filter: { language: { eq: $language } }) {
			edges {
				node {
					ns
					data
					language
				}
			}
		}
		allStrapiContacts(filter: { locale: { eq: $language } }) {
			edges {
				node {
					Address
					AddressDescription
					City
					Mail
					PhoneNumber {
						Number
						id
					}
					id
					ZipCode
				}
			}
		}
	}
`;
