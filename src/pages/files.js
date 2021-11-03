import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { AiFillFileText } from 'react-icons/ai';
import '../styles/files.css';

const Files = ({ data, location }) => {
	const { t } = useTranslation();
	const downloadFiles = data.allStrapiDownloadFiles.edges;
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
					</Col>
					{downloadFiles.map((fileGroup) => (
						<Col key={fileGroup.node.id}>
							<div className="d-flex align-items-center">
								<AiFillFileText />
								<h2>{fileGroup.node.Name}</h2>
							</div>
							<ListGroup variant="flush" horizontal>
								{fileGroup.node.Files.map((file) => (
									<ListGroup.Item key={file.id}>
										<a href={file.url}>{file.name}</a>
									</ListGroup.Item>
								))}
							</ListGroup>
						</Col>
					))}
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
					Files {
						id
						url
						name
					}
				}
			}
		}
	}
`;
