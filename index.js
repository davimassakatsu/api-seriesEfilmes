const express = require('express');
const app = express();

app.use(express.json());


// Dados em memória
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
    genero: "Drama",
    nota: 9.5
  },
  {
    id: 3,
    titulo: "Better Call Saul",
    diretor: "Vince Gilligan",
    ano: 2015,
    genero: "Drama",
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
    genero: "Drama",
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
    genero: "Drama",
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
    genero: "Drama",
    nota: 7.9
  }
];

// GET /api/conteudos/:id - Buscar por ID
app.get('/api/conteudos/:id', (req, res) => {
    const conteudo = conteudos.find(c => c.id === parseInt(req.params.id));

    if (!conteudo) {
        return res.status(404).json({ erro: "Conteúdo não encontrado" });
    }

    res.json(conteudo);
});

// GET /api/conteudos - Listar com filtros, ordenação e paginação
app.get('/api/conteudos', (req, res) => {
    const { categoria, ano_max, ano_min, nota_min, nota_max, ordem, direcao, pagina = 1, limite = 10 } = req.query;
    
    let resultado = conteudos;
    
    // Filtros
    if (categoria) resultado = resultado.filter(p => p.genero === categoria);
    if (ano_max) resultado = resultado.filter(p => p.ano <= parseFloat(ano_max));
    if (ano_min) resultado = resultado.filter(p => p.ano >= parseFloat(ano_min));
    if (nota_min) resultado = resultado.filter(p => p.nota >= parseFloat(nota_min));
    if (nota_max) resultado = resultado.filter(p => p.nota <= parseFloat(nota_max));
    
    // Ordenação
  if (ordem) {
        resultado = resultado.sort((a, b) => {
            if (ordem === 'ano') {
                return direcao === 'desc' ? b.ano - a.ano : a.ano - b.ano;
            }
            if (ordem === 'nota') {
                return direcao === 'desc'
                    ? b.titulo.localeCompare(a.titulo)
                    : a.titulo.localeCompare(b.titulo);
            }
        });
    }
    
    // Paginação
    const paginaNum = parseInt(pagina);
    const limiteNum = parseInt(limite);
    const inicio = (paginaNum - 1) * limiteNum;
    const paginado = resultado.slice(inicio, inicio + limiteNum);
    
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

// POST /api/conteudos - Criar novo conteudo
app.post('/api/conteudos', (req, res) => {
    // 1. Pegar dados do body
    const { titulo, diretor, ano, genero, nota } = req.body;
    
    //adicionar id de acordo com a posição do array
    proximoId = conteudos.length + 1;

    // 2. Criar objeto do novo conteudo
    const novoConteudo = {
        id: proximoId++,    // Gera ID e incrementa
        titulo,
        diretor,
        ano,
        genero,
        nota
    };
    
    // 3. Adicionar ao array
    conteudos.push(novoConteudo);
    
    // 4. Retornar conteudo criado com status 201
    res.status(201).json(novoConteudo);
});

// PUT /api/conteudos/:id - Atualizar
app.put('/api/conteudos/:id', (req, res) => {
    const conteudo = conteudos.find(p => p.id === parseInt(req.params.id));
    
    if (!conteudo) {
        return res.status(404).json({ erro: "Não encontrado" });
    }

    const { titulo, diretor, ano, genero, nota } = req.body;

    //VALIDAÇÃO (campo vazio)
    if (
        titulo === "" ||
        diretor === "" ||
        genero === "" ||
        ano === "" ||
        nota === ""
    ) {
        return res.status(400).json({
            erro: "Nenhum campo pode estar vazio"
        });
    }

    // Atualiza apenas se vier
    if (titulo !== undefined) conteudo.titulo = titulo;
    if (diretor !== undefined) conteudo.diretor = diretor;
    if (ano !== undefined) conteudo.ano = ano;
    if (genero !== undefined) conteudo.genero = genero;
    if (nota !== undefined) conteudo.nota = nota;

    res.json({
        mensagem: "Atualizado com sucesso",
        conteudo
    });
});

// DELETE /api/conteudos/:id - Remover
app.delete('/api/conteudos/:id', (req, res) => {
    const index = conteudos.findIndex(p => p.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({ erro: "Não encontrado" });
    }

    const removido = conteudos.splice(index, 1);

    res.json({
        mensagem: "Removido com sucesso",
        conteudo: removido[0]
    });
});


app.listen(5000, () => console.log('🚀 API rodando na porta 5000'));