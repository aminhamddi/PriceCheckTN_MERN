const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Récupérer tous les produits
// @route   GET /api/products?keyword=MSI&pageNumber=1
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 12; // 12 Laptops par page
    const page = Number(req.query.pageNumber) || 1;

    // Gestion de la recherche
    const keyword = req.query.keyword
        ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i', // Case insensitive
            },
        }
        : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Récupérer un produit par ID
// @route   GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('reviews');

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Produit non trouvé');
    }
});

module.exports = { getProducts, getProductById };