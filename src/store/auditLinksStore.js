import { create } from "zustand";
import { API_ENDPOINTS } from "../config/api";

const useAuditLinksStore = create((set, get) => ({
  // Estado inicial
  links: [],
  filteredLinks: [],
  stats: {
    total: 0,
    pendentes: 0,
    usados: 0,
    invalidos: 0,
    duplicados: 0,
  },
  loading: false,
  error: null,
  lastUpdate: null,

  // Filtros
  urlFilter: "",
  statusFilter: "todos", // todos, novo, em_revisao, falso_positivo, confirmado
  classificacaoFilter: "todas", // todas, aposta, fraude, suspeita

  // Ação para buscar links da API
  fetchLinks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(API_ENDPOINTS.auditLinks);
      if (!response.ok) {
        throw new Error("Erro ao buscar links");
      }
      const data = await response.json();
      // Mapear a nova estrutura para a estrutura esperada
      const links = (data.links || data).map((link) => ({
        ...link,
        id: link._id,
        url: link.link,
        canal: link.origem_canal,
        identificador: link.identificador,
        tipo: link.tipo_link,
        status_auditoria: link.status || "pendente",
        ja_participa: link.ja_participa || false,
        usado: link.usado || false,
      }));
      set({
        links: links,
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
      console.error("Erro ao buscar links:", error);
    }
  },

  // Ação para buscar estatísticas da API
  fetchStats: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.auditLinksStats);
      if (!response.ok) {
        throw new Error("Erro ao buscar estatísticas");
      }
      const data = await response.json();
      set({
        stats: {
          total: data.total || 0,
          pendentes: data.pendentes || 0,
          usados: data.usados || 0,
          invalidos: data.invalidos || 0,
          duplicados: data.duplicados || 0,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    }
  },

  // Ação para definir filtro de URL
  setUrlFilter: (url) => {
    set({ urlFilter: url });
    get().applyFilters();
  },

  // Ação para definir filtro de status
  setStatusFilter: (status) => {
    set({ statusFilter: status });
    get().applyFilters();
  },

  // Ação para definir filtro de classificação
  setClassificacaoFilter: (classificacao) => {
    set({ classificacaoFilter: classificacao });
    get().applyFilters();
  },

  // Ação para aplicar filtros
  applyFilters: () => {
    const { links, urlFilter, statusFilter, classificacaoFilter } = get();
    let filtered = [...links];

    // Filtrar por status
    if (statusFilter === "todos") {
      // Todos exceto deletados
      filtered = filtered.filter(
        (link) => link.status_auditoria !== "deletado",
      );
    } else if (statusFilter !== "todos") {
      filtered = filtered.filter(
        (link) => link.status_auditoria === statusFilter,
      );
    }

    // Filtrar por classificação
    if (classificacaoFilter !== "todas") {
      filtered = filtered.filter((link) => {
        const classificacao = link.classificacao?.toLowerCase() || "";
        return classificacao.includes(classificacaoFilter.toLowerCase());
      });
    }

    // Filtrar por URL
    if (urlFilter) {
      const searchText = urlFilter.toLowerCase();
      filtered = filtered.filter(
        (link) =>
          (link.url && link.url.toLowerCase().includes(searchText)) ||
          (link.contexto && link.contexto.toLowerCase().includes(searchText)),
      );
    }

    // Ordenar por data (mais recente primeiro)
    filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp || a.created_at || 0);
      const dateB = new Date(b.timestamp || b.created_at || 0);
      return dateB - dateA; // Ordem decrescente (mais recente primeiro)
    });

    set({ filteredLinks: filtered });
  },

  // Ação para limpar erros
  clearError: () => set({ error: null }),

  // Ação para limpar filtros
  clearFilters: () => {
    set({ urlFilter: "", statusFilter: "todos", classificacaoFilter: "todas" });
    get().applyFilters();
  },

  // Ação para atualizar status de um link
  updateLinkStatus: async (linkId, newStatus) => {
    try {
      const response = await fetch(
        API_ENDPOINTS.auditLinkUpdateStatus(linkId),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar status do link");
      }

      // Atualizar o link localmente
      const { links } = get();
      const updatedLinks = links.map((link) =>
        (link.id || link._id) === linkId
          ? { ...link, status_auditoria: newStatus }
          : link,
      );

      set({ links: updatedLinks });
      get().applyFilters();

      return true;
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      return false;
    }
  },

  // Ação para deletar um link
  deleteLink: async (linkId) => {
    try {
      const response = await fetch(API_ENDPOINTS.auditLinkDelete(linkId), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar link");
      }

      // Remover o link localmente
      const { links } = get();
      const updatedLinks = links.filter(
        (link) => (link.id || link._id) !== linkId,
      );

      set({ links: updatedLinks });
      get().applyFilters();

      return true;
    } catch (error) {
      console.error("Erro ao deletar link:", error);
      return false;
    }
  },
}));

export default useAuditLinksStore;
