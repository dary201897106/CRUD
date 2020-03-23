"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var typeorm_1 = require("typeorm");
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var express_graphql = require('express-graphql');
var buildSchema = require('graphql').buildSchema;
var libros = require('./data.json').libros;
var schema = buildSchema("\n    type Query{\n        libro(id: Int!): Libro\n        libros(autor: String): [Libro]\n    }\n\n    type Libro {\n        id: Int\n        titulo: String\n        autor: String\n    }\n\n");
var getLibro = function (args) {
    var id = args.id;
    return libros.filter(function (libro) {
        return libro.id == id;
    })[0];
};
var getLibros = function (args) {
    if (args.autor) {
        var autor_1 = args.autor;
        return libros.filter(function (libro) { return libro.titulo == autor_1; });
    }
    else {
        return libros;
    }
};
var root = {
    libro: getLibro,
    libros: getLibros
};
var app = express_1.default();
typeorm_1.createConnection();
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(user_routes_1.default);
app.use('/graphql', express_graphql({
    schema: schema,
    root: root,
    graphiql: true
}));
app.listen(3000);
console.log('server on port', 3000);
