import { create } from "zustand";

const useMessagesStore = create((set, get) => ({
  // Estado inicial
  messages: [],
  loading: false,
  error: null,
  lastUpdate: null,

  // Ação para buscar mensagens da API
  fetchMessages: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://72.60.49.22:8005/api/messages");
      if (!response.ok) {
        throw new Error("Erro ao buscar mensagens");
      }
      const data = await response.json();

      // Transformar dados da API para o formato do componente
      const formattedMessages = data.map((msg) => ({
        id: msg.id,
        msg_id: msg.msg_id,
        time: new Date(msg.data_hora).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        source: msg.canal,
        content: msg.texto,
        sender: msg.remetente,
        rawDate: msg.data_hora,
        severity: null, // Pode ser populado com dados de análise se houver
      }));

      // Ordenar mensagens pela data/hora (mais antigas primeiro, mais recentes no final)
      const sortedMessages = formattedMessages.sort(
        (a, b) => new Date(a.rawDate) - new Date(b.rawDate)
      );

      set({
        messages: sortedMessages,
        loading: false,
        lastUpdate: new Date(),
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
      console.error("Erro ao buscar mensagens:", error);
    }
  },

  // Ação para adicionar nova mensagem (útil para updates em tempo real)
  addMessage: (message) => {
    const currentMessages = get().messages;
    set({
      messages: [message, ...currentMessages].slice(0, 100), // Manter últimas 100
    });
  },

  // Ação para limpar mensagens
  clearMessages: () => set({ messages: [] }),

  // Ação para limpar erros
  clearError: () => set({ error: null }),
}));

export default useMessagesStore;
