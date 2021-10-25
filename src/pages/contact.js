import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

import '../styles/contact.css';

const Contact = ({ data, location }) => {
	const contactData = data.allStrapiContacts.edges;
	const { t } = useTranslation();
	return (
		<Layout
			location={location}
			crumbLabel={t('contact')}
			currentLang={data.locales.edges[0].node.language}
			contactData={data.allStrapiContacts}
		>
			<Container className="c-contact mb-5">
				<Row className="mb-4">
					<Col>
						<h1>
							<Trans>contact</Trans>
						</h1>
					</Col>
				</Row>
				<Row>
					<Col md={6} className="c-contact__address">
						{contactData.map((contact) => (
							<div key={contact.node.id}>
								<div className="mb-3 c-contact__street">
									<h4>Siedziba związku:</h4>
									<p>
										{contact.node.Address} {contact.node.ZipCode}{' '}
										{contact.node.City}
									</p>
									<p>{contact.node.AddressDescription}</p>
								</div>
								<div className="mb-3">
									{contact.node.PhoneNumber.map((phone) => (
										<p key={phone.id}>
											<AiOutlinePhone /> {phone.Number}
										</p>
									))}
								</div>
								<p>
									<AiOutlineMail />{' '}
									<a href={'mailto:' + contact.node.Mail}>
										{contact.node.Mail}
									</a>
								</p>
							</div>
						))}
					</Col>
					<Col md={6} className="c-contact__form">
						<h2 className="mb-3">Skontaktuj się z nami:</h2>
						<Form>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Adres mailowy</Form.Label>
								<Form.Control type="email" placeholder="adres e-mail" />
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicTitle">
								<Form.Label>Temat</Form.Label>
								<Form.Control type="text" placeholder="Temat" />
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlTextarea1"
							>
								<Form.Label>Treść</Form.Label>
								<Form.Control as="textarea" rows={3} />
							</Form.Group>
							<Button variant="primary" type="submit" className="px-5">
								Wyślij
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default Contact;

export const query = graphql`
	query Contact($language: String!) {
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
