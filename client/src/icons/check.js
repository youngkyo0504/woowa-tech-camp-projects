import svgDomCreator from "@utils/svgDomCreator";

const checkIcon = (color = "#222222", width = 24, height = 24) => {
    return svgDomCreator(`
        <svg xmlns="http://www.w3.org/2000/svg"  stroke="${color}" width="${width}" height="${height}" viewBox="0 0 24 24" fill="none">
            <path d="M21 6L8.625 18L3 12.5455" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `);
};

export default checkIcon;
