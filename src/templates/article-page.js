import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import ReactMarkdown from 'react-markdown';

import '../styles/articles.css';

const ArticlePage = ({ data, location }) => {
	const article = data.strapiArticles;

	return (
		<Layout
			hideTopbar="true"
			contactData={data.allStrapiContacts}
			currentLang={data.locales.edges[0].node.language}
		>
			<Container className="mb-5 c-article c-article-page">
				<Row className="mb-3 d-flex align-items-center">
					<Col xl={10} className="mb-2 mb-xl-0">
						<h1>{article.Title}</h1>
					</Col>
					<Col xl={2} className="d-flex justify-content-end">
						<span>{article.updated_at}</span>
					</Col>
				</Row>
				<Row className="mb-3">
					<Col xl={6} className="d-flex justify-content-center mb-4 mb-xl-0">
						<GatsbyImage
							image={getImage(article.Image.localFile)}
							alt={article.Title}
							layout="fixed"
							className="c-article-page__img"
						/>
					</Col>
					<Col xl={6} className="c-article__wyswig">
						<ReactMarkdown>{article.Text}</ReactMarkdown>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default ArticlePage;

export const query = graphql`
	query Article($slug: String!, $language: String!) {
		strapiArticles(Slug: { eq: $slug }) {
			Image {
				localFile {
					childImageSharp {
						gatsbyImageData(layout: FIXED, placeholder: BLURRED)
					}
				}
			}
			Title
			Text
			Slug
			updated_at(formatString: "DD/MM/YYYY HH:MM")
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
		locales: allLocale(filter: { language: { eq: $language } }) {
			edges {
				node {
					ns
					data
					language
				}
			}
		}
	}
`;
