import * as fs from 'fs';
import path from 'path'

interface Projeto {
    titulo: string;
    tecnologias: string[];
    descricao: string;
    link: string;
}

interface Certificacoes{
     nome:string,
    instituicao:string
    status: "Concluido" | "Cursando"

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
async function getCert() {

     const jsonCert:string=await fs.promises.readFile(path.resolve(__dirname,'certificacoes.json'),'utf-8');
     const arrayCert2:Array<Certificacoes>=JSON.parse(jsonCert);
     return arrayCert2;

}
async function criarCert(nome:string,instituicao:string,status:"Cursando" | "Concluido"){
       
     try{
    
     const jsonCert:string= await fs.promises.readFile(path.resolve(__dirname,'certificacoes.json'),'utf-8');
      const jsonCert2:Array<Certificacoes>=JSON.parse(jsonCert);

      jsonCert2.push({nome:nome,instituicao:instituicao,status:status});
      await fs.promises.writeFile(path.resolve(__dirname,'certificacoes.json'),JSON.stringify(jsonCert2,null,3),'utf-8');
     }
     catch(e){
           console.log(e);
     }
  
    
       
}
async function delCert(nome:string){
   try{
      const jsonCert:string= await fs.promises.readFile(path.resolve(__dirname,'certificacoes.json'),'utf-8');
      let  jsonCert2:Array<Certificacoes>=JSON.parse(jsonCert);
      jsonCert2=jsonCert2.filter(certi=> certi.nome!=nome);
       await fs.promises.writeFile(path.resolve(__dirname,'certificacoes.json'),JSON.stringify(jsonCert2,null,3),'utf-8');


   }
   catch(e){
     console.log(e);
   }
}

async function putCert(nome:string,instituicao:string,status:"Cursando"|"Concluido"){
      try{
      const jsonCert:string= await fs.promises.readFile(path.resolve(__dirname,'certificacoes.json'),'utf-8');
      const mudancasV:Certificacoes={
             nome: nome,
         instituicao: instituicao, 
         status:status
                            };
      let  jsonCertA:Array<Certificacoes>=JSON.parse(jsonCert);
    jsonCertA.forEach((elemento)=>{
            if(elemento.nome==nome){
               for(let x in mudancasV){
                    const chave=x as keyof Certificacoes;
                    if (mudancasV[chave]){
                         (elemento as any)[chave]=mudancasV[chave];
                    }
               }

            }
      })
       await fs.promises.writeFile(path.resolve(__dirname,'certificacoes.json'),JSON.stringify(jsonCertA,null,4),'utf-8');


   }
   catch(e){
     console.log(e);
   }
  
}

export {criarProj,getProj,delProj,putProj,getCert,criarCert,delCert,putCert}


