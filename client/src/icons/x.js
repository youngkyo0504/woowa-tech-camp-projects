import svgDomCreator from "@utils/svgDomCreator";

const xIcon = (color = "#8D9393", width = 16, height = 16) => {
    return svgDomCreator(`
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 16 16" fill="none">
        <path
            d="M12 4L4 12"
            stroke="${color}"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M4 4L12 12"
            stroke="${color}"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        </svg>;
    `);
};

export default xIcon;
