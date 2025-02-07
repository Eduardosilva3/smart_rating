const Redis = require('ioredis');
const redis = new Redis();

const PRESENTATIONS_KEY = 'presentations';

// Função para carregar apresentações do Redis
const loadPresentations = async () => {
  try {
    const data = await redis.get(PRESENTATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Erro ao carregar as apresentações do Redis:', err);
    return [];
  }
};

// Função para salvar apresentações no Redis
const savePresentations = async (presentations) => {
  try {
    await redis.set(PRESENTATIONS_KEY, JSON.stringify(presentations));
  } catch (err) {
    console.error('Erro ao salvar as apresentações no Redis:', err);
  }
};

// Variável presentations será carregada do Redis ao inicializar
let presentations = [];

loadPresentations().then((data) => {
  presentations = data;
});

// Atualize o modelo em 'presentationModel.js'

module.exports = {
  getPresentations: () => presentations,

  addPresentation: async (presentation) => {
    presentations.push({ ...presentation, totalDonations: 0 });  // Novo campo
    await savePresentations(presentations);
  },

  updatePresentation: async (id, updatedPresentation) => {
    presentations = presentations.map((p) =>
      p.id === id ? { ...p, ...updatedPresentation } : p
    );
    await savePresentations(presentations);
  },

  deletePresentation: async (id) => {
    presentations = presentations.filter((p) => p.id !== id);
    await savePresentations(presentations);
  },

  addDonation: async (id, amount) => {
    const presentation = presentations.find((p) => p.id === id);
    if (presentation) {
      presentation.totalDonations = (presentation.totalDonations || 0) + amount;
      await savePresentations(presentations);
      return presentation;
    }
    return null;
  },
};

