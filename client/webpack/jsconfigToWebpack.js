const path = require("path");

/**
 * To get alias for webpack `resolve.alias` value from `paths` at jsconfig.json `compilerOptions`
 *
 * @param {object} compilerOptions value of `jsConfig.compilerOptions` from jsconfig.json
 */

module.exports = function getWebpackAliasFromJsconfig({ paths, baseUrl }, clientPath) {
    const alias = Object.keys(paths).reduce((currentAlias, pathKey) => {
        const [aliasKey] = pathKey.split("/");
        const [pathAtJsConfig] = paths[pathKey];

        const [relativePathToDir] = pathAtJsConfig.split("/*");

        const absolutePath = path.join(clientPath, baseUrl || "", relativePathToDir);
        return {
            ...currentAlias,
            [aliasKey]: absolutePath,
        };
    }, {});

    return alias;
};
