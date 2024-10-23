export const onClientEntry = () => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://www.svwoltersdorf.de/wp-content/themes/twentyfourteen/style.css"; // URL des Stylesheets
    document.head.appendChild(link);
  };