import request from "@utils/request";

export async function getAllCategories() {
    return await request.get({ url: "/category" });
}
