const express = require("express");
const router = express.Router();
const CategoryService = require("../services/category");

router.get("/", async (req, res, next) => {
    try {
        const categories = await CategoryService.getCategoryAll();
        return res.send({ categories });
    } catch (e) {
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { body } = req;
        const data = await CategoryService.addCategory(body);
        return res.send(data);
    } catch (e) {
        next(e);
    }
});

router.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const data = await CategoryService.editCategory(id, body);
        return res.send(data);
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        await CategoryService.deleteCategory(id);
        return res.send({ message: "Successfully Deleted" });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
