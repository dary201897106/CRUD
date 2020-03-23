import 'reflect-metadata';
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {createConnection} from 'typeorm'
import userRoutes from '../src/routes/user.routes'

const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

const { libros } = require('./data.json');

const schema = buildSchema(`
    type Query{
        libro(id: Int!): Libro
        libros(autor: String): [Libro]
    }

    type Mutation {
        updateLibroAutor(id: Int!, autor: String!): Libro
        deleteLibro(id: Int!): Libro
        createLibro(id: Int!, titulo: String!, autor: String!): Libro
    }

    type Libro {
        id: Int
        titulo: String
        autor: String
    }

`);

let getLibro = (args) => {
    let id = args.id;
    return libros.filter(libro => {
        return libro.id == id;
    })[0]
}
let getLibros = (args) => {
    if(args.autor) {
        let autor = args.autor;
        return libros.filter(libro => libro.titulo == autor);
    }else{
        return libros;
    }
}

let updateLibroAutor = ({id, autor}) => {
    libros.map(libro => {
        if (libro.id === id){
            libro.autor = autor;
            return libro;
        }
    })
    return libros.filter(libro => libro.id === id)[0];
}

let deleteLibro = ({id}) => {
    libros.map(libro => {
        if (libro.id === id){
            return libro.delete();
        }
    })
}

let createLibro = ({id, titulo, autor}) => {
    libros.map(libro => {
        if(libro.id =! id){
            id: id
            titulo: titulo
            autor: autor
            return libro.save();
        }
    })
}

const root = {
    libro: getLibro,
    libros: getLibros,
    updateLibroAutor: updateLibroAutor,
    deleteLibro: deleteLibro,
    createLibro: createLibro
}

const app = express()
createConnection();



app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(userRoutes);

app.use('/graphql',express_graphql({
    schema: schema,
    root: root,
    graphiql: true   
}));

app.listen(3000);
console.log('server on port', 3000);