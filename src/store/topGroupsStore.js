import { create } from "zustand";

const useTopGroupsStore = create((set) => ({
  // Estado inicial
  topGroups: [],
  loading: false,
  error: null,
  lastUpdate: null,

  // Ação para buscar top grupos da API
  fetchTopGroups: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        "http://72.60.49.22:8005/api/stats/top-groups"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar top grupos de risco");
      }
      const data = await response.json();
      set({
        topGroups: data,
        loading: false,
        lastUpdate: new Date(),
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
      console.error("Erro ao buscar top grupos:", error);
    }
  },

  // Ação para limpar erros
  clearError: () => set({ error: null }),
}));

export default useTopGroupsStore;
