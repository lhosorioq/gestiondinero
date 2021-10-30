import jwt from 'jsonwebtoken'
import User from "../models/userModel";
import config from '../config'

// Agregar usuario 
export const createUser = async (req, res) => {
    
    try {
        const { username, email, password, movimientos, category, concepts } = req.body;
        const user = new User({
            username,
            email,
            password,
            movimientos,
            category,
            concepts
        })

        // Encryptando contraseña
        user.password = await user.encryptPassword(password);

        await user.save();

        // Creando un token
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 60 * 60 * 2, //Expira en 2 horas 
        });

        res.status(200).json({ auth: true, token });
    } catch (err) {
        
        return res.status(500).json({
            mensaje: "Ocurrio un error",
            err
        });

    }
};

// Consultar base de datos con parametros id
export const getUserId = async (req, res) =>{
    
    const _id = req.params.id;

    try {
        
        const registro = await User.findOne({_id});
        res.json(registro);

    } catch (err) {
        
        return res.status(400).json({
            mensaje: "Ocurrio un error",
            err
        });
        
    }
};

// Consulta base de datos por email y password 
export const getUserMailPassword = async (req, res) =>{
    
    const user = await User.findOne({ email: req.body.email });

    // Verifico si se encontro usuario con ese correo
    if (!user) {
        return res.status(404).send("The email doesn't exists");
    }

    // Se valida contraseña
    const validPassword = await user.comparePassword(req.body.password, user.password);

    // Si la validacion es incorrecta
    if(!validPassword) {
        return res.status(401).send({ auth: false, token: null});
    }

    const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 60 * 60 * 2});
    res.status(200).json({ auth: true, token, user }); 
};

// Consultar base de datos todos los documentos 
export const getUsers = async (req, res) => {
    
    try {
        
        const registro = await User.find();
        res.json(registro);

    } catch (err) {
        
        return res.status(400).json({
            mensaje: "Ocurrio un error",
            err
        });

    }
};

// Cargar movimientos de usuario 
export const getMovId = async (req, res) => {
        
    const _id = req.params.id;
    const body = req.body;

    try {
        const userDB = await User.findByIdAndUpdate(
            _id,
            { $push: { 'movimientos': body } },
            {new: true});
        res.json(userDB);

    } catch (err) {
        
        return res.status(400).json({
            mensaje: "Ocurrio un error",
            err
        });

    }
};

// Eliminar movimientos de usuario 
export const removeMoveId = async (req, res) => {
        
    const _id = req.params.id;
    const body = req.body;

    try {
        
        const userDB = await User.findByIdAndUpdate(
            _id,
            { $pull: { 'movimientos': {'category': body.category, 'concept':body.concept, 'value':body.value, 'observation': body.observation}} },
            {new: true});
        res.json(userDB);

    } catch (err) {
        
        return res.status(400).json({
            mensaje: "Ocurrio un error",
            err
        });

    }
};

// Actualizar movimientos de usuario 
export const updateMoveId = async (req, res) => {
        
    const _id = req.params.id;
    const body = req.body;
    const envio = `movimientos.${body.index}`;

    try {
        
        const userDB = await User.findByIdAndUpdate(
            _id,
            { $set: { [envio] : body.item} },
            {new: true});
        res.json(userDB);

    } catch (err) {
        
        return res.status(400).json({
            mensaje: "Ocurrio un error",
            err
        });

    }
};

// Eliminar usuario 
export const deleteUser = async (req, res) =>{ 

    const _id = req.params.id;
    
    try {
        
        const registro = await User.findByIdAndDelete({_id});
        if (!registro) {
            
            return res.status(404).json({
                mensaje: "No se encontro usuario",
                err
            })
        }
        res.json(registro);


    } catch (err) {
        
        return res.status(400).json({
            mensaje: "Ocurrio un error",
            err
        });

    }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
    
    const _id = req.params.id;

    const { username, email, password, movimientos, category, concepts } = req.body;
    
    const user = new User({
        username,
        email,
        password,
        movimientos,
        category,
        concepts
    })

    // Encryptando contraseña
    user.password = await user.encryptPassword(password);

    const body = {
        username: user.username,
        email: user.email,
        password: user.password,
        movimientos: user.movimientos,
        category: user.category,
        concepts: user.concepts,
    }

    try {
        
        const registro = await User.findByIdAndUpdate(
            _id,
            body,
            {new: true}
        );
        res.json(registro);


    } catch (err) {
        
        return res.status(400).json({
            mensaje: "Ocurrio un error",
            err
        });

    }
};

// Actualizar un usuario
export const updateUserMovement = async (req, res) => {
    
    const _id = req.params.id;

    const { username, email, movimientos, category, concepts } = req.body;
    
    const user = new User({
        username,
        email,
        movimientos,
        category,
        concepts
    })


    const body = {
        username: user.username,
        email: user.email,
        movimientos: user.movimientos,
        category: user.category,
        concepts: user.concepts,
    }

    try {
        
        const registro = await User.findByIdAndUpdate(
            _id,
            body,
            {new: true}
        );
        res.json(registro);


    } catch (err) {
        
        return res.status(400).json({
            mensaje: "Ocurrio un error",
            err
        });

    }
};


// Logout de usuario
export const logout = async (req, res) => {
    res.status(200).send({ auth: false, token: null });
};