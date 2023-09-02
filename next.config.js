const withImages = require("next-images");
module.exports = withImages({
	i18n: {
		locales: ["id", "en"],
		defaultLocale: "id",
		localeDetection: false,
	},
	images: {
		disableStaticImages: true,
		domains: [

		],
	},
});
