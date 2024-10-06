import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    
})

const Category = model("Category", categorySchema);

export default Category;