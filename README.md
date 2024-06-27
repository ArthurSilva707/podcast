# Podcast API

Esta é uma API para centralizar diferentes episódios de podcasts separados por categoria e permitir filtrar episódios por nome de podcast. A API é construída usando Node.js, Express, TypeScript e PostgreSQL.

## Configuração do Projeto

### 1. Inicialize um novo projeto Node.js

mkdir podcast-api
cd podcast-api
npm init -y
npm install express typescript ts-node-dev @types/node @types/express pg

### 2. Crie um arquivo `tsconfig.json`

{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}

### 3. Estrutura do Projeto

Crie a estrutura de pastas:

mkdir src
mkdir src/routes
mkdir src/controllers
mkdir src/models

## Modelos de Dados

Crie um arquivo `src/models/podcast.ts`:

interface Podcast {
  podcastName: string;
  episode: string;
  cover: string;
  link: string;
  categories: string[];
}

const podcasts: Podcast[] = [
  {
    podcastName: "Saúde em Pauta",
    episode: "Episódio 1",
    cover: "link-da-imagem",
    link: "link-do-episódio",
    categories: ["saúde"]
  },
  {
    podcastName: "Fitness Total",
    episode: "Episódio 2",
    cover: "link-da-imagem",
    link: "link-do-episódio",
    categories: ["fitness"]
  },
  // Adicione mais podcasts aqui
];

export { Podcast, podcasts };

## Configuração do Banco de Dados

### 1. Crie o banco de dados no PostgreSQL

CREATE DATABASE podcastdb;

\c podcastdb

CREATE TABLE podcasts (
    id SERIAL PRIMARY KEY,
    podcast_name VARCHAR(255) NOT NULL,
    episode VARCHAR(255) NOT NULL,
    cover VARCHAR(255),
    link VARCHAR(255),
    categories TEXT[]
);

### 2. Crie um arquivo `src/db.ts` para configurar a conexão com o banco de dados

import { Pool } from 'pg';

const pool = new Pool({
    user: 'seu_usuario',       // substitua pelo seu usuário do PostgreSQL
    host: 'localhost',         // ou o endereço do seu host
    database: 'podcastdb',     // nome do banco de dados que você criou
    password: 'sua_senha',     // substitua pela sua senha do PostgreSQL
    port: 5432,                // porta padrão do PostgreSQL
});

export default pool;

## Controladores e Rotas

### 1. Crie o controlador `src/controllers/podcastController.ts`

import { Request, Response } from 'express';
import pool from '../db';

export const getPodcastsByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    try {
        let result;
        if (category) {
            result = await pool.query(
                'SELECT * FROM podcasts WHERE $1 = ANY(categories)',
                [category]
            );
        } else {
            result = await pool.query('SELECT * FROM podcasts');
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar podcasts' });
    }
};

export const getEpisodesByPodcastName = async (req: Request, res: Response) => {
    const { podcastName } = req.query;
    try {
        let result;
        if (podcastName) {
            result = await pool.query(
                'SELECT * FROM podcasts WHERE podcast_name = $1',
                [podcastName]
            );
        } else {
            result = await pool.query('SELECT * FROM podcasts');
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar episódios' });
    }
};

### 2. Crie as rotas `src/routes/podcastRoutes.ts`

import { Router } from 'express';
import { getPodcastsByCategory, getEpisodesByPodcastName } from '../controllers/podcastController';

const router = Router();

router.get('/category/:category?', getPodcastsByCategory); // '?' torna o parâmetro opcional
router.get('/episodes', getEpisodesByPodcastName);

export default router;

### 3. Crie o arquivo principal `src/index.ts`

import express from 'express';
import podcastRoutes from './routes/podcastRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/podcasts', podcastRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

## Execução do Projeto

### 1. Adicione o script de desenvolvimento ao `package.json`

"scripts": {
  "start": "ts-node-dev src/index.ts"
}

### 2. Execute o projeto

npm start

## Testando a API

### Listar todos os podcasts

GET http://localhost:3000/podcasts/category

### Listar todos os episódios

GET http://localhost:3000/podcasts/episodes

### Listar podcasts por categoria específica

GET http://localhost:3000/podcasts/category/saúde

### Listar episódios por nome específico de podcast

GET http://localhost:3000/podcasts/episodes?podcastName=Fitness Total

## Adicionando Podcasts ao Banco de Dados

Você pode adicionar podcasts ao banco de dados manualmente ou via script SQL:

INSERT INTO podcasts (podcast_name, episode, cover, link, categories)
VALUES
('Saúde em Pauta', 'Episódio 1', 'link-da-imagem', 'link-do-episódio', ARRAY['saúde']),
('Fitness Total', 'Episódio 2', 'link-da-imagem', 'link-do-episódio', ARRAY['fitness']);
