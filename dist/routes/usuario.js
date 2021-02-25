"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var autenticacion_1 = require("./../middlewares/autenticacion");
var usuario_model_1 = require("./../models/usuario.model");
var express_1 = require("express");
var bcrypt_1 = __importDefault(require("bcrypt"));
var token_1 = __importDefault(require("../classes/token"));
var userRoutes = express_1.Router();
// Login
userRoutes.post('/login', function (req, res) {
    var body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                'ok': false,
                'mensaje': 'Usuario/contraseña no son correctos'
            });
        }
        if (userDB.compararPassword(body.password)) {
            var tokenUsuario = token_1.default.getJWTToken({
                '_id': userDB._id,
                'nombre': userDB.nombre,
                'email': userDB.email,
                'avatar': userDB.avatar
            });
            res.json({
                'ok': true,
                'token': tokenUsuario,
            });
        }
        else {
            res.json({
                'ok': false,
                'error': 'Usuario/contraseña no son correctos'
            });
        }
    });
});
// Crear usuario
userRoutes.post('/create', function (req, res) {
    var user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatart: req.body.avatar
    };
    usuario_model_1.Usuario.create(user).then(function (userDB) {
        var tokenUsuario = token_1.default.getJWTToken({
            '_id': userDB._id,
            'nombre': userDB.nombre,
            'email': userDB.email,
            'avatar': userDB.avatar
        });
        res.json({
            'ok': true,
            'token': tokenUsuario,
        });
    }).catch(function (error) {
        res.json({
            'ok': false,
            'error': error
        });
    });
});
// Actualizar user
userRoutes.post('/update', autenticacion_1.verificaToken, function (req, res) {
    var user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, function (err, userDB) {
        if (err) {
            throw err;
        }
        if (!userDB) {
            res.json({
                'ok': false,
                'error': 'No existe el usuario con ese ID'
            });
        }
        else {
            var tokenUsuario = token_1.default.getJWTToken({
                '_id': userDB._id,
                'nombre': userDB.nombre,
                'email': userDB.email,
                'avatar': userDB.avatar
            });
            res.json({
                'ok': true,
                'mensaje': tokenUsuario
            });
        }
    });
});
exports.default = userRoutes;
