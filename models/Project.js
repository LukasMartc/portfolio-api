import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true},
    image: { type: String, require: true },
    techs: { type: String, require: true },
    website: { type: String, require: true },
    frontend: { type: String, require: true },
    backend: String,
}, {
    timestamps: true
})

const Project = mongoose.model('projects', projectSchema);

export default Project;