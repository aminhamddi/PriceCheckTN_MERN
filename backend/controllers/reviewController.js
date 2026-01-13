const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');
const Product = require('../models/Product');
const { analyzeReview } = require('../utils/aiService');

// @desc    Créer un nouvel avis
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Produit introuvable');
    }

    // 1. Vérifier si l'utilisateur a déjà commenté ce produit
    const alreadyReviewed = await Review.findOne({
        product: req.params.id,
        user: req.user._id // Viendra du middleware d'auth
    });

    if (alreadyReviewed) {
        res.status(400);
        throw new Error('Vous avez déjà noté ce produit');
    }

    // 2. APPEL IA : Vérification du texte
    console.log("Analyse IA en cours...".yellow);
    const aiResult = await analyzeReview(comment);

    // Logique de décision
    let isFake = false;
    let confidence = 0;

    if (aiResult) {
        if (aiResult.prediction === 'CG' || aiResult.prediction === 'Fake') {
            isFake = true;
        }
        confidence = aiResult.confidence;
    }

    // 3. Création de la review
    const review = await Review.create({
        user: req.user._id,
        product: req.params.id,
        rating: Number(rating),
        comment,
        verification: {
            isFake,
            confidence,
            analyzedAt: Date.now()
        }
    });
    res.status(201).json({
        message: 'Avis ajouté',
        aiAnalysis: aiResult // On renvoie l'analyse au front pour afficher un badge
    });
});

module.exports = { createProductReview };