const prisma = require("../utils/prisma");

async function addToCart(
    userId,
    productId,
    quantity 
) {
    const product = await prisma.product.findUnique({
        where: { 
            id: Number(productId)
        }
    });

    if (!product) {
        return {
            success: false,
            message: "Product not found",
        };
    }

    const existingCartItem = await prisma.cartItem.findFirst({
        where: {
            userId,
            productId,
        },
    });

    if (existingCartItem) {
        const updatedCartItem = await prisma.cartItem.update({
            where: { id: existingCartItem.id },
            data: {
                quantity: existingCartItem.quantity + quantity,
            },
        });

        return {
            success: true,
            message: "Product added to cart",
            cartItem: updatedCartItem,
        };
    } else {
        const newCartItem = await prisma.cartItem.create({
            data: {
                userId,
                productId,
                quantity,
            },
        });

        return {
            success: true,
            message: "Product added to cart",
            cartItem: newCartItem,
        };
    }
}

async function getCart(userId){
    const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include:{
            product: true
        }
    });
    return {
        success: true,
        cartItems
    }
}

module.exports = {
    addToCart,
    getCart
}