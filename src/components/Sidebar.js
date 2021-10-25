import React from 'react';
import { Nav } from 'react-bootstrap';
import { BsPlayFill } from 'react-icons/bs';
import { Trans } from 'gatsby-plugin-react-i18next';

import '../styles/sidebar.css';

const Sidebar = () => {
	return (
		<Nav className="flex-column c-sidebar h-100 py-4">
			<Nav.Link href="/articles">
				<BsPlayFill />
				<span>
					<Trans>articles</Trans>
				</span>
			</Nav.Link>
			<Nav.Link href="/gallery">
				<BsPlayFill />
				<span>
					<Trans>gallery</Trans>
				</span>
			</Nav.Link>
			<Nav.Link href="/members">
				<BsPlayFill />
				<span>
					<Trans>members</Trans>
				</span>
			</Nav.Link>
			<Nav.Link href="/contact">
				<BsPlayFill />
				<span>
					<Trans>contact</Trans>
				</span>
			</Nav.Link>
			<Nav.Link href="/files">
				<BsPlayFill />
				<span>
					<Trans>download_files</Trans>
				</span>
			</Nav.Link>
			<Nav.Link href="/join-us">
				<BsPlayFill />
				<span>
					<Trans>join_us</Trans>
				</span>
			</Nav.Link>
			<Nav.Link href="https://uek.krakow.pl/">
				<BsPlayFill />
				<span>
					<Trans>uek_main_page</Trans>
				</span>
			</Nav.Link>
		</Nav>
	);
};

export default Sidebar;
