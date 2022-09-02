const express = require("express");
const router = express.Router();
const PaymentMethodService = require("../services/paymentMethod");

router.get("/", async (req, res, next) => {
    try {
        const paymentMethods = await PaymentMethodService.getPaymentMethodAll();
        return res.send({ paymentMethods });
    } catch (e) {
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { body } = req;
        const data = await PaymentMethodService.addPaymentMethod(body);
        return res.send(data);
    } catch (e) {
        next(e);
    }
});

router.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const data = await PaymentMethodService.editPaymentMethod(id, body);
        return res.send(data);
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        await PaymentMethodService.deletePaymentMethod(id);
        return res.send({ message: "Successfully Deleted" });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
