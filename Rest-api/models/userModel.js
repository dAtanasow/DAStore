const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [5, 'Username should be at least 5 characters'],
        trim: true, 
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9]+$/.test(v);
            },
            message: props => `${props.value} must contain only Latin letters and digits!`
        },
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
               
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `Invalid email format!`
        },
    },
    phone: {
        type: String,
        required: false,
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^0\d{9}$/.test(v); 
            },
            message: props => `Invalid phone format!`
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [5, 'Password should be at least 5 characters'],
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9]+/.test(v);
            },
            message: props => `${props.value} must contain only Latin letters and digits!`
        },
    },
    ads: [{
        type: ObjectId,
        ref: "Furniture"
    }],
    cart: [{
        type: ObjectId,
        ref: "Furniture"
    }],
}, { timestamps: { createdAt: 'created_at' } });

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);