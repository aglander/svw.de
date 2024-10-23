import "./src/styles/global.css";

export const onClientEntry = () => {
    const stylesheets = [
        "https://www.svwoltersdorf.de/wp-includes/css/dist/block-library/style.min.css?ver=6.6.2",
        "https://www.svwoltersdorf.de/wp-content/themes/twentyfourteen/fonts/font-lato.css?ver=20230328",
        "https://www.svwoltersdorf.de/wp-content/themes/twentyfourteen/style.css?ver=20240716",
        "https://www.svwoltersdorf.de/wp-content/themes/twentyfourteen/css/blocks.css?ver=20240613"
    ];

    stylesheets.forEach(href => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
    });
};