import { create } from "zustand";

const useMediaStore = create((set, get) => ({
  // Estado inicial
  recentMedia: [],
  loading: false,
  error: null,
  lastUpdate: null,

  // Ação para buscar mídias recentes
  fetchRecentMedia: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://72.60.49.22:8005/api/media/recent");
      if (!response.ok) {
        throw new Error("Erro ao buscar mídias recentes");
      }
      const data = await response.json();

      set({
        recentMedia: data,
        loading: false,
        lastUpdate: new Date(),
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
      console.error("Erro ao buscar mídias recentes:", error);
    }
  },

  // Ação para limpar erros
  clearError: () => set({ error: null }),
}));

export default useMediaStore;
