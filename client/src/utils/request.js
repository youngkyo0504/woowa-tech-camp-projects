const { protocol, hostname, port } = window.location;
const isProduction = process.env.NODE_ENV == "production";
const urlPort = port ? `:${port}` : "";
const BASE_URL = `${protocol}//${hostname}${isProduction ? urlPort : ":3000"}/api`;

const customFetch =
    (method) =>
    async ({ url, query, body = {}, headerOptions, options }) => {
        const query_string = query
            ? `?${Object.entries(query)
                  .reduce((prev, [key, value]) => [...prev, `${key}=${value}`], [])
                  .join("&")}
            `
            : "";

        const init = {
            ...(options ?? {}),
            method,
            headers: {
                ...(headerOptions ?? { "Content-Type": "application/json" }),
            },
        };

        if (method !== "GET") {
            if (body.toString() === "[object FormData]") {
                init.body = body;
            } else {
                init.body = JSON.stringify(body);
            }
        }

        try {
            const response = await fetch(`${BASE_URL}${url}${query_string}`, init);
            // const { status } = response;

            // response.ok = 200~299
            if (!response.ok) {
                throw new Error("network error");
            }

            const result = await response.json();

            return result;
        } catch (error) {
            // TODO: custom error
        }
    };

const request = {
    get: customFetch("GET"),
    post: customFetch("POST"),
    patch: customFetch("PATCH"),
    delete: customFetch("DELETE"),
};

export default request;
