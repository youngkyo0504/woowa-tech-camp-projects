import { div } from "@core/CreateDom";

/**
 * SVG 생성 시 createElementNS 형식으로 xmlns 에 맞춰주도록 생성해야 합니다.
 * 다른 Element와는 특별한 케이스이기 때문에
 * innerHTML 로 자동 생성되는 Dom 을 이용해 SVG 를 생성하도록 합니다.
 * @param {*} string parser
 * @returns {SVGElement}  SVG DOM Element
 */
const svgDomCreator = (string) => {
    const tempDom = div();
    tempDom.innerHTML = string;
    const iconDom = tempDom.children[0];
    return iconDom;
};

export default svgDomCreator;
