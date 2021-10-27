import React from 'react';
import ReactMarkdown from 'react-markdown';

import '../styles/seo.css';

export default function Seo({ data }) {
	const seos = data.edges;
	return (
		<div>
			{data &&
				seos.map((seo) => (
					<div key={seo.node.id} className="c-seo">
						<h1>{seo.node.Title}</h1>
						<ReactMarkdown>{seo.node.Description}</ReactMarkdown>
					</div>
				))}
		</div>
	);
}
