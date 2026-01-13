const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'TND' },
    brand: { type: String, default: 'AUTRE' },
    image: { type: String },
    link: { type: String },
    source: { type: String },
    inStock: { type: Boolean, default: true },
    specs: {
        cpu: { type: String },
        gpu: { type: String },
        ram: { type: String },
        storage: { type: String }
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

productSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false
});

module.exports = mongoose.model('Product', productSchema);