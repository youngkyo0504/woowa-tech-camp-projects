import svgDomCreator from "@utils/svgDomCreator";

const downArrowIcon = (color = "#8D9393", width = 16, height = 17) => {
    return svgDomCreator(`
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 16 17" fill="none">
            <path d="M4 6.5L8 10.5L12 6.5" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `);
};

export default downArrowIcon;
