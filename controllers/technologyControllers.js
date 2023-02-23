import Technology from "../models/Technology.js";

const getAllTechnologies = async (req, res) => {
    try {
        const technology = await Technology.find();
        res.json(technology);
    } catch (error) {
        console.log(error)
    }
}

const createTechnology = async (req, res) => {
    const technology = new Technology(req.body);

    try {
        if(!req.user.admin) return res.status(401).send('No tienes permisos para realizar esta acción');
        const storedTechnology = await technology.save();
        res.json(storedTechnology);
    } catch (error) {
        console.log(error);
    }
}

const updateTechnology = async (req, res) => {
    const { id } = req.params;

    const technology = await Technology.findById(id);

    if(!technology) {
        const error = new Error('No encontrado');
        return res.status(404).json({ msg: error.message });
    }

    if(!req.user.admin) {
        const error = new Error('No tienes permisos para realizar esta acción');
        return res.status(401).json({ msg: error.message });
    }

    try {
        const upadatedTechnology = await Technology.findByIdAndUpdate(id, req.body, { new: true });
        res.json(upadatedTechnology);
    } catch (error) {
        console.log(error);
    }
}

const deleteTechnology = async (req, res) => {
    const { id } = req.params;

    const technology = await Technology.findById(id);

    if(!technology) {
        const error = new Error('No encontrado');
        return res.status(404).json({ msg: error.message });
    }

    if(!req.user.admin) {
        const error = new Error('No tienes permisos para realizar esta acción');
        return res.status(401).json({ msg: error.message });
    }

    try {
        await Technology.findByIdAndDelete(id);
        res.json({ success: true, msg: 'Tecnología eliminada con éxito'})
    } catch (error) {
        console.log(error);
    }
}

export {
    getAllTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology
 }