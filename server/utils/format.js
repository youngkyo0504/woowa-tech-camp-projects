const snakeToCamel = (str) =>
    str
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));

const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const formatPropertyToSnake = (object) => {
    return Object.entries(object).reduce((newObject, [key, value]) => {
        const snakeKey = camelToSnakeCase(key);
        newObject[snakeKey] = value;
        return newObject;
    }, {});
};

const formatPropertyToCamel = (object) => {
    return Object.entries(object).reduce((newObject, [key, value]) => {
        const camelKey = snakeToCamel(key);
        newObject[camelKey] = value;
        return newObject;
    }, {});
};

const formatObjectById = (array) => {
    return array.reduce((resultObj, targetObj) => {
        const { id } = targetObj;
        resultObj[id] = targetObj;
        return resultObj;
    }, {});
};

module.exports = {
    snakeToCamel,
    camelToSnakeCase,
    formatPropertyToSnake,
    formatPropertyToCamel,
    formatObjectById,
};
