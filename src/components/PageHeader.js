import { Link } from 'gatsby';
import React from 'react';
import ZnpImg from '../images/znp-logo.png';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { BsPlay, BsList } from 'react-icons/bs';
import { Trans } from 'gatsby-plugin-react-i18next';

import '../styles/page-header.css';

export default function PageHeader() {
	return (
		<header className="c-page-header">
			<Container>
				<Navbar expand="xl">
					<Navbar.Brand
						href="/"
						className="d-flex align-items-center c-page-header__logo"
					>
						<img
							alt=""
							src={ZnpImg}
							width="55"
							className="d-inline-block align-top"
						/>{' '}
						<div>
							<h2 className="d-none d-sm-block">
								Związek Nauczycielstwa Polskiego
							</h2>
							<h2 className="d-sm-none">ZNP</h2>
							<h3>Pracowników UEK</h3>
						</div>
					</Navbar.Brand>
					<Navbar.Toggle
						aria-controls="responsive-navbar-nav"
						className="c-page-header__toggler"
						children={<BsList width="24px" height="24px" />}
					/>
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav as="ul" className="c-page-header__nav d-xl-none">
							<Nav.Item as="li">
								<Link
									to="/articles"
									className="nav-link"
									activeClassName="active"
								>
									<BsPlay />
									<Trans>articles</Trans>
								</Link>
							</Nav.Item>
							<Nav.Item as="li">
								<Link
									to="/gallery"
									className="nav-link"
									activeClassName="active"
								>
									<BsPlay />
									<Trans>gallery</Trans>
								</Link>
							</Nav.Item>
							<Nav.Item as="li">
								<Link
									to="/members"
									className="nav-link"
									activeClassName="active"
								>
									<BsPlay />
									<Trans>members</Trans>
								</Link>
							</Nav.Item>
							<Nav.Item as="li">
								<Link
									to="/contact"
									className="nav-link"
									activeClassName="active"
								>
									<BsPlay />
									<Trans>contact</Trans>
								</Link>
							</Nav.Item>
							<Nav.Item as="li">
								<Link to="/files" className="nav-link" activeClassName="active">
									<BsPlay />
									<Trans>download_files</Trans>
								</Link>
							</Nav.Item>
							<Nav.Item as="li">
								<Link
									to="/join-us"
									className="nav-link"
									activeClassName="active"
								>
									<BsPlay />
									<Trans>join_us</Trans>
								</Link>
							</Nav.Item>
							<Nav.Item as="li">
								<a href="https://uek.krakow.pl/" className="nav-link">
									<BsPlay />
									<Trans>uek_main_page</Trans>
								</a>
							</Nav.Item>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</Container>
		</header>
	);
}
