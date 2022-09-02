const checkPaymentMethodTable = (pool) => {
    console.log("PAYMENT_METHOD TABLE CHECK...");

    return pool
        .execute(
            `
            CREATE TABLE IF NOT EXISTS payment_method  (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(30)
            );
        `,
        )
        .then(() => {
            console.log("PAYMENT_METHOD TABLE CHECKED!");
        })
        .catch(console.log);
};

module.exports = checkPaymentMethodTable;
