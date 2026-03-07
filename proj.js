const projetos = [
            {
                titulo: "Análise de dados",
                imagem: "./img/video_sprint_3.gif",
                descricao: "Neste projeto, atuei na linha de frente técnica e estratégica. Como Product Owner (PO), fui responsável pela visão geral do produto e por parte elaboração da documentação técnica. No desenvolvimento, executei todo o processo de ETL, utilizando a biblioteca Pandas para o tratamento, limpeza e manipulação de grandes volumes de dados. No back-end, utilizei Flask para estruturar a lógica do projeto e garantir a integração eficiente entre os dados processados e a entrega final."
            },
            {
                titulo: "Gerenciador de Senhas",
                imagem: "./img/Vault-ezgif.com-video-to-gif-converter.gif",
                descricao: "Realizei a modelagem do banco de dados, garantindo a integridade e o relacionamento dos dados. No back-end (Flask), implementei camadas rigorosas de segurança através de algoritmos de criptografia e hash para proteção de informações sensíveis. No front-end, desenvolvi funcionalidades avançadas de filtragem utilizando JavaScript."
            }
        ];

    
        function renderizarProjetos() {
            const container = document.getElementById('projetos-container');
            
          
            container.innerHTML = '';
            
        
            projetos.forEach(projeto => {
                const section = document.createElement('section');
                section.className = 'px-10 py-10';
                
                section.innerHTML = `
                    <div class="grid grid-cols-3 gap-4">
                        <div class="col-span-3">
                            <h1 class="md:text-3xl font-bold text-1xl text-white bg-blue-500 rounded-full px-5 py-1 inline-block hover:scale-110 transition duration-400">
                                ${projeto.titulo}
                            </h1>
                        </div>
                        <div class="col-span-3 lg:col-span-2 overflow-hidden rounded-xl shadow-2xl">
                            <img src="${projeto.imagem}" alt="${projeto.titulo}" class="w-full object-cover">
                        </div>
                        <div class="col-span-3 lg:col-span-1 space-y-4">
                            <p class="font-bold text-gray-700 leading-relaxed">${projeto.descricao}</p>
                        </div>
                    </div>
                `;
                
                container.appendChild(section);
            });
        }
        document.addEventListener('DOMContentLoaded', renderizarProjetos);