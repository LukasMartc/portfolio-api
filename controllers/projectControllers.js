import Project from '../models/Project.js';

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        console.log(error)
    }
}

const createProject = async (req, res) => {
    const project = new Project(req.body);

    try {
        if(!req.user.admin) return res.status(401).send('No tienes permisos para realizar esta acción');
        const storedProject = await project.save();
        res.json(storedProject);
    } catch (error) {
        console.log(error);
    }
}

const updateProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if(!project) {
        const error = new Error('No encontrado');
        return res.status(404).json({ msg: error.message });
    }

    if(!req.user.admin) {
        const error = new Error('No tienes permisos para realizar esta acción');
        return res.status(401).json({ msg: error.message });
    }

    try {
        const upadatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
        res.json(upadatedProject);
    } catch (error) {
        console.log(error);
    }
}

const deleteProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if(!project) {
        const error = new Error('No encontrado');
        return res.status(404).json({ msg: error.message });
    }

    if(!req.user.admin) {
        const error = new Error('No tienes permisos para realizar esta acción');
        return res.status(401).json({ msg: error.message });
    }

    try {
        await Project.findByIdAndDelete(id);
        res.json({ success: true, msg: 'Proyecto eliminado con éxito'})
    } catch (error) {
        console.log(error);
    }
}

export { 
    getAllProjects, 
    createProject, 
    updateProject, 
    deleteProject 
}