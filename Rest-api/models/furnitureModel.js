const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const furnitureSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            "chair",
            "table",
            "bed",
            "wardrobe",
            "bedside table",
            "dresser",
            "tv stand",
            "display cabinet",
            "corner sofa",
            "sofa",
            "coffee table",
            "hocker",
            "pouf",
            "hanger"
        ]

    },
    dimensions: {
        width: {
            type: Number,
            required: true,

        },
        length: {
            type: Number,
            required: true,
        },
        depth: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
    },
    color: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true,
    },
    authorId: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Furniture', furnitureSchema);
