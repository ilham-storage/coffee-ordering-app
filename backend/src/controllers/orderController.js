const orderService = require('../services/orderService');

async function checkout(req, res) {
    const userId = req.user.id;

    const result = await orderService.checkout(userId);

    if (result.success) {
        return res.status(200).json(result);
    }

    res.status(400).json(result);
}

async function getMyOrders(req, res) {

    const userId = req.user.id;

    const result = await orderService.getMyOrders(
        userId
    );

    res.status(200).json(result);
}

async function getMyOrdersById(req, res){

    const userId = req.user.id;
    const orderId = req.params.id;

    const result = await orderService.getOrderById(
        userId,
        orderId
    );

    if(!result.success) {
        return res.status(404).json(result);
    }

    res.status(200).json(result);
}

async function updateOrderStatus(req, res) {
    const orderId = req.params.id;
    const { status } = req.body;

    const result = await orderService.updateOrderStatus(
        orderId,
        status
    );

    if (!result.success) {
        return res.status(404).json(result);
    }   
    
    res.status(200).json(result);
}
module.exports = {
    checkout,
    getMyOrders,
    getMyOrdersById,
    updateOrderStatus
};