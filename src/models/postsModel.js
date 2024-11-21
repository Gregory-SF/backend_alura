import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Conecta ao banco de dados usando a string de conexão fornecida como variável de ambiente

export async function getTodosPosts() {
    const db = conexao.db("imersao-istabytes");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}