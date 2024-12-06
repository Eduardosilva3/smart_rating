const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const presentationRoutes = require("./routes/presentationRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Permitir qualquer origem (modifique conforme necessário)
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/presentations", presentationRoutes);
app.use("/api/evaluations", evaluationRoutes);

const PORT = 5000;

// Inicializa o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Dados em memória
const presentationModel = require("./models/presentationModel");
const evaluationModel = require("./models/evaluationModel");

// Função para calcular notas médias
const calculateAverageScores = () => {
  const presentations = presentationModel.getPresentations();
  return presentations.map((presentation) => {
    const evaluations = evaluationModel.getEvaluationsByPresentation(presentation.id);
    const totalScore = evaluations.reduce((sum, eval) => sum + eval.score, 0);
    const averageScore = evaluations.length ? totalScore / evaluations.length : 0;

    return {
      id: presentation.id,
      title: presentation.title,
      presenter: presentation.presenter,
      averageScore: parseFloat(averageScore.toFixed(2)), // Limita a 2 casas decimais
    };
  });
};

// WebSocket para atualizações em tempo real
io.on("connection", (socket) => {
  console.log("Novo cliente conectado:", socket.id);

  // Envia os resultados iniciais
  socket.emit("results", calculateAverageScores());

  // Atualiza os resultados a cada 5 segundos
  const interval = setInterval(() => {
    socket.emit("results", calculateAverageScores());
  }, 5000);

  // Remove o intervalo ao desconectar
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
    clearInterval(interval);
  });
});
