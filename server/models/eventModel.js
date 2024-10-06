import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },

  // createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, required: true },  
  endDateTime: { type: Date },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" }, // Reference to Category model
  organizer: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to User model
}, { timestamps: true },);

const Ievents = model("Ievents", eventSchema);

export default Ievents;
