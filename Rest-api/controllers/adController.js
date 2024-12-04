const { Ad } = require('../models/adModel');
const userModel = require('../models/userModel');

async function getAll() {
    return Ad.find().lean();
}

async function getById(id) {
    return Ad.findById(id).lean();
}

async function create(data, authorId) {
    const record = new Ad({
        adName: data.adName,
        price: data.price,
        dimensions: {
            width: data.dimensions.width,
            length: data.dimensions.length,
            depth: data.dimensions.depth,
            height: data.dimensions.height
        },
        color: data.color,
        material: data.material,
        weight: data.weight,
        author: authorId,
    });
    try {
        await record.save();
        return record;
    } catch (err) {
        console.error('Error saving record:', err);
        throw new Error('Unable to save record');
    }
}

async function update(id, data, userId) {
    const record = await Ad.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied')
    }
    record.adName = data.adName;
    record.price = data.price;
    record.dimensions = {
        width: data.dimensions.width,
        length: data.dimensions.length,
        depth: data.dimensions.depth,
        height: data.dimensions.height
    },
        record.color = data.color;
    record.material = data.material;
    record.weight = data.weight;

    await record.save();
    return record;
}


async function deleteById(id, userId) {
    const record = await Ad.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied')
    }

    await Ad.findByIdAndDelete(id);
}

async function addToCart(req, res, next) {
    const userId = req.user._id;
    const { itemId, quantity } = req.body;

    if (!itemId || (quantity !== undefined && quantity <= 0)) {
        return res.status(400).json({ message: 'Invalid item ID or quantity' });
    }

    try {

        const item = await Ad.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItem = user.cart.find(item => item.itemId.toString() === itemId);
        if (cartItem) {
            cartItem.quantity += quantity || 1;
        } else {
            user.cart.push({ itemId, quantity: quantity || 1 });
        }

        const updatedUser = await user.save();
        res.status(200).json({
            cart: updatedUser.cart,
            message: 'Item successfully added to cart'
        });
    } catch (err) {
        next(err);
    }
}
module.exports = { getAll, getById, update, deleteById, addToCart, create }