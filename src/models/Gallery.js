import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        data: Buffer,
        contentType: String
    }
});

export const GalleryModel = mongoose.model("Gallery", GallerySchema);