const express = require("express");
const router = express.Router();
const HistoryService = require("../services/history");

router.post("/", async (req, res, next) => {
    try {
        const { body } = req;
        const data = await HistoryService.addHistory(body);
        return res.send(data);
    } catch (e) {
        next(e);
    }
});

router.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const data = await HistoryService.editHistory(id, body);
        return res.send(data);
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        await HistoryService.deleteHistory(id);
        return res.send({ message: "Successfully Deleted" });
    } catch (e) {
        next(e);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const { date } = req.query;

        const histories = await HistoryService.getHistoryByMonth(date);
        return res.send({ histories });
    } catch (e) {
        next(e);
    }
});

router.get("/statistic", async (req, res, next) => {
    try {
        const { category: categoryId, date } = req.query;

        const statistics = await HistoryService.getHistoryRecentSum(categoryId, date);
        return res.send({ statistics });
    } catch (e) {
        next(e);
    }
});

router.get("/expenditure", async (req, res, next) => {
    try {
        const { category: categoryId, date } = req.query;

        const histories = await HistoryService.getExpenditureByCategory(categoryId, date);
        return res.send({ histories });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
