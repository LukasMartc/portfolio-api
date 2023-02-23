import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    link: { type: String, require: true }
}, {
    timestamps: true
})

const Technology = mongoose.model('technologies', technologySchema);

export default Technology