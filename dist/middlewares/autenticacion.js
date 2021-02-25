"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
var token_1 = __importDefault(require("../classes/token"));
var verificaToken = function (req, res, next) {
    var userToken = req.get('x-token') || '';
    token_1.default.comprobarToken(userToken)
        .then(function (decoded) {
        console.log('decoded', decoded);
        req.usuario = decoded.usuario;
        next();
    }).catch(function (err) {
        res.json({
            'ok': false,
            'error': 'Token no es correcto'
        });
    });
};
exports.verificaToken = verificaToken;
