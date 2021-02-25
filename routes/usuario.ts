import { verificaToken } from './../middlewares/autenticacion';
import { Usuario } from './../models/usuario.model';
import { Request, Response, Router } from "express";
import bcrypt from 'bcrypt';
import Token from '../classes/token';

const userRoutes = Router();

// Login

userRoutes.post('/login', (req:Request, res: Response) => {
    const body = req.body;


    Usuario.findOne({email: body.email}, (err: any, userDB: any)=> {
        if (err) throw err;
        if (!userDB) {
            return res.json({
                'ok': false,
                'mensaje': 'Usuario/contraseña no son correctos'
            })
        }

        if(userDB.compararPassword(body.password)) {

            const tokenUsuario = Token.getJWTToken({
                '_id': userDB._id,
                'nombre': userDB.nombre,
                'email': userDB.email,
                'avatar': userDB.avatar
            });

            res.json({
                'ok': true,
                'token': tokenUsuario,
            });

        } else {
            res.json({
                'ok': false,
                'error': 'Usuario/contraseña no son correctos'
            })
        }

    })
});

// Crear usuario
userRoutes.post('/create', (req: Request, res: Response) => {

    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatart: req.body.avatar
    };

    Usuario.create(user).then(userDB => {
        const tokenUsuario = Token.getJWTToken({
            '_id': userDB._id,
            'nombre': userDB.nombre,
            'email': userDB.email,
            'avatar': userDB.avatar
        });

        res.json({
            'ok': true,
            'token': tokenUsuario,
        });

    }).catch(error => {
        res.json({
            'ok': false,
            'error': error
        })
    });

});

// Actualizar user
userRoutes.post('/update', verificaToken, (req: any, res: Response) => {

    const user = {
        nombre: req.body.nombre  || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    };

    Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true}, (err, userDB) => {
        if (err) {
            throw err;
        }
        if (!userDB) {
            res.json({
                'ok': false,
                'error': 'No existe el usuario con ese ID'
            })
        } else {

            const tokenUsuario = Token.getJWTToken({
                '_id': userDB._id,
                'nombre': userDB.nombre,
                'email': userDB.email,
                'avatar': userDB.avatar
            });

            res.json({
                'ok': true,
                'mensaje': tokenUsuario
            })

        }

    })

});

export default userRoutes;