import express from "express";
const router = express.Router();

import user from "../models/userModel";

// Agregar usuario 
router.post('/user-new', async (req, res) => {
    
    const body = req.body;

    try {
        
        const registro = await user.create(body);
        res.status(200).json(registro);

    } catch (err) {
        
        return res.status(500).json({
            mensaje: "Ocurrio un error",
            err
        });

    }
})

// Consultar base de datos con parametros id
router.get('/registro/:id', async (req, res) =>{
    
    const _id = req.params.id;

    try {
        
        const registro = await user.findOne({_id});
        res.json(registro);

    } catch (err) {
        
        return res.status(400).json({
            mensaje: "Ocurrio un error",
            err
        });
        
    }
});

// Consulta base de datos por email y password 
router.get('/login', async (req, res) =>{
    let correo = req.query.email;
    let contrasena = req.query.password;

    try {
        
        const registro = await user.find({email: correo, password: contrasena});
        if (registro[0].email === correo && registro[0].password === contrasena) {
            res.json((registro[0]._id).toString());
            
        }else{ 
            res.json('');
        }
        

    } catch (err) {
        
        return res.json(false);
        
    }
});

// Consultar base de datos todos los documentos 
router.get('/registro', async (req, res) => {
    
    try {
        
        const registro = await user.find();
        res.json(registro);

    } catch (err) {
        
        return res.status(400).json({
            mensaje: "Ocurrio un error",
            err
        });

    }
});

// Cargar movimientos de usuario 
router.put('/update-move/:id', async (req, res) => {
        
    const _id = req.params.id;
    const body = req.body;

    try {
        
        const userDB = await user.findByIdAndUpdate(
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
});

// Eliminar movimientos de usuario 
router.put('/delete-move/:id', async (req, res) => {
        
    const _id = req.params.id;
    const body = req.body;

    try {
        
        const userDB = await user.findByIdAndUpdate(
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
});

// Eliminar usuario 
router.delete('/registro/:id', async (req, res) =>{ 

    const _id = req.params.id;
    
    try {
        
        const registro = await user.findByIdAndDelete({_id});
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
});

// Actualizar un usuario
router.put('/registro/:id', async (req, res) => {
    
    const _id = req.params.id;
    const body = req.body;

    try {
        
        const registro = await user.findByIdAndUpdate(
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
})

// Exportamos la configuracion de express app
module.exports = router;