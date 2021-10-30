import jwt from 'jsonwebtoken';
import config from '../config';

export async function verifyToken (req, res, next){
    // Toma el token de las cabeceras 
    const token = req.headers['x-access-token'];

    // Si no hay un token 
    if(!token){
        return res
            .status(401)
            .send({auth: false, message: 'No Token as Provided'});
    }

    // Decodificando token
    const decoded = await jwt.verify(token, config.secret);

    // Se guarda el token en el objeto request usado en las rutas
    req.userId = decoded.id;
}