import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import ListGroup from 'react-bootstrap/ListGroup';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { MdFileDownload } from 'react-icons/md';

import '../styles/join-us.css';

const JoinUs = ({ data, location }) => {
	const { t } = useTranslation();
	const joinUs = data.strapiJoinUs;
	return (
		<Layout
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
						<ListGroup variant="flush">
							{joinUs.File.map((file) => (
								<ListGroup.Item key={file.id}>
									<a className="c-files__link" href={file.url}>
										<MdFileDownload />
										{file.name}
									</a>
								</ListGroup.Item>
							))}
						</ListGroup>
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
			File {
				id
				url
				name
			}
		}
	}
`;
