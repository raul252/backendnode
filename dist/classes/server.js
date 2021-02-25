"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Server = /** @class */ (function () {
    function Server() {
        this.port = 3000;
        this.app = express_1.default();
    }
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Aplicaci\u00F3n corriendo en el puerto " + _this.port);
        });
    };
    return Server;
}());
exports.default = Server;
