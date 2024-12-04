const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const adSchema = new mongoose.Schema({
    adName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dimensions: {
        width: {
            type: Number,
            required: true,
            min: 0,
        },
        length: {
            type: Number,
            required: true,
            min: 0,
        },
        depth: {
            type: Number,
            required: true,
            min: 0,
        },
        height: {
            type: Number,
            required: true,
            min: 0,
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
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "User"
    },
}, { timestamps: { createdAt: 'created_at' } });

const Ad = mongoose.model('Ad', adSchema);
module.exports = { Ad };
