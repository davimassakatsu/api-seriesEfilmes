API de Conteúdos (Filmes e Séries)

Uma API simples desenvolvida com Node.js e Express para listar, filtrar e buscar conteúdos (filmes e séries) relacionados a comédia e drama.

Como executar o projeto
1. Instalar dependências
npm install express
2. Rodar o servidor
node index.js

ou (recomendado):

npx nodemon
3. Acessar a API

A API estará disponível em:

http://localhost:5000
Endpoints disponíveis
Buscar conteúdo por ID

GET /api/conteudos/:id

Exemplo:
http://localhost:5000/api/conteudos/1
Resposta:
{
  "id": 1,
  "titulo": "The Office (US)",
  "diretor": "Greg Daniels",
  "ano": 2005,
  "genero": "Comédia",
  "nota": 8.9
}
Erro:
{
  "erro": "Conteúdo não encontrado"
}

Listar conteúdos com filtros

GET /api/conteudos

Filtros disponíveis

Você pode usar os seguintes parâmetros na URL:

categoria	Filtra por gênero	?categoria=Comédia
Filtrar por gênero
http://localhost:5000/api/conteudos?categoria=Comédia

<img width="966" height="822" alt="image" src="https://github.com/user-attachments/assets/ff127e6c-dd79-4cc4-8e53-aa96c63a1c73" />

ano_min	Ano mínimo	?ano_min=2009
<img width="976" height="893" alt="image" src="https://github.com/user-attachments/assets/e6df4de6-e08b-4122-8b80-1db27643a8f5" />

ano_max	Ano máximo	?ano_max=2005
<img width="977" height="914" alt="image" src="https://github.com/user-attachments/assets/d0dcf4e7-a27d-499f-9b61-f79bd4d84592" />

nota_min	Nota mínima	?nota_min=8
Filtrar por nota
http://localhost:5000/api/conteudos?nota_min=8
<img width="974" height="900" alt="image" src="https://github.com/user-attachments/assets/5b875108-4e29-402f-a2d2-651621cdf928" />

nota_max	Nota máxima	?nota_max=9
<img width="973" height="913" alt="image" src="https://github.com/user-attachments/assets/ae44f63e-6e29-4bcb-87fa-d0c9cb32a182" />

Ordenação

ordem	ano - ascendente
<img width="981" height="935" alt="image" src="https://github.com/user-attachments/assets/e993733c-35c3-4adc-a51b-b1f2cf0aaeb9" />

direcao	asc ou desc
Exemplo:
?ordem=ano&direcao=desc

Paginação
Parâmetro	Descrição
pagina	Número da página
limite	Itens por página
Exemplo:
Paginação
http://localhost:5000/api/conteudos?pagina=1&limite=5
<img width="973" height="832" alt="image" src="https://github.com/user-attachments/assets/ec584b98-3ed5-4098-9456-72e5c79916e9" />

Estrutura dos dados
Cada conteúdo possui:

{
  "id": number,
  "titulo": string,
  "diretor": string,
  "ano": number,
  "genero": string,
  "nota": number
}



POST 

ADICIONANDO MAIS CINCO ELEMENTOS NO POSTMAN
<img width="978" height="837" alt="image" src="https://github.com/user-attachments/assets/d8c275d9-4eff-4081-a10f-9cd519a4a4d4" />
<img width="983" height="868" alt="image" src="https://github.com/user-attachments/assets/6dad53c0-a7eb-427c-bd26-67de32c4c9b8" />
<img width="981" height="958" alt="image" src="https://github.com/user-attachments/assets/8e4cf5f8-57b1-4d5a-bdf9-c752f68457e8" />
<img width="977" height="925" alt="image" src="https://github.com/user-attachments/assets/f2b0b8dc-6c7e-4282-a3ac-fa4f23a4dfb1" />
<img width="969" height="891" alt="image" src="https://github.com/user-attachments/assets/943402ea-9bf7-4197-ba71-7d42a3a614fc" />

TOTAL DE ITENS - TESTE NAVEGADOR
<img width="371" height="990" alt="image" src="https://github.com/user-attachments/assets/1bf29b89-ced9-47e1-93e4-a9704074db34" />

10 DO ARRAY + 5 ADICIONADOS = 15


COLLECTION POSTMAN
https://davimassakatsu-3157203.postman.co/workspace/Davi-Massakatsu's-Workspace~d443b077-e611-46f3-807c-bbaf060a55eb/collection/53421951-4a3523e7-f10e-4c75-a809-a43d726cdad3?action=share&source=copy-link&creator=53421951

Projeto desenvolvido para aprendizado de APIs com Node.js e Express. 
ALUNO DAVI MASSAKATSU FUJIMURA DE SOUZA
PROFESSOR TIAGO DUTRA GALVÃO


