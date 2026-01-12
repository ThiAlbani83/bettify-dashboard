import { useEffect } from "react";
import useTopGroupsStore from "../../store/topGroupsStore";

const TopRiskGroups = () => {
  const { topGroups, loading, error, fetchTopGroups } = useTopGroupsStore();

  // Buscar grupos ao montar o componente
  useEffect(() => {
    fetchTopGroups();

    // Atualizar a cada 60 segundos
    const interval = setInterval(() => {
      fetchTopGroups();
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchTopGroups]);

  // Calcular total de alertas (API retorna total_alertas)
  const totalAlerts = topGroups.reduce(
    (acc, g) => acc + (g.total_alertas || 0),
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-red-50 to-orange-50 border-b-2 border-red-200 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          <h3 className="text-sm font-bold text-gray-900">
            Top Grupos de Risco
          </h3>
        </div>
      </div>

      {/* Loading State */}
      {loading && topGroups.length === 0 && (
        <div className="px-3 py-4 text-center">
          <p className="text-xs text-gray-500">Carregando...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="px-3 py-3 bg-red-50">
          <p className="text-xs text-red-600 text-center">{error}</p>
        </div>
      )}

      {/* List */}
      {!loading && !error && topGroups.length === 0 && (
        <div className="px-3 py-4 text-center">
          <p className="text-xs text-gray-500">Nenhum grupo encontrado</p>
        </div>
      )}

      {topGroups.length > 0 && (
        <div className="divide-y divide-gray-200">
          {topGroups.map((group, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between gap-2"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate">
                  {group._id}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-sm font-bold text-red-600">
                  {(group.total_alertas || 0).toLocaleString()}
                </span>
                <span className="text-sm text-red-600">⚠</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {topGroups.length > 0 && (
        <div className="bg-gray-50 border-t-2 border-gray-200 px-3 py-1.5">
          <p className="text-[12px] text-gray-700 font-semibold text-center">
            Últimos 7 dias • Total de {totalAlerts.toLocaleString()} alertas
          </p>
        </div>
      )}
    </div>
  );
};

export default TopRiskGroups;
