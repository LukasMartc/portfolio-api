import User from '../models/User.js';
import generateJWT from '../helpers/generateJWT.js';

const createAdmin = async (req, res) =>{
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    
    // Check if user exists
    if(existingUser) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        user.admin = true;
        const storedUser = await user.save();
        res.json(storedUser);
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if(!user) {
        const error = new Error('Tu correo y/o contraseña es incorrecto/a');
        return res.status(404).json({  msg: error.message });
    }
    
    // Check if user is admin
    if(!user.admin) {
        const error = new Error('Tu cuenta no es de administrador');
        return res.status(403).json({  msg: error.message });
    }

    // Check if password is correct
    if(await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        })
    } else {
        const error = new Error('Tu correo y/o contraseña es incorrecto/a');
        return res.status(403).json({  msg: error.message });
    }
}

const verifyToken = async (req, res) => {
    const { user } = req;
    res.json(user);
}

export {
    createAdmin,
    login,
    verifyToken
}