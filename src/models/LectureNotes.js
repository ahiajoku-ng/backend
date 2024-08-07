import mongoose from "mongoose";

const LectureNotesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    note: { type: String, required: true },
    coverImage: {
        data: Buffer,
        contentType: String
    },
});

export const LectureNotesModel = mongoose.model("Lecture notes", LectureNotesSchema);