// 1. Importar Express
const express = require('express');

// 2. Criar aplicação
const app = express();

// 3. Definir porta
const PORT = 5000;

// 4. Middleware para JSON
app.use(express.json());


// 5. Criar primeiro endpoint
app.get('/', (req, res) => {
    res.json({
        mensagem: '🎉 Minha primeira API funcionando!',
        status: 'sucesso',
        timestamp: new Date().toISOString(),
    });
});

// 6. Endpoint de informações
app.get('/info', (req, res) => {
    res.json({
        nome: 'Minha API REST de CONTEÚDOS',
        versao: '1.0.0',
        autor: 'Davi Massakatsu'
    });
});

// 7. Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
// Banco de dados "fake" em memória
let conteudos = [
  {
    id: 1,
    titulo: "The Office (US)",
    diretor: "Greg Daniels",
    ano: 2005,
    genero: "Comédia",
    nota: 8.9
  },
  {
    id: 2,
    titulo: "Breaking Bad",
    diretor: "Vince Gilligan",
    ano: 2008,
    genero: "Drama/Crime",
    nota: 9.5
  },
  {
    id: 3,
    titulo: "Better Call Saul",
    diretor: "Vince Gilligan",
    ano: 2015,
    genero: "Drama/Crime",
    nota: 9.0
  },
  {
    id: 4,
    titulo: "Parks and Recreation",
    diretor: "Greg Daniels",
    ano: 2009,
    genero: "Comédia",
    nota: 8.6
  },
  {
    id: 5,
    titulo: "Brooklyn Nine-Nine",
    diretor: "Dan Goor",
    ano: 2013,
    genero: "Comédia",
    nota: 8.4
  },
  {
    id: 6,
    titulo: "El Camino: A Breaking Bad Movie",
    diretor: "Vince Gilligan",
    ano: 2019,
    genero: "Drama/Crime",
    nota: 7.3
  },
  {
    id: 7,
    titulo: "Superstore",
    diretor: "Justin Spitzer",
    ano: 2015,
    genero: "Comédia",
    nota: 7.8
  },
  {
    id: 8,
    titulo: "Ozark",
    diretor: "Bill Dubuque",
    ano: 2017,
    genero: "Drama/Crime",
    nota: 8.5
  },
  {
    id: 9,
    titulo: "Arrested Development",
    diretor: "Mitchell Hurwitz",
    ano: 2003,
    genero: "Comédia",
    nota: 8.7
  },
  {
    id: 10,
    titulo: "Weeds",
    diretor: "Jenji Kohan",
    ano: 2005,
    genero: "Drama/Comédia",
    nota: 7.9
  }
];
        
// POST
app.post('/api/conteudos', (req, res) => {
  console.log('POST:', req.body);
  produtos.push(req.body);
  res.json(conteudos);
});

// GET /api/conteudos - Listar todos
app.get('/api/conteudos', (req, res) => {
    // Retorna o array completo
    res.json(conteudos);
});


// GET /api/conteudos/:id - Buscar por ID
app.get('/api/conteudos/:id', (req, res) => {
    // 1. Pegar ID da URL
    const id = parseInt(req.params.id);
    
    // 2. Buscar produto no array
    const conteudos = conteudos.find(p => p.id === id);
    
    // 3. Verificar se encontrou
    if (!conteudos) {
        return res.status(404).json({ 
            erro: "Conteudo não encontrado" 
        });
    }
    
    // 4. Retornar produto encontrado
    res.json(conteudos);
});


// GET /api/produtos?ordem=preco&direcao=asc
app.get('/api/conteudos', (req, res) => {
    const { categoria, genero, nota, ordem, direcao } = req.query;
    
    let resultado = produtos;
    
    // ... filtros anteriores ...
    
    // Ordenação
    if (ordem) {
        resultado = resultado.sort((a, b) => {
            if (ordem === 'ano') {
                // Ordenar por ano
                return direcao === 'desc' 
                    ? b.preco - a.preco  // Decrescente
                    : a.preco - b.preco; // Crescente
            }
            
            if (ordem === 'titulo') {
                // Ordenar por nome (alfabético)
                return direcao === 'desc'
                    ? b.nome.localeCompare(a.nome)
                    : a.nome.localeCompare(b.nome);
            }
        });
    }
    
    res.json(resultado);
});

// GET /api/conteudos?categoria
app.get('/api/conteudos', (req, res) => {
    // 1. Pegar query parameters
    const { categoria, ano_max, ano_min } = req.query;
    
    // 2. Começar com todos os produtos
    let resultado = conteudos;
    
    // 3. Aplicar filtro de categoria (se fornecido)
    if (categoria) {
        resultado = resultado.filter(p => p.categoria === categoria);
    }
    
    // 4. Aplicar filtro de preço máximo
    if (ano_max) {
        resultado = resultado.filter(p => p.ano <= parseFloat(ano_max));
    }
    
    // 5. Aplicar filtro de preço mínimo
    if (ano_min) {
        resultado = resultado.filter(p => p.ano >= parseFloat(ano_min));
    }
    
    // 6. Retornar resultados filtrados
    res.json(resultado);
});


// GET /api/produtos?pagina=1&limite=2
app.get('/api/conteudos', (req, res) => {
    const { 
        categoria, ano_max, ano_min, 
        ordem, direcao,
        pagina = 1,      // Página padrão: 1
        limite = 10     // Itens por página: 10
    } = req.query;
    
    let resultado = conteudos;
    
    // ... aplicar filtros e ordenação ...
    
    // Paginação
    const paginaNum = parseInt(pagina);
    const limiteNum = parseInt(limite);
    
    const inicio = (paginaNum - 1) * limiteNum;
    const fim = inicio + limiteNum;
    
    const paginado = resultado.slice(inicio, fim);
    
    // Retornar com metadados
    res.json({
        dados: paginado,
        paginacao: {
            pagina_atual: paginaNum,
            itens_por_pagina: limiteNum,
            total_itens: resultado.length,
            total_paginas: Math.ceil(resultado.length / limiteNum)
        }
    });
});
      