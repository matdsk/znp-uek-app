import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

import '../styles/files.css';

const Files = ({ data, location }) => {
	const { t } = useTranslation();
	console.log(data);
	return (
		<Layout
			location={location}
			crumbLabel={t('download_files')}
			currentLang={data.locales.edges[0].node.language}
			contactData={data.allStrapiContacts}
		>
			<Container className="c-files mb-5">
				<Row>
					<Col>
						<h1 className="mb-5">
							<Trans>download_files</Trans>
						</h1>
						<h3 className="d-flex justify-content-center py-3">
							Brak plików do pobrania.
						</h3>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default Files;

export const query = graphql`
	query Files($language: String!) {
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
		allStrapiDownloadFiles(filter: { locale: { eq: $language } }) {
			edges {
				node {
					id
					Name
				}
			}
		}
	}
`;
