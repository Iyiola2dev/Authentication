import { Schema, model } from 'mongoose';
import crypto from "crypto";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        // Remove unique constraint for passwords
        // unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    secretKey: {
        type: String,
        default: function () {
            return crypto.randomBytes(16).toString("hex");
        },
    }
});

// Change the model name from "ievent" to "User"
const User = model("User", userSchema);

export default User;
