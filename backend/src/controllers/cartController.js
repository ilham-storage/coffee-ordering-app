const cartService = require("../services/cartService");

async function addToCart(req, res){
    const userId = req.user.id;

    const {
        productId,
        quantity
    } = req.body;

    if(!productId){
        return res.status(400).json({
            success: false,
            message: "Product ID haraus diisi!"
        });
    }

    if(!quantity){
        return res.status(400).json({
            success: false,
            message: "Quantity haraus diisi!"
        });
    }

    if(isNaN(quantity)){
        return res.status(400).json({
            success: false,
            message: "Quantity harus angka!"
        });
    }

    if(quantity <= 0){
        return res.status(400).json({
            success: false,
            message: "Quantity tidak boleh kurang dari nol!"
        });
    }

    const result = await cartService.addToCart(
        userId,
        productId,
        quantity
    );

    if(!result.success){
        return res.status(400).json(result);
    }

    res.status(200).json(result);
}

async function getCart(req, res){
    const userId = req.user.id;

    const result = await cartService.getCart(
        userId
    );
    res.status(200).json(result);  
}


async function updateQuantity(req, res){
    const { id } = req.params;
    const { quantity } = req.body;

    if(!quantity){
        return res.status(400).json({
            success: false,
            message: "Quantity harus diisi!"
        });
    }

    if(isNaN(quantity)){
        return res.status(400).json({
            success: false,
            message: "Quantity harus angka!"
        });
    }

    if(quantity <= 0){
        return res.status(400).json({
            success: false,
            message: "Quantity tidak boleh kurang dari nol!"
        });
    }

    const result = await cartService.updateQuantity(
        id,
        quantity
    );
    
    if(!result.success){
        return res.status(400).json(result);
    }
    res.status(200).json(result);
}
module.exports = {
    addToCart,
    getCart,
    updateQuantity
}