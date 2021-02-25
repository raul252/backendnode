"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var usuario_1 = __importDefault(require("./routes/usuario"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var server = new server_1.default();
// Body parse
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use('/user', usuario_1.default);
// Conectar base de datos
mongoose_1.default.connect('mongodb://localhost:27017/photosgram', {
    useNewUrlParser: true, useCreateIndex: true,
}, function (error) {
    if (error) {
        throw error;
    }
    console.log('base de datos online');
});
// Levantar express
server.start();
