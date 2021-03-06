import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import { Container, Col, Row, Tabs, Tab, Table } from 'react-bootstrap';
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';

import '../styles/members.css';

const Members = ({ location, data }) => {
	const defaultActive = data.allStrapiMembers.edges[0].node.Nazwa;
	return (
		<Layout
			currentLang={data.locales.edges[0].node.language}
			contactData={data.allStrapiContacts}
		>
			<Container className="c-members mb-5">
				<h1 className="mb-4">Członkowie ZNP Pracowników UEKu w Krakowie</h1>

				<Tabs
					defaultActiveKey={defaultActive}
					id="uncontrolled-tab-example"
					className=""
				>
					{data &&
						data.allStrapiMembers.edges.map((members) => (
							<Tab
								eventKey={members.node.Nazwa}
								title={members.node.Nazwa}
								key={members.node.id}
							>
								<Table striped bordered hover className="d-none d-sm-table">
									<thead>
										<tr>
											<th>#</th>
											<th>Imię i Nazwisko</th>
											<th colSpan="2">Kontakt</th>
										</tr>
									</thead>
									<tbody>
										{members.node.Member.map((member) => (
											<tr key={member.id}>
												<td>{member.rola}</td>
												<td>{member.nazwa}</td>
												{member.telefon != null && (
													<td
														colSpan={member.email === null ? '2' : '1'}
														className="c-member__link"
													>
														<a
															href={
																'tel:+48' +
																member.telefon
																	.replace(/\s/g, '')
																	.replace(/-/g, '')
															}
														>
															{member.telefon}
														</a>
													</td>
												)}
												{member.email != null && (
													<td
														colSpan={member.telefon === null ? '2' : '1'}
														className="c-member__link"
													>
														<a href={'mailto:' + member.email}>
															{member.email}
														</a>
													</td>
												)}
												{member.email === null && member.telefon === null && (
													<td colSpan="2"></td>
												)}
											</tr>
										))}
									</tbody>
								</Table>
								<div className="d-sm-none">
									{members.node.Member.map((member) => (
										<Row key={member.id} className="px-3 py-2">
											<Col sm={6}>
												{member.rola && (
													<span className="c-member__role">{member.rola}</span>
												)}
												<span className="c-member__name">{member.nazwa}</span>
											</Col>
											<Col sm={6} className="py-1">
												{member.telefon != null && (
													<div className="d-flex justify-content-end align-items-center c-member__link">
														<AiOutlinePhone />
														<a
															href={
																'tel:+48' +
																member.telefon
																	.replace(/\s/g, '')
																	.replace(/-/g, '')
															}
														>
															{member.telefon}
														</a>
													</div>
												)}
											</Col>
											<Col sm={6} className="py-1">
												{member.email != null && (
													<div className="d-flex justify-content-end align-items-center c-member__link">
														<AiOutlineMail />
														<a href={'mailto:' + member.email}>
															{member.email}
														</a>
													</div>
												)}
											</Col>
											<hr className="c-member__hr"></hr>
										</Row>
									))}
								</div>
							</Tab>
						))}
				</Tabs>
			</Container>
		</Layout>
	);
};

export default Members;

export const query = graphql`
	query MemberList($language: String!) {
		allStrapiMembers(filter: { locale: { eq: $language } }) {
			edges {
				node {
					Member {
						email
						id
						nazwa
						telefon
						rola
					}
					Nazwa
					id
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
	}
`;
