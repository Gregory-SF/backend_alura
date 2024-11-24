import express from "express";
import multer from "multer";
import cors from "cors";  
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200 
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads" , storage});

const routes = (app) => {
    app.use(express.json()); // Permite que o servidor interprete requisições com corpo no formato JSON
    app.use(cors(corsOptions));
    app.get("/posts", listarPosts);
    // Rota parar criar um post
    app.post("/posts", postarNovoPost);
    // Rota para postar imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;