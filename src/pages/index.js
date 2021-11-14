import React from 'react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Slider from '../components/Slider';
import Seo from '../components/Seo';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecentArticles from '../components/RecentArticles';
import { graphql } from 'gatsby';

const Home = ({ data, location }) => {
	return (
		<Layout
			currentLang={data.locales.edges[0].node.language}
			contactData={data.allStrapiContacts}
		>
			<Container>
				<div className="row mb-4 mb-sm-5 c-main__wrapper">
					<div className="d-none d-xl-block col-3 c-sidebar__col">
						<Sidebar />
					</div>
					<div className="col-12 col-xl-9 c-slider__col">
						<Slider data={data.allStrapiSliders} />
					</div>
				</div>
				<div className="mb-4 mb-sm-5">
					<Seo data={data.allStrapiSeos} />
				</div>
				<div className="mb-4 mb-sm-5">
					<RecentArticles data={data.allStrapiArticles} />
				</div>
			</Container>
		</Layout>
	);
};

export default Home;

export const query = graphql`
	query ($language: String!) {
		allStrapiArticles(
			filter: { locale: { eq: $language } }
			limit: 3
			sort: { order: DESC, fields: updated_at }
		) {
			edges {
				node {
					id
					Slug
					Title
					Text
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
		allStrapiSeos(filter: { Position: { eq: 1 }, locale: { eq: $language } }) {
			edges {
				node {
					id
					Title
					Description
				}
			}
		}
		allStrapiSliders(filter: { locale: { eq: $language } }) {
			edges {
				node {
					id
					Text
					Link
					Title
					Image {
						localFile {
							childImageSharp {
								gatsbyImageData(
									width: 966
									quality: 70
									placeholder: BLURRED
									blurredOptions: { width: 100 }
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
