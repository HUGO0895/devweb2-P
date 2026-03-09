import express,{type Application, type Request, type Response} from 'express'
import path from 'path';
import * as Crud from './crud';
import * as dotenv from 'dotenv';
import methodOverride from 'method-override';


dotenv.config();

let logado=false;
const app:Application=express();


const port:number=3000;

app.use(express.urlencoded({extended:true}));

app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.set('views',path.resolve(__dirname,'views'));






app.delete('/projetos/delete',async(req:Request,res:Response)=>{
    let nome:string=req.body.titulo;
     await Crud.delProj(nome)
      res.redirect('/projetos')
})
app.put('/projetos/put',async(req:Request,res:Response)=>{
    let nome:string=req.body.titulo;
    let tecnologias:Array<string>= req.body.tecnologias ? req.body.tecnologias.split(','):[];
    let descricao:string = req.body.descricao;
    let link:string= req.body.link;
   await Crud.putProj(nome,descricao,link,tecnologias);
      res.redirect('/projetos')
})

app.get('/', (req: Request, res: Response) => {
  res.render('index');
});
app.get('/certificacoes',(req: Request, res: Response) => {
  res.render('sobre',{logado:logado});
})
app.get('/login',(req:Request,res:Response)=>{

      res.render('login')
})
app.post('/login',(req:Request,res:Response)=>{
    if (req.body.senha==process.env.SENHA && req.body.email==process.env.EMAIL){
      logado=true
      res.redirect('/projetos')}
    else{
      logado=false
    res.redirect('/')
  }
    
})

app.get('/projetos',async (req:Request,res:Response)=>{
       let projetos= await Crud.getProj();
      res.render('projetos',{logado:logado,projetos:projetos});
})

app.post('/projetos', async(req:Request,res:Response)=>{
    let nome:string=req.body.titulo;
    let tecnologias:Array<string>= req.body.tecnologias.split(',');
    let descricao:string = req.body.descricao;
    let link:string= req.body.link;
     await Crud.criarProj(nome,descricao,link,tecnologias);
      res.redirect('/projetos')
})








app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});