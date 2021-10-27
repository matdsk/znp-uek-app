import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';

import UekImg from '../images/uek-logo-sm.png';
import BipImg from '../images/bip-logo.png';

import '../styles/footer.css';

export default function PageFooter({ data }) {
	const contacts = data.edges;
	return (
		<footer className="c-page-footer">
			<Container>
				<Row>
					<Col md={4}>
						<div className="c-footer__uek">
							<a href="https://uek.krakow.pl/" className="align-self-start">
								<img src={UekImg} alt="UEK" />
							</a>
							<div className="c-footer__uek-text">
								<h3>
									Uniwersytet Ekonomiczny <br /> w Krakowie
								</h3>
								<h5>Związek Nauczycielstwa Polskiego</h5>
							</div>
						</div>
					</Col>
					<Col md={4} className="c-page-footer__contact my-4 my-md-0">
						{data &&
							contacts.map((contact) => (
								<div key={contact.node.id}>
									<div className="mb-3 c-page-footer__address">
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
												<AiOutlinePhone />
												<a
													href={
														'tel:+48' +
														phone.Number.replace(/\s/g, '').replace(/-/g, '')
													}
												>
													{phone.Number}
												</a>
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
					<Col md={4}>
						<a href="https://bip.uek.krakow.pl/" className="d-block">
							<div className="c-footer__bip d-inline-block">
								<img src={BipImg} alt="Bip" />
								<span>Biuletyn Informacji Publicznej</span>
							</div>
						</a>
					</Col>
				</Row>
			</Container>
		</footer>
	);
}
