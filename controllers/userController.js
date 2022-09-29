const UserModel = require('../models/user');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
require('dotenv').config({path: '.env'});

exports.CrearUser = async(req, res) => {
    try {
        //mostrar mensajes de error
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json(errores.array());
        }
        //obtener contraseña del cuerpo de la petición
        let {password, email} = req.body;

        email = email.toLowerCase();

        if (await UserModel.findOne({email})) {
            return res.status(400).json({msg: 'Email ya ha sido registrado'});
        }

        const user = new UserModel(req.body);

        //hashear contraseña
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //crear JSON Web Token
        const secreta = process.env.SECRETA;
        const token = JWT.sign({
            id:user._id,
            nombre:user.nombre,
            email:user.email
        }, secreta, {
            expiresIn: '3h'
        });
        
        const userCreated = await user.save();

        return res.status(201).json({token, id:userCreated._id});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Hubo un error el registrar Usuario'})
      
    }
}

exports.GetUsers = async(req, res) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json({users: users}); 
    } catch (error) {
        return res.status(500).json({msg:'hubo un error al obtener los usuarios'});
    }
}

exports.GetUser = async(req, res) => {
    try {
        //mostrar mensajes de error
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json(errores.array());
        }

        //buscar usuario
        const user = await UserModel.findById(req.params.id);

        //comprabar si existe usuario
        if (!user) {
            return res.status(404).json({msg: 'Usuario no encontrado'});
        }
        return res.status(200).json({user}); 
    } catch (error) {
        return res.status(500).json({msg:'hubo un error al obtener el usuario'});
    }
}

exports.UpdateUser = async(req, res) => {
    try {
        //mostrar mensajes de error
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json(errores.array());
        }

        let {name, email, password} = req.body;
        
        const UserUpdate = {};

        if (email) {
            email = email.toLowerCase();
        }

        if (req.body) 
        {
            UserUpdate.name= name;
            UserUpdate.email= email;
            UserUpdate.password= password;
        }

        //obtener el Usuario por id
        let User = await UserModel.findById(req.params.id);

        //comprobar si existe Usuario
        if (!User) {
            return res.status(404).json({msg: 'Usuario no encontrado'});
        }
        
        if(UserUpdate.password){
            //hashear contraseña
            const salt = await bcrypt.genSalt(10);
            UserUpdate.password = await bcrypt.hash(password, salt);
        }

        //guardar cambios
        User = await UserModel.findByIdAndUpdate({_id:req.params.id}, {$set:UserUpdate}, {new:true});

        return res.status(201).json({msg:"usuario actualizado correctamente"});
    } catch (error) {
        return res.status(500).json(`error: ${error.message}`);
    }
}

exports.DeleteUser = async(req, res) => {
    try {
        //mostrar mensajes de error
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json(errores.array());
        }

        //obtener el user por id
        let user = await UserModel.findById(req.params.id);

        //comprabar si existe user
        if (!user) {
            return res.status(404).json({msg: 'usuario no encontrado'});
        }

        //eliminar
        await UserModel.findOneAndRemove({_id:req.params.id});

        return res.status(200).json({msg: 'usuario eliminado'});
    } catch (error) {
        return res.status(500).json(`error: ${error.message}`);
    }
}
