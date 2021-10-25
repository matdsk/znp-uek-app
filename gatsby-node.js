// CREATE PAGES

const path = require(`path`);

const allArticlesQuery = `{
	allStrapiArticles {
    group(field: locale) {
      edges {
        node {
          id
          Slug
        }
      }
      totalCount
    }
  }
}`;

const allGalleriesQuery = `{
	allStrapiGalleries {
    group(field: locale) {
      edges {
        node {
          id
        }
      }
      totalCount
    }
  }
}`;

const createDetailPages = ({ allStrapiArticles }, createPage) => {
	return allStrapiArticles.group.map((localGroup) => {
		localGroup.edges.map((node) => {
			createPage({
				path: `/article/` + node.node.Slug,
				component: path.resolve('./src/templates/article-page.js'),
				context: { slug: node.node.Slug },
			});
		});
	});
};

// PAGINATION
const articlePerPage = 5;

const createPaginationArticles = ({ allStrapiArticles }, createPage) => {
	var groupsItems = [];
	allStrapiArticles.group.map((group) => {
		groupsItems.push(group.totalCount);
	});
	const groupMaxItems = Math.max(...groupsItems);
	const pageCount = Math.ceil(groupMaxItems / articlePerPage);
	return Array.from({ length: pageCount }).map((_, index) =>
		createPage({
			path: index === 0 ? `/articles` : `/articles/${index + 1}`,
			component: path.resolve(`./src/templates/articles.js`),
			context: {
				skip: index * articlePerPage,
				limit: articlePerPage,
				pageCount,
				currentPage: index + 1,
			},
		})
	);
};

const createPaginationGallery = ({ allStrapiGalleries }, createPage) => {
	var groupsItems = [];
	allStrapiGalleries.group.map((group) => {
		groupsItems.push(group.totalCount);
	});
	const groupMaxItems = Math.max(...groupsItems);
	const pageCount = Math.ceil(groupMaxItems / articlePerPage);
	return Array.from({ length: pageCount }).map((_, index) =>
		createPage({
			path: index === 0 ? `/gallery` : `/gallery/${index + 1}`,
			component: path.resolve(`./src/templates/gallery.js`),
			context: {
				skip: index * articlePerPage,
				limit: articlePerPage,
				pageCount,
				currentPage: index + 1,
			},
		})
	);
};

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;
	const articlesQuery = await graphql(allArticlesQuery);
	const galleriesQuery = await graphql(allGalleriesQuery);

	if (articlesQuery.errors || galleriesQuery.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	const articleDetail = createDetailPages(articlesQuery.data, createPage);
	const articles = createPaginationArticles(articlesQuery.data, createPage);
	const gallery = createPaginationGallery(galleriesQuery.data, createPage);

	return [articleDetail, articles, gallery];
};
