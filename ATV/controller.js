const express = require("express");
const pool = require('./db');
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    pool.query('SELECT * FROM pokemon', (err, result) => {
      if (err) {
        console.error("Erro ao buscar dados no banco de dados: ", err);
        res.status(500).json({ error: "Erro ao buscar dados." });
      } else {
        res.status(200).json(result.rows);
      }
    });
  });
  
  app.post("/pokemon", (req, res) => {
    const { nome, tipo, evolucao, lendario } = req.body;
  
    if (!nome || !tipo || !evolucao || lendario === undefined) {
      res.status(400).json({ error: 'Dados incompletos. Verifique se todos os campos estão preenchidos.' });
      return;
    }
  
    pool.query(
      "INSERT INTO pokemon(nome, tipo, evolucao, lendario) VALUES ($1, $2, $3, $4)",
      [nome, tipo, evolucao, lendario],
      (err, result) => {
        if (err) {
          console.error("Erro ao inserir dados no banco de dados: ", err);
          res.status(500).json({ error: "Erro ao inserir dados." });
        } else {
          console.log("Dados inseridos com sucesso!");
          res.status(200).json({ message: "Dados inseridos com sucesso!" });
        }
      }
    );
  });
  
  app.put("/pokemon/:id", (req, res) => {
    const { id } = req.params;
    const { nome, tipo, evolucao, lendario } = req.body;
  
    if (!nome || !tipo || !evolucao || lendario === undefined) {
      res.status(400).json({ error: 'Dados incompletos. Verifique se todos os campos estão preenchidos.' });
      return;
    }
  
    pool.query(
      "UPDATE pokemon SET nome = $1, tipo = $2, evolucao = $3, lendario = $4 WHERE id = $5",
      [nome, tipo, evolucao, lendario, id],
      (err, result) => {
        if (err) {
          console.error("Erro ao atualizar dados no banco de dados: ", err);
          res.status(500).json({ error: "Erro ao atualizar dados." });
        } else {
          console.log("Dados atualizados com sucesso!");
          res.status(200).json({ message: "Dados atualizados com sucesso!" });
        }
      }
    );
  });
  
  app.delete("/pokemon/:id", (req, res) => {
    const { id } = req.params;
  
    pool.query(
      "DELETE FROM pokemon WHERE id = $1",
      [id],
      (err, result) => {
        if (err) {
          console.error("Erro ao excluir dados no banco de dados: ", err);
          res.status(500).json({ error: "Erro ao excluir dados." });
        } else {
          console.log("Dados excluídos com sucesso!");
          res.status(200).json({ message: "Dados excluídos com sucesso!" });
        }
      }
    );
  });
  
  app.listen(3000, () => {
    console.log("Servidor em execução na porta 3000");
  });