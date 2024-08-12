import express from 'express';
import { verifyToken } from '../Auth.js';
import mongoose from 'mongoose';
import multer from 'multer';
import { SpeakerModel } from "../models/Speakers.js"

const SpeakerRoutes = express.Router();

express().use(express.static('./src/Files'));
express().use(express.urlencoded({extended: false}));
express().set('view engine', 'ejs')

const store = multer.memoryStorage();
const upload = multer({ storage: store });

SpeakerRoutes.get('/', verifyToken, async (req, res) => {
    try {
        const result = await SpeakerModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

SpeakerRoutes.get("/:speakerid", verifyToken, async (req, res) => {
    try {
      const result = await SpeakerModel.findById(req.params.speakerid);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});

SpeakerRoutes.post("/", verifyToken, upload.single("image"), async (req, res) => {
    const speaker = new SpeakerModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        topic: req.body.topic,
        note: req.body.note,
        image: { 
            data: req.file.buffer,
            contentType: req.file.mimetype 
        }
    });
    try {
        const result = await speaker.save();
        res.status(201).json({
            new_speaker: {
                name: result.name,
                topic: result.topic,
                note: result.note,
                image: result.image,
                _id: result._id
            }
        });
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

SpeakerRoutes.put("/:speakerid", verifyToken, upload.single("image"), async(req, res) => {
    try {
        const speaker = req.params.speakerid;
        const updatedData = req.body;
        const options = { new: true };

        const result = await SpeakerModel.findByIdAndUpdate(
            { _id: speaker}, updatedData, options
        )
        res.status(200).json(result);
        console.log(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

SpeakerRoutes.delete("/:speakerid", verifyToken, async (req, res) => {
    try {
        const speaker = req.params.speakerid;
        const deletedSpeaker = req.body;
        const options = {new: false}
        const result = await SpeakerModel.findByIdAndDelete(
            {_id: speaker}, deletedSpeaker, options
        )
        res.status(200).json(result);
        console.log(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
})

export default SpeakerRoutes;