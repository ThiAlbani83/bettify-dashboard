import { create } from "zustand";
import { API_ENDPOINTS } from "../config/api";

const useAlertsStore = create((set, get) => ({
  // Estado inicial
  alerts: [],
  filteredAlerts: [],
  stats: {
    falso_positivo: 0,
    em_revisao: 0,
    confirmado: 0,
    novo: 0,
  },
  loading: false,
  error: null,
  lastUpdate: null,

  // Filtros
  textFilter: "",
  statusFilter: "todos", // todos, novo, em_revisao, falso_positivo, deletado

  // Ação para buscar alertas da API
  fetchAlerts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(API_ENDPOINTS.keywordAlerts);
      if (!response.ok) {
        throw new Error("Erro ao buscar alertas");
      }
      const data = await response.json();
      set({
        alerts: data,
        loading: false,
        lastUpdate: new Date(),
      });
      // Aplicar filtros após carregar os dados
      get().applyFilters();
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
      console.error("Erro ao buscar alertas:", error);
    }
  },

  // Ação para buscar estatísticas da API
  fetchStats: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.keywordAlertsStats);
      if (!response.ok) {
        throw new Error("Erro ao buscar estatísticas");
      }
      const data = await response.json();
      set({
        stats: data,
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    }
  },

  // Ação para definir filtro de texto
  setTextFilter: (text) => {
    set({ textFilter: text });
    get().applyFilters();
  },

  // Ação para definir filtro de status
  setStatusFilter: (status) => {
    set({ statusFilter: status });
    get().applyFilters();
  },

  // Ação para aplicar filtros
  applyFilters: () => {
    const { alerts, textFilter, statusFilter } = get();
    let filtered = [...alerts];

    // Filtrar por status
    if (statusFilter === "todos") {
      // Todos exceto deletados
      filtered = filtered.filter(
        (alert) => alert.status_auditoria !== "deletado",
      );
    } else if (statusFilter !== "todos") {
      filtered = filtered.filter(
        (alert) => alert.status_auditoria === statusFilter,
      );
    }

    // Filtrar por texto
    if (textFilter) {
      const searchText = textFilter.toLowerCase();
      filtered = filtered.filter(
        (alert) =>
          (alert.palavras_encontradas &&
            alert.palavras_encontradas.some((palavra) =>
              palavra.toLowerCase().includes(searchText),
            )) ||
          (alert.mensagem_texto &&
            alert.mensagem_texto.toLowerCase().includes(searchText)) ||
          (alert.canal && alert.canal.toLowerCase().includes(searchText)) ||
          (alert.remetente &&
            alert.remetente.toLowerCase().includes(searchText)),
      );
    }

    // Ordenar por data (mais recente primeiro)
    filtered.sort((a, b) => {
      const dateA = new Date(a.data_hora || a.created_at || 0);
      const dateB = new Date(b.data_hora || b.created_at || 0);
      return dateB - dateA; // Ordem decrescente (mais recente primeiro)
    });

    set({ filteredAlerts: filtered });
  },

  // Ação para limpar erros
  clearError: () => set({ error: null }),

  // Ação para limpar filtros
  clearFilters: () => {
    set({ textFilter: "", statusFilter: "todos" });
    get().applyFilters();
  },

  // Ação para atualizar status de um alerta
  updateAlertStatus: async (alertId, newStatus) => {
    try {
      const response = await fetch(
        API_ENDPOINTS.keywordAlertUpdateStatus(alertId),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar status do alerta");
      }

      // Atualizar o alerta localmente
      const { alerts } = get();
      const updatedAlerts = alerts.map((alert) =>
        alert.id === alertId || alert.mensagem_id === alertId
          ? { ...alert, status_auditoria: newStatus }
          : alert,
      );

      set({ alerts: updatedAlerts });
      get().applyFilters();

      // Atualizar estatísticas
      await get().fetchStats();

      return true;
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      return false;
    }
  },

  // Ação para deletar um alerta
  deleteAlert: async (alertId) => {
    try {
      const response = await fetch(API_ENDPOINTS.keywordAlertDelete(alertId), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar alerta");
      }

      // Remover o alerta localmente
      const { alerts } = get();
      const updatedAlerts = alerts.filter(
        (alert) => alert.id !== alertId && alert.mensagem_id !== alertId,
      );

      set({ alerts: updatedAlerts });
      get().applyFilters();

      // Atualizar estatísticas
      await get().fetchStats();

      return true;
    } catch (error) {
      console.error("Erro ao deletar alerta:", error);
      return false;
    }
  },
}));

export default useAlertsStore;
