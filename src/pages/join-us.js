import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

import '../styles/join-us.css';

const JoinUs = ({ data, location }) => {
	const { t } = useTranslation();
	const joinUs = data.strapiJoinUs;
	return (
		<Layout
			location={location}
			crumbLabel={t('join_us')}
			currentLang={data.locales.edges[0].node.language}
			contactData={data.allStrapiContacts}
		>
			<Container className="c-join-us mb-5">
				<Row>
					<Col>
						<h1 className="mb-5">
							<Trans>join_us</Trans>
						</h1>
						<div className="c-join-us__wyswig">
							<ReactMarkdown>{joinUs.Content}</ReactMarkdown>
						</div>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default JoinUs;

export const query = graphql`
	query JoinUs($language: String!) {
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
		strapiJoinUs {
    	Content
		}
	}
`;
