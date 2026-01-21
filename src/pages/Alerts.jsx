import React, { useEffect, useState } from "react";
import useAlertsStore from "../store/alertsStore";

const Alerts = () => {
  const {
    filteredAlerts,
    stats,
    loading,
    error,
    textFilter,
    statusFilter,
    fetchAlerts,
    fetchStats,
    setTextFilter,
    setStatusFilter,
    clearFilters,
    updateAlertStatus,
    deleteAlert,
  } = useAlertsStore();

  const [actionLoading, setActionLoading] = useState({});
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Buscar alertas ao montar o componente
  useEffect(() => {
    fetchAlerts();
    fetchStats();

    // Atualizar a cada 30 segundos
    const interval = setInterval(() => {
      fetchAlerts();
      fetchStats();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchAlerts, fetchStats]);

  // Função para mudar status
  const handleStatusChange = async (alertId, newStatus) => {
    setActionLoading({ ...actionLoading, [alertId]: true });
    const success = await updateAlertStatus(alertId, newStatus);
    if (success) {
      // Status atualizado com sucesso
    }
    setActionLoading({ ...actionLoading, [alertId]: false });
  };

  // Função para deletar alerta
  const handleDelete = async (alertId) => {
    if (window.confirm("Tem certeza que deseja deletar este alerta?")) {
      setActionLoading({ ...actionLoading, [alertId]: true });
      const success = await deleteAlert(alertId);
      if (success) {
        // Alerta deletado com sucesso
      }
      setActionLoading({ ...actionLoading, [alertId]: false });
    }
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Função para obter a cor do badge de status
  const getStatusBadge = (status) => {
    const badges = {
      novo: {
        label: "Novo",
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-300",
      },
      em_revisao: {
        label: "Em Revisão",
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-300",
      },
      falso_positivo: {
        label: "Falso Positivo",
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-300",
      },
      deletado: {
        label: "Deletado",
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-300",
      },
    };

    const badge = badges[status] || badges.novo;
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}
      >
        {badge.label}
      </span>
    );
  };

  // Função para obter badge de severidade
  const getSeverityBadge = (severity) => {
    const badges = {
      alta: {
        label: "Alta",
        bg: "bg-red-100",
        text: "text-red-800",
        icon: "🚨",
      },
      media: {
        label: "Média",
        bg: "bg-orange-100",
        text: "text-orange-800",
        icon: "⚠️",
      },
      baixa: {
        label: "Baixa",
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: "ℹ️",
      },
    };

    const badge = badges[severity?.toLowerCase()] || badges.baixa;
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text} inline-flex items-center gap-1`}
      >
        <span>{badge.icon}</span>
        {badge.label}
      </span>
    );
  };

  return (
    <>
      {/* Modal de Detalhes do Alerta */}
      {selectedAlert && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAlert(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔔</span>
                  <h2 className="text-xl font-bold">DETALHES DO ALERTA</h2>
                </div>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* ID da Mensagem */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🆔</span>
                  <h3 className="font-semibold text-gray-800">
                    ID DA MENSAGEM
                  </h3>
                </div>
                <p className="text-gray-700 pl-7 font-mono">
                  #{selectedAlert.mensagem_id || selectedAlert.id}
                </p>
              </div>

              {/* Data/Hora */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📅</span>
                  <h3 className="font-semibold text-gray-800">DATA/HORA</h3>
                </div>
                <p className="text-gray-700 pl-7">
                  {formatDate(
                    selectedAlert.data_hora || selectedAlert.created_at,
                  )}
                </p>
              </div>

              {/* Canal */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📡</span>
                  <h3 className="font-semibold text-gray-800">CANAL</h3>
                </div>
                <p className="text-gray-700 pl-7">
                  {selectedAlert.canal || "-"}
                </p>
              </div>

              {/* Remetente */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">👤</span>
                  <h3 className="font-semibold text-gray-800">REMETENTE</h3>
                </div>
                <p className="text-gray-700 pl-7">
                  {selectedAlert.remetente || "-"}
                </p>
              </div>

              {/* Palavras-chave Detectadas */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🔑</span>
                  <h3 className="font-semibold text-yellow-800">
                    PALAVRAS-CHAVE DETECTADAS
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 pl-7">
                  {selectedAlert.palavras_encontradas &&
                  selectedAlert.palavras_encontradas.length > 0 ? (
                    selectedAlert.palavras_encontradas.map((palavra, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold border border-purple-300"
                      >
                        {palavra}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">
                      Nenhuma palavra-chave detectada
                    </span>
                  )}
                </div>
              </div>

              {/* Conteúdo da Mensagem */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💬</span>
                  <h3 className="font-semibold text-gray-800">
                    CONTEÚDO DA MENSAGEM
                  </h3>
                </div>
                <div className="text-gray-700 pl-7 whitespace-pre-wrap break-words bg-white p-4 rounded border border-gray-200">
                  {selectedAlert.mensagem_texto || "-"}
                </div>
              </div>

              {/* Status Atual */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">📊</span>
                  <h3 className="font-semibold text-blue-800">STATUS ATUAL</h3>
                </div>
                <div className="pl-7">
                  {getStatusBadge(selectedAlert.status_auditoria || "novo")}
                </div>
              </div>

              {/* Informações de Auditoria */}
              {selectedAlert.auditor && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🔍</span>
                    <h3 className="font-semibold text-gray-800">AUDITORIA</h3>
                  </div>
                  <div className="text-sm text-gray-700 pl-7 space-y-1">
                    <p>
                      <strong>Auditor:</strong> {selectedAlert.auditor}
                    </p>
                    {selectedAlert.auditado_em && (
                      <p>
                        <strong>Auditado em:</strong>{" "}
                        {formatDate(selectedAlert.auditado_em)}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-4 rounded-b-xl border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedAlert(null)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-4xl">🔔</span>
            Alertas por Palavras-chave
          </h1>
          <p className="text-gray-600 mt-2">
            Monitore e gerencie alertas detectados por palavras-chave
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Novo */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-300 overflow-hidden">
            <div className="h-1.5 w-full bg-blue-500"></div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Novos
                  </p>
                </div>
                <div className="text-lg p-2 rounded-md bg-blue-50">🆕</div>
              </div>
              <h2 className="text-3xl font-bold text-blue-600">
                {stats.novo.toLocaleString("pt-BR")}
              </h2>
              <p className="text-xs text-gray-500 mt-1">Alertas pendentes</p>
            </div>
          </div>

          {/* Em Revisão */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-300 overflow-hidden">
            <div className="h-1.5 w-full bg-yellow-500"></div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Em Revisão
                  </p>
                </div>
                <div className="text-lg p-2 rounded-md bg-yellow-50">🔍</div>
              </div>
              <h2 className="text-3xl font-bold text-yellow-600">
                {stats.em_revisao.toLocaleString("pt-BR")}
              </h2>
              <p className="text-xs text-gray-500 mt-1">Sendo analisados</p>
            </div>
          </div>

          {/* Confirmado */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-300 overflow-hidden">
            <div className="h-1.5 w-full bg-red-500"></div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Confirmados
                  </p>
                </div>
                <div className="text-lg p-2 rounded-md bg-red-50">✅</div>
              </div>
              <h2 className="text-3xl font-bold text-red-600">
                {stats.confirmado.toLocaleString("pt-BR")}
              </h2>
              <p className="text-xs text-gray-500 mt-1">Alertas válidos</p>
            </div>
          </div>

          {/* Falso Positivo */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-300 overflow-hidden">
            <div className="h-1.5 w-full bg-green-500"></div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Falso Positivo
                  </p>
                </div>
                <div className="text-lg p-2 rounded-md bg-green-50">❌</div>
              </div>
              <h2 className="text-3xl font-bold text-green-600">
                {stats.falso_positivo.toLocaleString("pt-BR")}
              </h2>
              <p className="text-xs text-gray-500 mt-1">Não são ameaças</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Campo de busca por texto */}
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                🔍 Buscar por texto
              </label>
              <input
                id="search"
                type="text"
                placeholder="Buscar por palavra-chave, mensagem, canal ou remetente..."
                value={textFilter}
                onChange={(e) => setTextFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Select de status */}
            <div className="lg:w-64">
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                📊 Status
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white cursor-pointer"
              >
                <option value="todos">Todos (Exceto Deletados)</option>
                <option value="novo">Novo</option>
                <option value="em_revisao">Em Revisão</option>
                <option value="falso_positivo">Falso Positivo</option>
                <option value="deletado">Deletado</option>
              </select>
            </div>

            {/* Botão para limpar filtros */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap"
              >
                🔄 Limpar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Loading/Error States */}
        {loading && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 font-medium flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              Carregando alertas...
            </p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium flex items-center gap-2">
              <span>❌</span>
              Erro: {error}
            </p>
          </div>
        )}

        {/* Tabela de Alertas */}
        <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full table-auto">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    ID
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    Palavras-chave
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    Mensagem
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    Canal
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    Remetente
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    Data
                  </th>
                  <th className="px-3 py-4 text-center text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAlerts.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-6xl">📭</span>
                        <p className="text-lg font-medium">
                          Nenhum alerta encontrado
                        </p>
                        <p className="text-sm">
                          Tente ajustar os filtros para ver mais resultados
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAlerts.map((alert, index) => (
                    <tr
                      key={alert.id || index}
                      onClick={() => setSelectedAlert(alert)}
                      className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    >
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-xs font-mono text-gray-900">
                          #{alert.mensagem_id || alert.id || index + 1}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {alert.palavras_encontradas &&
                          alert.palavras_encontradas.length > 0 ? (
                            alert.palavras_encontradas.map((palavra, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold"
                              >
                                {palavra}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <p className="text-xs text-gray-900 line-clamp-2 max-w-xs">
                          {alert.mensagem_texto || "-"}
                        </p>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-xs text-gray-900">
                          {alert.canal || "-"}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-xs text-gray-900">
                          {alert.remetente || "-"}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {getStatusBadge(alert.status_auditoria || "novo")}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-xs text-gray-600">
                          {formatDate(alert.data_hora || alert.created_at)}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div
                          className="flex items-center justify-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Dropdown de Status */}
                          <select
                            value={alert.status_auditoria || "novo"}
                            onChange={(e) =>
                              handleStatusChange(
                                alert.id || alert.mensagem_id,
                                e.target.value,
                              )
                            }
                            disabled={
                              actionLoading[alert.id || alert.mensagem_id]
                            }
                            className="px-3 py-1.5 text-xs border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="novo">Novo</option>
                            <option value="em_revisao">Em Revisão</option>
                            <option value="confirmado">Confirmado</option>
                            <option value="falso_positivo">
                              Falso Positivo
                            </option>
                          </select>

                          {/* Botão Deletar */}
                          <button
                            onClick={() =>
                              handleDelete(alert.id || alert.mensagem_id)
                            }
                            disabled={
                              actionLoading[alert.id || alert.mensagem_id]
                            }
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                            title="Deletar alerta"
                          >
                            {actionLoading[alert.id || alert.mensagem_id] ? (
                              <span className="animate-spin">⏳</span>
                            ) : (
                              <>🗑️</>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer com estatísticas */}
        {filteredAlerts.length > 0 && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-gray-300">
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Total exibido:</span>
                <span className="font-bold text-gray-800">
                  {filteredAlerts.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Novos:</span>
                <span className="font-bold text-blue-600">
                  {
                    filteredAlerts.filter((a) => a.status_auditoria === "novo")
                      .length
                  }
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Em Revisão:</span>
                <span className="font-bold text-yellow-600">
                  {
                    filteredAlerts.filter(
                      (a) => a.status_auditoria === "em_revisao",
                    ).length
                  }
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Falso Positivo:</span>
                <span className="font-bold text-green-600">
                  {
                    filteredAlerts.filter(
                      (a) => a.status_auditoria === "falso_positivo",
                    ).length
                  }
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Alerts;
