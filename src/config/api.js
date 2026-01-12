// Configuração centralizada da API
// Em produção (Vercel), usa proxy reverso (/api)
// Em desenvolvimento, pode usar proxy do Vite ou URL direta
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const API_ENDPOINTS = {
  // Messages
  messages: `${API_BASE_URL}/api/messages`,

  // Media
  mediaRecent: `${API_BASE_URL}/api/media/recent`,

  // Stats
  stats: `${API_BASE_URL}/api/stats`,
  statsTopGroups: `${API_BASE_URL}/api/stats/top-groups`,

  // Analytics
  analyticsStatsTempoReal: `${API_BASE_URL}/api/analytics/stats-tempo-real`,
  analyticsPrioridades: `${API_BASE_URL}/api/analytics/prioridades`,
  analyticsTopGrupos: `${API_BASE_URL}/api/analytics/top-grupos`,
  analyticsAlertasPorHora: `${API_BASE_URL}/api/analytics/alertas-por-hora`,
  analyticsPipelinePerformance: `${API_BASE_URL}/api/analytics/pipeline-performance`,
  analyticsKeywords: `${API_BASE_URL}/api/analytics/keywords`,
  analyticsSaudeSistema: `${API_BASE_URL}/api/analytics/saude-sistema`,
  analyticsInfiltracao: `${API_BASE_URL}/api/analytics/infiltracao-status`,
};

// Helper para construir URL de arquivos
export const getMediaUrl = (path) => {
  return `${API_BASE_URL}${path}`;
};
