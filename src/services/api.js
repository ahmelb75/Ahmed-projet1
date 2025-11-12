import axios from "axios";

const API_URL = "https://greenvelvet.alwaysdata.net/pfc";
const TOKEN = "441b78ff5253d34377ed32a5fecb4eb9473c9956";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    token: TOKEN,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erreur API:", error);
    return Promise.reject(error);
  }
);

export const checklistAPI = {
  getAll: async () => {
    const response = await api.get("/checklists");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/checklist?id=${id}`);
    return response.data;
  },

  create: async (checklistData) => {
    const response = await api.post("/checklist/add", checklistData);
    return response.data;
  },

  update: async (payload) => {
    const response = await api.post("/checklist/update", payload);
    return response.data;
  },

  updateStatut: async (id, statut) => {
    console.log("🌀 Mise à jour statut checklist", id, "→", statut);
    const response = await api.get(`/checklist/statut?id=${id}&statut=${statut}`);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.get(`/checklist/delete?id=${id}`);
    return response.data;
  },

  deleteAll: async () => {
    try {
      const all = await api.get("/checklists");
      const list = all.data?.response || all.data?.result || [];

      for (const item of list) {
        if (item && (item.id !== undefined && item.id !== null)) {
          await api.get(`/checklist/delete?id=${item.id}`);
        }
      }

      return { done: true };
    } catch (error) {
      console.error("Erreur lors de la suppression complète:", error);
      return { done: false, error };
    }
  },

  ping: async () => {
    const response = await api.get("/ping");
    return response.data;
  },
};

export default api;
