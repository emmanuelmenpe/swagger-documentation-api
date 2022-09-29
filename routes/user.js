const express = require('express');
const UserController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { body, param} = require('express-validator');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

//login de usuario
router.post('/api/user/login', 
[ 
    body('email')
        .exists().withMessage('El email es requerido')
        .isEmail().withMessage('El email es invalido'),
    body('password')
        .exists().withMessage('El password es requerido')
],
    authController.login
);

//crear usuario
router.post('/api/user', 
[ 
    body('name')
        .exists().withMessage('El nombre es requerido')
        .trim()
        .escape(),
    body('email')
        .exists().withMessage('El email es requerido')
        .isEmail().withMessage('El email es invalido'),
    body('password')
        .exists().withMessage('El password es requerido')
        .isAlphanumeric().withMessage('El password debe contener solo caracteres alfanumericos')
        .isLength({min:6}).withMessage('El password debe tener al menos 6 caracteres'),
],
UserController.CrearUser
);

//obtener usuarios
router.get('/api/users', 
authMiddleware,
UserController.GetUsers
);

//obtener usuario
router.get('/api/user/:id', 
[
    param('id')
        .exists().withMessage('El id es requerido')
        .isMongoId().withMessage('El id es invalido')
],
authMiddleware,
UserController.GetUser
);

//Actuliazar usuario
router.put('/api/user/:id',
[ 
    param('id')
        .exists().withMessage('El id es requerido')
        .isMongoId().withMessage('El id es invalido'),
    body('name')
        .optional()
        .trim()
        .escape(),
    body('email')
        .optional()
        .isEmail().withMessage('El email es invalido'),
    body('password')
        .optional()
        .isAlphanumeric().withMessage('El password debe contener solo caracteres alfanumericos')
        .isLength({min:6}).withMessage('El password debe tener al menos 6 caracteres'),
],
authMiddleware,
UserController.UpdateUser
);

//eliminar user
router.delete('/api/user/:id', 
[
    param('id')
        .exists().withMessage('El id es requerido')
        .isMongoId().withMessage('El id es invalido')
],
authMiddleware,
UserController.DeleteUser
);


module.exports = router;