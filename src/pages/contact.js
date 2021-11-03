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
					<Col md={6} className="c-contact__address mb-5 mb-md-0">
						{data &&
							contactData.map((contact) => (
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
						<Form name="contact" method="POST" data-netlify="true">
							<Form.Group className="mb-3" controlId="email">
								<Form.Label>
									<Trans>email</Trans>
								</Form.Label>
								<Form.Control
									type="email"
									name="email"
									placeholder="e-mail"
									required
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="subject">
								<Form.Label>
									<Trans>subject</Trans>
								</Form.Label>
								<Form.Control
									type="text"
									name="subject"
									placeholder="Temat"
									required
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="message">
								<Form.Label>
									<Trans>message</Trans>
								</Form.Label>
								<Form.Control as="textarea" name="message" rows={3} required />
							</Form.Group>
							<div data-netlify-recaptcha="true"></div>
							<Button variant="primary" type="submit" className="px-5">
								<Trans>send</Trans>
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
