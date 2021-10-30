import { Router } from 'express';
import { 
    createUser, 
    getUserId, 
    getUserMailPassword, 
    getUsers, 
    getMovId, 
    removeMoveId, 
    updateMoveId, 
    deleteUser, 
    updateUser,
    updateUserMovement,
    logout
} from '../controllers/user.controllers'

const router = Router();

// Agregar usuario 
router.post('/user-new', createUser );

// Consultar base de datos con parametros id
router.get('/registro/:id', getUserId );

// Consulta base de datos por email y password 
router.post('/login', getUserMailPassword);

// Consultar base de datos todos los documentos 
router.get('/registro', getUsers);

// Cargar movimientos de usuario 
router.put('/update-move/:id', getMovId);

// Eliminar movimientos de usuario 
router.put('/delete-move/:id', removeMoveId);

// Actualizar movimientos de usuario 
router.put('/edit-move/:id', updateMoveId);

// Eliminar usuario 
router.delete('/registro/:id', deleteUser);

// Actualizar un usuario
router.put('/update-user/:id', updateUser);

// Actualizar usuario con movimientos 
router.put('/update-usermove/:id',updateUserMovement)

// Logout usuario
router.put('/logout', logout)

// Exportamos la configuracion de express app
export default router;