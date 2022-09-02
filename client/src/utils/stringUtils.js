export const getPageFromPath = (string) => {
    const pathStrings = string.split("/");
    const page = pathStrings[1] ?? "";
    return page;
};
