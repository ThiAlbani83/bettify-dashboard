import { create } from "zustand";

const useAnalyticsStore = create((set, get) => ({
  // Estado inicial
  statsTempoReal: null,
  prioridades: null,
  gruposPerigosos: [],
  alertasPorHora: [],
  pipeline: null,
  keywords: [],
  saudeDoSistema: null,
  infiltracaoStatus: null,
  loading: false,
  error: null,
  lastUpdate: null,

  // Ação para buscar stats em tempo real
  fetchStatsTempoReal: async () => {
    try {
      const response = await fetch(
        "http://72.60.49.22:8005/api/analytics/stats-tempo-real"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar stats em tempo real");
      }
      const data = await response.json();

      set({
        statsTempoReal: data,
        lastUpdate: new Date(),
      });
    } catch (error) {
      console.error("Erro ao buscar stats em tempo real:", error);
    }
  },

  // Ação para buscar prioridades
  fetchPrioridades: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        "http://72.60.49.22:8005/api/analytics/prioridades"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar prioridades");
      }
      const data = await response.json();

      set({
        prioridades: data,
        loading: false,
        lastUpdate: new Date(),
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
      console.error("Erro ao buscar prioridades:", error);
    }
  },

  // Ação para buscar grupos perigosos
  fetchGruposPerigosos: async () => {
    try {
      const response = await fetch(
        "http://72.60.49.22:8005/api/analytics/top-grupos"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar grupos perigosos");
      }
      const data = await response.json();

      set({
        gruposPerigosos: data,
        lastUpdate: new Date(),
      });
    } catch (error) {
      console.error("Erro ao buscar grupos perigosos:", error);
    }
  },

  // Ação para buscar alertas por hora
  fetchAlertasPorHora: async () => {
    try {
      const response = await fetch(
        "http://72.60.49.22:8005/api/analytics/alertas-por-hora"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar alertas por hora");
      }
      const data = await response.json();

      set({
        alertasPorHora: data,
        lastUpdate: new Date(),
      });
    } catch (error) {
      console.error("Erro ao buscar alertas por hora:", error);
    }
  },

  // Ação para buscar performance do pipeline
  fetchPipeline: async () => {
    try {
      const response = await fetch(
        "http://72.60.49.22:8005/api/analytics/pipeline-performance"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar pipeline");
      }
      const data = await response.json();

      set({
        pipeline: data,
        lastUpdate: new Date(),
      });
    } catch (error) {
      console.error("Erro ao buscar pipeline:", error);
    }
  },

  // Ação para buscar keywords
  fetchKeywords: async () => {
    try {
      const response = await fetch(
        "http://72.60.49.22:8005/api/analytics/keywords"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar keywords");
      }
      const data = await response.json();

      set({
        keywords: data,
        lastUpdate: new Date(),
      });
    } catch (error) {
      console.error("Erro ao buscar keywords:", error);
    }
  },

  // Ação para buscar saúde do sistema
  fetchSaudeDoSistema: async () => {
    try {
      const response = await fetch(
        "http://72.60.49.22:8005/api/analytics/saude-sistema"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar saúde do sistema");
      }
      const data = await response.json();

      set({
        saudeDoSistema: data,
        lastUpdate: new Date(),
      });
    } catch (error) {
      console.error("Erro ao buscar saúde do sistema:", error);
    }
  },

  // Ação para buscar status de infiltração
  fetchInfiltracaoStatus: async () => {
    try {
      const response = await fetch(
        "http://72.60.49.22:8005/api/analytics/infiltracao-status"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar status de infiltração");
      }
      const data = await response.json();

      set({
        infiltracaoStatus: data,
        lastUpdate: new Date(),
      });
    } catch (error) {
      console.error("Erro ao buscar status de infiltração:", error);
    }
  },

  // Ação para buscar todos os dados de analytics
  fetchAllAnalytics: async () => {
    const {
      fetchPrioridades,
      fetchGruposPerigosos,
      fetchAlertasPorHora,
      fetchPipeline,
      fetchKeywords,
      fetchSaudeDoSistema,
    } = get();

    await Promise.all([
      fetchPrioridades(),
      fetchGruposPerigosos(),
      fetchAlertasPorHora(),
      fetchPipeline(),
      fetchKeywords(),
      fetchSaudeDoSistema(),
    ]);
  },

  // Ação para limpar erros
  clearError: () => set({ error: null }),
}));

export default useAnalyticsStore;
