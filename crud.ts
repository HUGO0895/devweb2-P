import * as fs from 'fs';
import path from 'path'

interface Projeto {
    titulo: string;
    tecnologias: string[];
    descricao: string;
    link: string;
}
async function getProj() {

     const jsonProj:string=await fs.promises.readFile(path.resolve(__dirname,'projetos.json'),'utf-8');
     const arrayProj:Array<Projeto>=JSON.parse(jsonProj);
     return arrayProj;

}

async function criarProj(nome:string,descricao:string,link:string,tecnologias:Array<string>){
       
     try{
    
     const jsonProj:string= await fs.promises.readFile(path.resolve(__dirname,'projetos.json'),'utf-8');
      const jsonProjA:Array<Projeto>=JSON.parse(jsonProj);

      jsonProjA.push({titulo:nome,tecnologias:tecnologias,descricao:descricao,link:link});
      await fs.promises.writeFile(path.resolve(__dirname,'projetos.json'),JSON.stringify(jsonProjA,null,4),'utf-8');
     }
     catch(e){
           console.log(e);
     }
  
    
       
}
async function delProj(nome:string){
   try{
      const jsonProj:string= await fs.promises.readFile(path.resolve(__dirname,'projetos.json'),'utf-8');
      let  jsonProjA:Array<Projeto>=JSON.parse(jsonProj);
      jsonProjA=jsonProjA.filter(projeto=> projeto.titulo!=nome);
       await fs.promises.writeFile(path.resolve(__dirname,'projetos.json'),JSON.stringify(jsonProjA,null,4),'utf-8');


   }
   catch(e){
     console.log(e);
   }
}
async function putProj(nome:string,descricao:string="",link:string="",tecnologias:Array<string>=[]){
      try{
      const jsonProj:string= await fs.promises.readFile(path.resolve(__dirname,'projetos.json'),'utf-8');
      const mudancasV:Projeto={
          titulo: nome,
         tecnologias: tecnologias,
        descricao: descricao,
         link:link
                            };
      let  jsonProjA:Array<Projeto>=JSON.parse(jsonProj);
    jsonProjA.forEach((elemento)=>{
            if(elemento.titulo==nome){
               for(let x in mudancasV){
                    const chave=x as keyof Projeto;
                    if (mudancasV[chave]){
                         (elemento as any)[chave]=mudancasV[chave];
                    }
               }

            }
      })
       await fs.promises.writeFile(path.resolve(__dirname,'projetos.json'),JSON.stringify(jsonProjA,null,4),'utf-8');


   }
   catch(e){
     console.log(e);
   }
  
}

export {criarProj,getProj,delProj,putProj}


