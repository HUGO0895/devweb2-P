import express,{type Application, type Request, type Response} from 'express'
import path from 'path';
import * as midleware from './midlewares';
const route=express.Router();
const app:Application=express();
const port:number=3000;
app.use(express.urlencoded({extended:true}));

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views',path.resolve(__dirname,'views'));
// Rota de teste
app.get('/', (req: Request, res: Response) => {
  res.render('index');
});
app.get('/login',(req:Request,res:Response)=>{
      res.render('login')
})
// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});