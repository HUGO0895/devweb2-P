import { type Request, type Response } from 'express';
import * as fs from 'fs';
import { type NextFunction } from 'express';

module.exports = (req: Request, res: Response, next: NextFunction) => {
    const conteudo = "AULA";
    fs.writeFileSync("arquivo.txt", conteudo, 'utf8');
    return next();
};