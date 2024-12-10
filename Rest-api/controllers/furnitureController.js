const { furnitureModel, userModel } = require('../models');


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

async function getByCategory(req, res, next) {
    const { category } = req.params;

    try {
        const furnitureItems = await furnitureModel.find({ category: category });

        if (!furnitureItems || furnitureItems.length === 0) {
            return res.status(200).json({ message: 'No furniture found in this category', data: [] });
        }

        res.json(furnitureItems);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {

    const { img, name, price, category, dimensions, color, material, weight } = req.body;
    console.log(category);
    

    if (!dimensions || Object.values(dimensions).some(value => value === 0)) {
        console.log('Dimensions validation failed');
        return res.status(400).json({ message: 'All dimension fields must be provided and cannot be zero!' });
    }

    try {
        const newFurniture = await furnitureModel.create({
            img, name, price, category, dimensions, color, material, weight, authorId: req.user._id
        });

        const updatedUser = await userModel.findById(req.user._id);

        if (updatedUser) {
            updatedUser.ads.push(newFurniture._id);
            await updatedUser.save();

            res.status(201).json(newFurniture);
        } else {
            console.log('User not found');
            return res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error('Error creating furniture:', err);
        next(err);
    }
}

async function update(req, res, next) {
    const { img, furnitureId, name, price, category, dimensions, color, material, weight } = req.body;
    const { _id: userId } = req.user;

    try {

        if (!furnitureId || !userId) {
            return res.status(400).json({ message: 'Invalid request data.' });
        }

        const updatedFurniture = await furnitureModel.findOneAndUpdate(
            { _id: furnitureId, authorId: userId },
            { img, name, price, category, dimensions, color, material, weight }
        );

        if (!updatedFurniture) {
            return res.status(404).json({
                message: "Furniture not found or you don't have permission to update it.",
            });
        }

        res.status(200).json(updatedFurniture);
    } catch (err) {
        console.error('Update Error:', err);
        next(err);
    }
}


async function deleteById(req, res, next) {
    const userId = req.user._id;
    const furnitureId = req.params.furnitureId;

    try {
        const deletedFurniture = await furnitureModel.findOneAndDelete({
            _id: furnitureId,
            authorId: userId,
        });

        if (!deletedFurniture) {
            return res.status(404).json({ message: "Furniture not found or you don't have permission to delete it." });
        }

        res.status(200).json({ message: "Furniture deleted successfully!" });
    } catch (err) {
        console.error('Error deleting furniture:', err);
        next(err);
    }
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getByCategory
}