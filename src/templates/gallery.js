import { graphql } from 'gatsby';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import { Container } from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/gallery.css';

export default function Gallery({ data, pageContext, location }) {
	const [selectedImg, setSelectedImg] = useState(null);
	return (
		<Layout
			location={location}
			crumbLabel="Galeria"
			currentLang={data.locales.edges[0].node.language}
			contactData={data.allStrapiContacts}
		>
			<Container className="c-gallery mb-5">
				{data.allStrapiGalleries.edges.map((galleries) => (
					<div className="c-gallery__card" key={galleries.node.id}>
						<h3>{galleries.node.Title}</h3>
						<hr className="c-gallery__hr"></hr>
						<p>{galleries.node.Description}</p>
						<div className="c-gallery__grid">
							{galleries.node.Images.map((gallery) => (
								<div
									className="c-gallery__img-wrap"
									key={gallery.id}
									onClick={() => setSelectedImg(gallery.localFile)}
								>
									<GatsbyImage
										image={getImage(gallery.localFile)}
										alt=""
										layout="fixed"
										className="c-gallery__img"
									/>
								</div>
							))}
						</div>
						{selectedImg && (
							<Modal
								selectedImg={selectedImg}
								setSelectedImg={setSelectedImg}
							/>
						)}
					</div>
				))}
				<Pagination
					currentPage={pageContext.currentPage}
					pageCount={pageContext.pageCount}
					base={'/gallery'}
				/>
			</Container>
		</Layout>
	);
}

export const query = graphql`
	query Gallery($skip: Int!, $limit: Int!, $language: String!) {
		allStrapiGalleries(
			sort: { fields: created_at, order: DESC }
			skip: $skip
			limit: $limit
			filter: { locale: { eq: $language } }
		) {
			edges {
				node {
					id
					Title
					Description
					Images {
						id
						localFile {
							childImageSharp {
								gatsbyImageData(
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
