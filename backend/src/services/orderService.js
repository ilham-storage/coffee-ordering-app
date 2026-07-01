const prisma = require("../utils/prisma");

async function checkout(userId) {

    const cartItems = await prisma.cartItem.findMany({
        where : {
            userId
        },
        include: {
            product: true
        }
    });

    if(cartItems.length === 0){
        return {
            success: false,
            message: "Keranjang kosong!"
        };
    }

    let totalPrice = 0;
    for(let i = 0; i < cartItems.length; i++){
        totalPrice +=
            cartItems[i].quantity*
            cartItems[i].product.price;
    }

    const order = await prisma.order.create({
        data: {
            userId,
            totalPrice,
            orderItems: {
                create: cartItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price
                }))
            }
        },
        include: {
            orderItems: true
        }
    });

    await prisma.cartItem.deleteMany({
        where: {
            userId
        }
    });

    return {
        success: true,
        message: "Checkout berhasil!",
        order
    };
}

async function getMyOrders(userId) {
    const orders = await prisma.order.findMany({
        where : {
            userId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    return {
        success: true,
        message: "Berhasil mendapatkan pesanan",
        orders
    }
}

async function getOrderById(
    userId,
    orderId
) {
    const order = await prisma.order.findFirst({
        where: {
            id: Number(orderId),
            userId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    if(!order) {
        return {
            success: false,
            message: "Pesanan tidak ditemukan"
        };
    }

    return {
        success: true,
        message: "Berhasil mendapatkan pesanan",
        order
    };
}

module.exports = {
    checkout,
    getMyOrders,
    getOrderById
};