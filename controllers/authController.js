const usuarioModel = require('../models/user');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const {validationResult} = require('express-validator');
require('dotenv').config({path: '.env'});

exports.login = async(req, res, next) => {
    try {
        //mostrar mensajes de error
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json(errores.array());
            
        }
        
        const {email, password} = req.body;
        const usuario = await usuarioModel.findOne({email});

        //validar si usuario existe
        if (!usuario) {
            return res.status(404).json({msg:'Usuario no existe'});
        }

        //validar si pasword es correcta
        if (!bcrypt.compareSync(password, usuario.password)) {
            return res.status(400).json({msg:'Password incorrecto'});
        }

        //crear JSON Web Token
        const secreta = process.env.SECRETA;
        const token = JWT.sign({
            id:usuario._id,
            nombre:usuario.nombre,
            email:usuario.email
        }, secreta, {
            expiresIn: '3h'
        });

        return res.status(200).json({token, id:usuario._id});
    } catch (error) {
        return res.status(500).json({msg:'error el iniciar sesión'});
    }
}