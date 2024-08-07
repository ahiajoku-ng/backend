import mongoose from "mongoose";

const LecturerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    biography: { type: String, required: true },
    picture: {
        data: Buffer,
        contentType: String
    },
});

export const LecturerModel = mongoose.model("Lecturer", LecturerSchema);