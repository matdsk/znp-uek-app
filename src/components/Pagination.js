import React from 'react';
import { Link } from 'gatsby';
import {
	BsFillArrowRightSquareFill,
	BsFillArrowLeftSquareFill,
} from 'react-icons/bs';

import '../styles/pagination.css';

const Pagination = ({ currentPage, pageCount, base }) => {
	const prevPage =
		currentPage - 1 === 1 ? `${base}/` : `/${base}/${currentPage - 1}`;
	const nextPage = `${base}/${currentPage + 1}`;
	return (
		<nav className="d-flex justify-content-end align-items-center c-pagination">
			{currentPage > 1 ? (
				<Link title="Go to previous page" to={prevPage}>
					<BsFillArrowLeftSquareFill />
				</Link>
			) : (
				<span />
			)}
			<span className="mx-3">
				Strona {currentPage} z {pageCount}
			</span>
			{currentPage < pageCount ? (
				<Link title="Go to next page" to={nextPage}>
					<BsFillArrowRightSquareFill />
				</Link>
			) : (
				<span />
			)}
		</nav>
	);
};

export default Pagination;
