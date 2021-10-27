import { Link } from 'gatsby';
import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Button, Row, Col } from 'react-bootstrap';
import { Trans } from 'gatsby-plugin-react-i18next';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { BsArrowRightShort } from 'react-icons/bs';

import '../styles/articles.css';

const RecentArticles = ({ data }) => {
	const articles = data.edges;
	const removeMd = require('remove-markdown');
	return (
		<div className="c-article c-recent-articles">
			<Row>
				<Col className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
					<h2 className="c-recent-articles__title mb-3 mb-md-0">
						<Trans>recent_news</Trans>
					</h2>
					<Button
						variant="outline-primary"
						href="/articles"
						className="c-recent-articles__btn"
					>
						<Trans>see_all_news</Trans>
						<IoArrowForwardOutline />
					</Button>{' '}
				</Col>
			</Row>
			{data &&
				articles.map((article) => (
					<Row key={article.node.id} className="mb-4">
						<Col lg={5} xl={4} className="mb-3 mb-lg-0">
							<GatsbyImage
								image={getImage(article.node.Image.localFile)}
								alt={article.node.Title}
								layout="fixed"
								className="c-recent-articles__img"
							/>
						</Col>
						<Col
							lg={7}
							xl={8}
							className="d-flex flex-column justify-content-between pt-1"
						>
							<div className="">
								<h3 className="mb-md-3">{article.node.Title}</h3>
								<span>{removeMd(article.node.Text.slice(0, 250))}...</span>
							</div>
							<Link
								to={'/article/' + article.node.Slug}
								className="c-recent-articles__link mt-2 mt-mb-0"
							>
								<Trans>read_more</Trans>
								<BsArrowRightShort />
							</Link>
						</Col>
					</Row>
				))}
		</div>
	);
};

export default RecentArticles;
