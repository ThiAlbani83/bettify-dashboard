const TopRiskGroups = () => {
  const riskGroups = [
    { name: "Consultas de cpf grátis", alerts: 36772 },
    { name: "🔍 CONSULTAS GRÁTIS 🔎", alerts: 26484 },
    { name: "🐉 DRAGON TIGER 🐯 [megaprime]", alerts: 19982 },
    { name: "BITDOG(比特犬)Global- [每日免费打卡1亿BITDOG]", alerts: 15389 },
    { name: "BAC BO 24 HORAS", alerts: 7946 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b-2 border-red-200 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          <h3 className="text-sm font-bold text-gray-900">
            Top Grupos de Risco
          </h3>
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-200">
        {riskGroups.map((group, index) => (
          <div
            key={index}
            className="px-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between gap-2"
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate">
                {group.name}
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-sm font-bold text-red-600">
                {group.alerts.toLocaleString()}
              </span>
              <span className="text-sm text-red-600">⚠</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t-2 border-gray-200 px-3 py-1.5">
        <p className="text-[12px] text-gray-700 font-semibold text-center">
          Últimos 7 dias • Total de{" "}
          {riskGroups.reduce((acc, g) => acc + g.alerts, 0).toLocaleString()}{" "}
          alertas
        </p>
      </div>
    </div>
  );
};

export default TopRiskGroups;
