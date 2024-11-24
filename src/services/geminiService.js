import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function gerarDescricaoComGemini(imageBuffer) {
  const prompt = "Gere apenas uma descrição em português do brasil para a seguinte imagem, retire da sua resposta qualquer coisa similar a 'aqui está sua resposta'";
  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/jpg",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Descrição não disponível.";
  } catch (erro) {
    console.error("Erro ao obter descrição:", erro.message, erro);
    throw new Error("Erro ao obter a descrição do Gemini.");
  }
}