const orderService = require('../services/orderService');

async function checkout(req, res) {
    const userId = req.user.id;

    const result = await orderService.checkout(userId);

    if (result.success) {
        return res.status(200).json(result);
    }

    res.status(400).json(result);
}

module.exports = {
    checkout
};