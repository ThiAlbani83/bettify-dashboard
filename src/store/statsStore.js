import { create } from "zustand";

const useStatsStore = create((set) => ({
  // Estado inicial
  stats: {
    total_mensagens: 0,
    total_alertas: 0,
    alertas_criticos: 0,
    total_grupos: 0,
    total_membros_monitorados: 0,
    total_midias: 0,
    total_links: 0,
    links_pendentes: 0,
  },
  loading: false,
  error: null,
  lastUpdate: null,

  // Ação para buscar estatísticas da API
  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://72.60.49.22:8005/api/stats");
      if (!response.ok) {
        throw new Error("Erro ao buscar estatísticas");
      }
      const data = await response.json();
      set({
        stats: data,
        loading: false,
        lastUpdate: new Date(),
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
      console.error("Erro ao buscar estatísticas:", error);
    }
  },

  // Ação para limpar erros
  clearError: () => set({ error: null }),
}));

export default useStatsStore;
