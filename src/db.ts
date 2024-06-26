import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',       // substitua pelo seu usuário do PostgreSQL
    host: 'localhost',         // ou o endereço do seu host
    database: 'podcast',     // nome do banco de dados que você criou
    password: 'teste',     // substitua pela sua senha do PostgreSQL
    port: 5432,                // porta padrão do PostgreSQL
});

export default pool;