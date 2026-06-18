const productService = require("../services/productService");

async function create(req, res) {
    const {
        name,
        description,
        price,
        image
    } = req.body

    if(!name){
        return res.status(400).json({
            message: "Nama Produk Wajib Diisi!"
        });
    }

    if(!price){
        return res.status(400).json({
            message: "Harga Produk Wajib Diisi!"
        });
    }
    if(isNaN(price)){
        return res.status(400).json({
            message: "Harga Produk Harus Angka!"
        });
    }

    if(price <= 0){
        return res.status(400).json({
            message: "Harga Produk Tidak Boleh Kurang Dari Nol!"
        });
    }

    const result = await productService.create(
        name,
        description,
        price,
        image
    );

    res.status(201).json(result);
}

async function getAll(req, res){
    const result = await productService.getAll();

    res.status(200).json(result);
}

async function getById(req, res){
    const {id} = req.params;

    const result = await productService.getById(id);

    if(!result.success){
        return res.status(404).json(result);
    }
    
    res.status(200).json(result);
}

async function update(req, res){
    const {id} = req.params;
    const {
        name,
        description,
        price,
        image
    } = req.body;

    const result = await productService.update(
        id,
        name,
        description,
        price,
        image
    );

    if(!result.success){
        return res.status(404).json(result);
    }

    res.status(200).json(result);
}

async function remove(req, res){
    const {id} = req.params;

    const result = await productService.remove(id);

    if(!result.success){
        return res.status(404).json(result);
    }

    res.status(200).json(result);
}


module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};