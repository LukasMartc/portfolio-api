import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true},
    image: { type: String, require: true },
    techs: { type: String, require :true },
    website: { type: String, require: true },
    frontend: { type: String, require: true },
    backend: { type: String, default: '', unique: false }
}, {
    timestamps: true
})

const Project = mongoose.model('project', projectSchema);

export default Project;