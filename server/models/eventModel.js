import { Schema, model} from 'mongoose';
import crypto from "crypto";

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true,
        trim: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
   
    secretKey:{
        type: String,
        default: function () {
            return crypto.randomBytes(16).toString("hex")
         },
    }
});

const Ievent = model("ievents", eventSchema); // Event-specific schema

export default Ievent;
