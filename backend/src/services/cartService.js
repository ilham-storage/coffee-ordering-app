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

async function updateQuantity(
    cartItemId,
    quantity
) {
    const cartItem = await prisma.cartItem.findUnique({
        where: {
            id: Number(cartItemId)
        }
    });

    if(!cartItem){
        return {
            success: false,
            message: "Cart item tidak ditemukan!"
        };
    }

    const updatedCartItem = await prisma.cartItem.update({
        where: {
             id: Number(cartItemId) 
            },
        data: {
             quantity 
            }
    });

    return {
        success: true,
        message: "Quantity sukses diperbarui!",
        cartItem: updatedCartItem
    };
}

async function deleteCartItem (
    cartItemId
) {
    const cartItem = await prisma.cartItem.findUnique({
        where: {
            id: Number(cartItemId)
        }
    });

    if(!cartItem){
        return {
            success: false,
            message: "Cart item tidak ditemukan!"
        };
    }

    const deletedCartItem = await prisma.cartItem.delete({
        where: {
            id: Number(cartItemId)
        }
    });

    return {
        success: true,
        message: "Item removed from cart",
        cartItem: deletedCartItem
    };
}
module.exports = {
    addToCart,
    getCart,
    updateQuantity,
    deleteCartItem
}
