import User from "../models/User.js";

const createAdmin = async (req, res) =>{
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    
    if(existingUser) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        const storedUser = await user.save();
        res.json(storedUser)
    } catch (error) {
        console.log(error);
    }
}

export {
    createAdmin,
}