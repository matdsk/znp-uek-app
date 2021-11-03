module.exports = {
	siteMetadata: {
		siteUrl: 'https://znp-uek-app.netlify.app',
		title: 'znp uek app',
	},
	plugins: [
		`gatsby-plugin-image`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: `${__dirname}/src/images/`,
			},
			__key: 'images',
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/locales`,
				name: `locale`,
			},
		},
		{
			resolve: `gatsby-plugin-react-i18next`,
			options: {
				localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
				languages: [`pl`, `en`],
				defaultLanguage: `pl`,

				// you can pass any i18next options
				// pass following options to allow message content as a key
				i18nextOptions: {
					interpolation: {
						escapeValue: false, // not needed for react as it escapes by default
					},
					keySeparator: false,
					nsSeparator: false,
				},
			},
		},
		{
			resolve: `gatsby-source-strapi`,
			options: {
				apiURL: process.env.DEPLOY_URL
					? `https://uek-znp-api.herokuapp.com`
					: `http://localhost:1337`,
				queryLimit: 3000, // Defaults to 100
				collectionTypes: [
					{
						name: `articles`,
						api: { qs: { _locale: `all` } },
					},
					{
						name: `galleries`,
						api: { qs: { _locale: `all` } },
					},
					{
						name: `sliders`,
						api: { qs: { _locale: `all` } },
					},
					{
						name: `seos`,
						api: { qs: { _locale: `all` } },
					},
					{
						name: `members`,
						api: { qs: { _locale: `all` } },
					},
					{
						name: `contacts`,
						api: { qs: { _locale: `all` } },
					},
					{
						name: `download-files`,
						api: { qs: { _locale: `all` } },
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: [`Poppins:300,400,600,700`],
				display: 'swap',
			},
		},
		{
			resolve: `gatsby-plugin-breadcrumb`,
			options: {
				// defaultCrumb: optional To create a default crumb
				// see Click Tracking default crumb example below
				defaultCrumb: {
					location: {
						pathname: '/',
					},
					crumbLabel: 'Strona Główna',
					crumbSeparator: '',
				},
			},
		},
		'gatsby-plugin-offline',
	],
};
