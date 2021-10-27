import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import { Container, Row, Col } from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import '../styles/articles.css';

export default function ArticleList({ data, pageContext, location }) {
	const removeMd = require('remove-markdown');
	const { t } = useTranslation();
	return (
		<Layout
			location={location}
			crumbLabel={t('articles')}
			currentLang={data.locales.edges[0].node.language}
			contactData={data.allStrapiContacts}
		>
			<Container className="c-article c-article-list mb-5">
				<Row>
					<Col className="d-flex align-items-center justify-content-between mb-3">
						<h1>{t('articles')}</h1>
					</Col>
				</Row>
				{data &&
					data.allStrapiArticles.edges.map((article) => (
						<Row key={article.node.id} className="mb-4">
							<Col lg={5} xl={4} className="mb-3 mb-lg-0">
								<GatsbyImage
									image={getImage(article.node.Image.localFile)}
									alt={article.node.Title}
									layout="fixed"
									className="c-articles__img"
								/>
							</Col>
							<Col
								lg={7}
								xl={8}
								className="d-flex flex-column justify-content-between pt-1"
							>
								<div className="mb-2">
									<h3>{article.node.Title}</h3>
									<span>{removeMd(article.node.Text.slice(0, 250))}...</span>
								</div>
								<Link
									to={'/article/' + article.node.Slug}
									className="c-article-list__link"
								>
									Czytaj dalej
								</Link>
							</Col>
						</Row>
					))}
				<Pagination
					currentPage={pageContext.currentPage}
					pageCount={pageContext.pageCount}
					base={'/articles'}
				/>
			</Container>
		</Layout>
	);
}

export const query = graphql`
	query ArticleList($skip: Int!, $limit: Int!, $language: String!) {
		allStrapiArticles(
			sort: { order: DESC, fields: updated_at }
			skip: $skip
			limit: $limit
			filter: { locale: { eq: $language } }
		) {
			edges {
				node {
					id
					Title
					Text
					Slug
					Image {
						localFile {
							childImageSharp {
								gatsbyImageData(
									placeholder: BLURRED
									height: 400
									width: 600
									quality: 70
									blurredOptions: { width: 50 }
								)
							}
						}
					}
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
