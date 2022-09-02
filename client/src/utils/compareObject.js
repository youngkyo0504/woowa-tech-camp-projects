/* eslint-disable no-prototype-builtins */
export const compareObjects = (object1, object2) => {
    const properties = new Set([...Object.keys(object1), ...Object.keys(object2)]);
    const sameKeys = [...properties].filter(
        (p) => object1.hasOwnProperty(p) && object2.hasOwnProperty(p),
    );
    return sameKeys.every((key) => object1[key] == object2[key]);
};
