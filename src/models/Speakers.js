import mongoose from "mongoose";

const SpeakerSchema = new mongoose.Schema({
    name: { type: String, required: true},
    topic: { type: String, required: true },
    note: { type: String, required: true },
    image: {
        data: Buffer,
        contentType: String
    }
});

export const SpeakerModel = mongoose.model("Speaker", SpeakerSchema);