const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    // Relation avec l'utilisateur (Qui a posté ?)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    // Relation avec le produit (Sur quel PC ?)
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    // La partie IA : Stockage du verdict de FastAPI
    verification: {
        isFake: { type: Boolean, default: false },
        confidence: { type: Number, default: 0 },
        analyzedAt: { type: Date }
    }
}, {
    timestamps: true, // Ajoute createdAt et updatedAt
});

module.exports = mongoose.model('Review', reviewSchema);