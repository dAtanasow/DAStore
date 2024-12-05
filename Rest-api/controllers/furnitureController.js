const { furnitureModel } = require('../models');

async function getAll(req, res, next) {
    furnitureModel.find()
        .populate('userId')
        .then(furniture => res.json(furniture))
        .catch(next);
}


async function getById(req, res, next) {
    const { furnitureId } = req.params;
    try {
        const furniture = await furnitureModel.findById(furnitureId)
            .populate('userId');
        if (!furniture) {
            return res.status(404).json({ message: 'Furniture not found' });
        }
        res.json(furniture);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    const { img, name, price, dimensions, color, material, weight } = req.body;

    if (!dimensions || !dimensions.height || !dimensions.depth || !dimensions.length || !dimensions.width) {
        return res.status(400).json({ message: 'All dimension fields are required!' });
    }
    const { height, depth, length, width } = dimensions;

    try {
        const newFurniture = await furnitureModel.create({ img, name, price, dimensions: { height, depth, length, width }, color, material, weight, userId: req.user._id });
        res.status(201).json(newFurniture);
    } catch (err) {
        next(err);
    }
}
async function update(req, res, next) {
    const { furnitureId } = req.params;
    const { img, name, price, dimensions, color, material, weight } = req.body;
    const { _id: userId } = req.user;

    try {

        const updatedFurniture = await furnitureModel.findOneAndUpdate(
            { _id: furnitureId, userId },
            { img, name, price, dimensions, color, material, weight },
        );

        if (!updatedFurniture) {
            return res.status(404).json({ message: "Furniture not found or you don't have permission to update it." });
        }

        res.status(200).json(updatedFurniture);
    } catch (err) {
        next(err);
    }
}


async function deleteById(req, res, next) {
    const { furnitureId } = req.params;
    const { _id: userId } = req.user;

    try {

        const deletedFurniture = await furnitureModel.findOneAndDelete({
            _id: furnitureId,
            userId,
        });

        if (!deletedFurniture) {
            return res.status(404).json({ message: "Furniture not found or you don't have permission to delete it." });
        }

        res.status(200).json({ message: "Furniture deleted successfully!" });
    } catch (err) {
        next(err);
    }
}
async function getUserCart(req, res, next) {
    const { _id: userId } = req.user;

    try {
        const cartItems = await furnitureModel.find({ cartUserIds: userId });
        res.status(200).json(cartItems);
    } catch (err) {
        next(err);
    }
}

async function addToCart(req, res, next) {
    const { furnitureId } = req.body;
    const { _id: userId } = req.user;

    try {
        const furniture = await furnitureModel.findById(furnitureId);

        if (!furniture) {
            return res.status(404).json({ message: "Furniture not found." });
        }

        if (furniture.cartUserIds.includes(userId)) {
            return res.status(400).json({ message: "Furniture already in cart." });
        }

        furniture.cartUserIds.push(userId);
        await furniture.save();

        res.status(200).json({ message: "Furniture added to cart successfully!" });
    } catch (err) {
        next(err);
    }
}
module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    addToCart,
    getUserCart
}