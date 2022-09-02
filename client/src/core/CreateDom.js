import { isElement, isNode, isString, isObject, isComponent, isNumber } from "@utils/validation";

const createDom = (tagName) => {
    return (...args) => {
        const element = document.createElement(tagName);
        const appendChildren = (...children) => {
            children.forEach((child) => {
                if (isString(child) || isNumber(child)) {
                    child = document.createTextNode(child);
                }
                if (isElement(child) || isNode(child)) {
                    element.appendChild(child);
                }
                if (isComponent(child) && child.element) {
                    element.appendChild(child.element);
                }
            });
            return element;
        };

        if (isObject(args[0])) {
            const props = args[0];

            Object.entries(props).forEach(([key, val]) => {
                // key 에 event
                if (key === "event") {
                    return Object.entries(val).forEach((event) => {
                        element.addEventListener(...event);
                    });
                }

                // 아닐 때
                element.setAttribute(key, val);
            });

            // 인자가 object라면 children을 받을 수 있는 함수를 반환한다.
            return appendChildren;
        }

        // object가 아니라면 appendChildren()을 실행해서 반환한다.
        return appendChildren(...args);
    };
};

const proxyCreateDom = new Proxy(
    {},
    {
        get(target, property) {
            property = property.toLowerCase();
            if (property in target) {
                return Reflect.get(...arguments);
            }

            Reflect.set(target, property, createDom(property));
            return Reflect.get(...arguments);
        },
        set() {
            return false;
        },
    },
);

export const {
    a,
    abbr,
    acronym,
    address,
    applet,
    area,
    article,
    aside,
    audio,
    b,
    base,
    basefont,
    bdi,
    bdo,
    big,
    blockquote,
    body,
    br,
    button,
    canvas,
    caption,
    center,
    cite,
    code,
    col,
    colgroup,
    data,
    datalist,
    dd,
    del,
    details,
    dfn,
    dialog,
    div,
    dl,
    dt,
    em,
    embed,
    fieldset,
    figcaption,
    figure,
    footer,
    form,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    head,
    header,
    hr,
    html,
    i,
    iframe,
    img,
    input,
    ins,
    kbd,
    label,
    legend,
    lh,
    li,
    link,
    main,
    map,
    mark,
    meta,
    meter,
    nav,
    noscript,
    object,
    ol,
    optgroup,
    option,
    output,
    p,
    param,
    picture,
    pre,
    progress,
    q,
    rp,
    rt,
    ruby,
    s,
    samp,
    script,
    section,
    select,
    small,
    source,
    span,
    strong,
    style,
    sub,
    summary,
    sup,
    svg,
    table,
    tbody,
    td,
    template,
    textarea,
    tfoot,
    th,
    thead,
    time,
    title,
    tr,
    track,
    tt,
    u,
    ul,
    video,
    wbr,
} = proxyCreateDom;

export default proxyCreateDom;
