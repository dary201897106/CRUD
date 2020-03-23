import {Request, Response} from 'express'
import {getRepository}  from 'typeorm'
import {libro} from '../entity/libro'

export const getLibros = async (req: Request, res: Response):Promise<Response> => {
    const libros = await getRepository(libro).find();
    return res.json(libros);
};

export const getLibro = async (req: Request, res: Response):Promise<Response> => {
    const results = await getRepository(libro).findOne(req.params.id);
    return res.json(results);
};

export const createLibro = async (req: Request, res: Response):Promise<Response> => {
    const newLibro = getRepository(libro).create(req.body);
    const results = await getRepository(libro).save(newLibro);
    return res.json(results)
};

export const updateLibro = async (req: Request, res: Response):Promise<Response> => {
    const upLibro = await getRepository(libro).findOne(req.params.id);
    if(upLibro){
        getRepository(libro).merge(upLibro, req.body);
        const result = await getRepository(libro).save(upLibro);
        return res.json(result);
    }
    return res.json({msg: 'no encontrado'});
};

export const deleteLibro = async (req: Request, res: Response):Promise<Response> => {
    const results = await getRepository(libro).delete(req.params.id);
    return res.json(results);
};