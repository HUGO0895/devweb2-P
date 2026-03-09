import express, { type Application, type Request, type Response } from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
import methodOverride from 'method-override';

interface Projeto {
    titulo: string;
    tecnologias: string[];
    descricao: string;
    link: string;
}

interface Certificacoes {
    nome: string;
    instituicao: string;
    status: "Concluido" | "Cursando";
}

dotenv.config();

let logado = false;
const app: Application = express();
const port: number = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// ============ DADOS INICIAIS ============
let certificacoes: Array<Certificacoes> = [
    {
        "nome": "Python Bradesco",
        "instituicao": "Bradesco",
        "status": "Concluido"
    },
    {
        "nome": "Desenvolvimento de Software Multiplataforma",
        "instituicao": "Fatec",
        "status": "Cursando"
    }
];

let projetos: Array<Projeto> = [
    {
        "titulo": "Análise de dados",
        "tecnologias": [
            "Pandas",
            "Flask",
            "JavaScript",
            "Html",
            "Css"
        ],
        "link": "https://drive.google.com/drive/u/0/folders/1j7C1eUzgahAxqX4_j4bGxjWbtrBt_Lc1",
        "descricao": "Neste projeto, atuei na linha de frente técnica e estratégica. Como Product Owner (PO), fui responsável pela visão geral do produto e por parte elaboração da documentação técnica. No desenvolvimento, executei todo o processo de ETL, utilizando a biblioteca Pandas para o tratamento, limpeza e manipulação de grandes volumes de dados. No back-end, utilizei Flask para estruturar a lógica do projeto e garantir a integração eficiente entre os dados processados e a entrega final."
    },
    {
        "titulo": "Gerenciador de Senhas",
        "tecnologias": [
            "Javascript",
            "Python",
            "Css",
            "Html",
            "Flask"
        ],
        "descricao": "Realizei a modelagem do banco de dados, garantindo a integridade e o relacionamento dos dados. No back-end (Flask), implementei camadas rigorosas de segurança através de algoritmos de criptografia e hash para proteção de informações sensíveis. No front-end, desenvolvi funcionalidades avançadas de filtragem utilizando JavaScript.",
        "link": "https://github.com/VitorBomfim-12/projeto_vault_senha"
    }
];

// ============ ROTAS PRINCIPAIS ============
app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

// ============ CRUD PROJETOS ============

// READ - Listar projetos
app.get('/projetos', (req: Request, res: Response) => {
    res.render('projetos', { 
        logado: logado, 
        projetos: projetos 
    });
});

// CREATE - Criar projeto
app.post('/projetos', (req: Request, res: Response) => {
    try {
        const nome: string = req.body.titulo;
        const tecnologias: Array<string> = req.body.tecnologias ? 
            String(req.body.tecnologias).split(',').map((t: string) => t.trim()) : [];
        const descricao: string = req.body.descricao || '';
        const link: string = req.body.link || '';

        const novoProjeto: Projeto = {
            titulo: nome,
            tecnologias: tecnologias,
            descricao: descricao,
            link: link
        };

        projetos.push(novoProjeto);
        res.redirect('/projetos');
    } catch (error) {
        console.error('Erro ao criar projeto:', error);
        res.redirect('/projetos');
    }
});

// UPDATE - Atualizar projeto
app.put('/projetos/put', (req: Request, res: Response) => {
    try {
        const nome: string = req.body.titulo;
        const tecnologias: Array<string> = req.body.tecnologias ? 
            String(req.body.tecnologias).split(',').map((t: string) => t.trim()) : [];
        const descricao: string = req.body.descricao;
        const link: string = req.body.link;

        const index = projetos.findIndex(p => p.titulo === nome);
        
        // 🔥 FIX: Verifica se index existe antes de usar
        if (index !== -1 && projetos[index]) {
            // Atualiza apenas os campos que foram enviados
            if (tecnologias.length > 0 && projetos[index]) projetos[index].tecnologias = tecnologias;
            if (descricao && projetos[index]) projetos[index].descricao = descricao;
            if (link && projetos[index]) projetos[index].link = link;
        }

        res.redirect('/projetos');
    } catch (error) {
        console.error('Erro ao atualizar projeto:', error);
        res.redirect('/projetos');
    }
});

// DELETE - Deletar projeto
app.delete('/projetos/delete', (req: Request, res: Response) => {
    try {
        const titulo: string = req.body.titulo;
        projetos = projetos.filter(elemento => elemento.titulo !== titulo);
        res.redirect('/projetos');
    } catch (error) {
        console.error('Erro ao deletar projeto:', error);
        res.redirect('/projetos');
    }
});

// ============ CRUD CERTIFICAÇÕES ============

// READ - Listar certificações
app.get('/certificacoes', (req: Request, res: Response) => {
    res.render('sobre', { 
        logado: logado, 
        certificacoes: certificacoes 
    });
});

// CREATE - Criar certificação
app.post('/certificacoes', (req: Request, res: Response) => {
    try {
        const nome: string = req.body.nome;
        const instituicao: string = req.body.instituicao;
        const statusInput: string = req.body.status;
        
        // Validar e tipar o status corretamente
        let status: "Concluido" | "Cursando" = "Cursando";
        if (statusInput === "Concluido") {
            status = "Concluido";
        } else if (statusInput === "Cursando") {
            status = "Cursando";
        }

        const novaCertificacao: Certificacoes = {
            nome: nome,
            instituicao: instituicao,
            status: status
        };

        certificacoes.push(novaCertificacao);
        res.redirect('/certificacoes');
    } catch (error) {
        console.error('Erro ao criar certificação:', error);
        res.redirect('/certificacoes');
    }
});

// UPDATE - Atualizar certificação
app.put('/certificacoes/put', (req: Request, res: Response) => {
    try {
        const nome: string = req.body.nome;
        const instituicao: string = req.body.instituicao;
        const statusInput: string = req.body.status;

        const index = certificacoes.findIndex(c => c.nome === nome);
        
        // 🔥 FIX: Verifica se index existe antes de usar
        if (index !== -1 && certificacoes[index]) {
            // Atualiza instituição se fornecida
            if (instituicao && certificacoes[index]) {
                certificacoes[index].instituicao = instituicao;
            }
            
            // Atualiza status se fornecida e válida
            if (statusInput && certificacoes[index]) {
                if (statusInput === "Concluido") {
                    certificacoes[index].status = "Concluido";
                } else if (statusInput === "Cursando") {
                    certificacoes[index].status = "Cursando";
                }
            }
        }

        res.redirect('/certificacoes');
    } catch (error) {
        console.error('Erro ao atualizar certificação:', error);
        res.redirect('/certificacoes');
    }
});

// DELETE - Deletar certificação
app.delete('/certificacoes/delete', (req: Request, res: Response) => {
    try {
        const nome: string = req.body.nome;
        certificacoes = certificacoes.filter(c => c.nome !== nome);
        res.redirect('/certificacoes');
    } catch (error) {
        console.error('Erro ao deletar certificação:', error);
        res.redirect('/certificacoes');
    }
});

// ============ AUTENTICAÇÃO ============
app.get('/login', (req: Request, res: Response) => {
    res.render('login');
});

app.post('/login', (req: Request, res: Response) => {
    const senha: string = req.body.senha;
    const email: string = req.body.email;
    
    if (senha === process.env.SENHA && email === process.env.EMAIL) {
        logado = true;
        res.redirect('/projetos');
    } else {
        logado = false;
        res.redirect('/');
    }
});

// ============ INICIAR SERVIDOR ============
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});