const prisma = require("../utils/prisma");

async function create(
    name,
    description,
    price,
    image
){

    const product = await prisma.product.create({
        data: {
            name,
            description,
            price,
            image
        }
    });

    return {
        success: true,
        message: "Product berhasil dibuat!",
        product
    };
}

async function getAll(){
    const products = await prisma.product.findMany();
    
    return {
        success: true,
        products
    };
}

async function getById(id){
    const product = await prisma.product.findUnique({
        where: {
            id: Number(id)
        }
    });

    if(!product){
        return {
            success: false,
            message: "Product tidak ditemukan!"
        };
    }

    return {
        success: true,
        product
    };
}

async function update(
    id,
    name,
    description,
    price,
    image
) {
    const existingProduct = await prisma.product.findUnique({
        where: {
            id: Number(id)
        }
    });

    if(!existingProduct){
        return {
            success: false,
            message: "Product tidak ditemukan!"
        };
    }

    const product = await prisma.product.update({
        where: {
            id: Number(id)
        },
        data: {
            name,
            description,
            price,
            image
        }
    });

    if(!product){
        return {
            success: false,
            message: "Product tidak ditemukan!"
        };
    }

    return {
        success: true,
        message: "Product berhasil diupdate!",
        product
    }


}

async function remove(id){
    const existingProduct = await prisma.product.findUnique({
        where: {
            id: Number(id)
        }
    });

    if(!existingProduct){
        return {
            success: false,
            message: "Product tidak ditemukan!"
        };
    }

    const totalOrder = await prisma.orderItem   .count({
        where: {
            productId: Number(id)
        }
    });

    if(totalOrder > 0){
        return {
            success: false,
            message: "Product tidak dapat dihapus karena masih memiliki pesanan!"
        };
    }

    const produk = await prisma.product.delete({
        where: {
            id: Number(id)
        }
    });
    return {
        success: true,
        message: "Product berhasil dihapus!"
    };
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};