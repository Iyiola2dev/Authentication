import { Schema, model } from "mongoose";

const imageSchema = new Schema({
  imageUrl: { type: String, required: true },
});

const Imageurl = model( "image",imageSchema)

export default Imageurl