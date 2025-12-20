import React from "react";
import LiveFeed from "../components/dashboard/LiveFeed";
import MessageFlow from "../components/dashboard/MessageFlow";
import Analytics from "../components/dashboard/Analytics";
import TopRiskGroups from "../components/dashboard/TopRiskGroups";
import RecentMedia from "../components/dashboard/RecentMedia";

const Dashboard = () => {
  const kpis = [
    {
      title: "MENSAGENS (24H)",
      value: "125.186",
      icon: "📨",
      subtitle: "Tempo real",
      color: "#66FCF1",
      bgColor: "#f0fffe",
    },
    {
      title: "SEVERIDADE",
      value: "17",
      icon: "🚨",
      subtitle: "Alertas",
      color: "#ef4444",
      bgColor: "#fef2f2",
    },
    {
      title: "URLS SUSPEITAS",
      value: "5",
      icon: "🔗",
      subtitle: "Análise",
      color: "#f59e0b",
      bgColor: "#fffbeb",
    },
    {
      title: "GRUPOS ATIVOS",
      value: "369",
      icon: "👥",
      subtitle: "Monitorados",
      color: "#8b5cf6",
      bgColor: "#faf5ff",
    },
    {
      title: "USUÁRIOS",
      value: "17.314.554",
      icon: "👤",
      subtitle: "Ativos",
      color: "#3b82f6",
      bgColor: "#eff6ff",
    },
    {
      title: "LINKS CONVITE",
      value: "25",
      icon: "🔗",
      subtitle: "Novos",
      color: "#10b981",
      bgColor: "#f0fdf4",
    },
    {
      title: "PENDENTES",
      value: "0",
      icon: "⏳",
      subtitle: "Fila",
      color: "#6b7280",
      bgColor: "#f9fafb",
    },
  ];

  return (
    <div className="flex gap-6">
      {/* Main Content - Left Side */}
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-700 mt-2 font-medium">
            Visão geral do Command Center
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-300 overflow-hidden group"
            >
              {/* Color Bar */}
              <div
                className="h-1.5 w-full transition-all duration-300"
                style={{ backgroundColor: kpi.color }}
              ></div>

              <div className="p-4">
                {/* Icon and Title */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide mb-1">
                      {kpi.title}
                    </p>
                  </div>
                  <div
                    className="text-lg p-1.5 rounded-md transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: kpi.bgColor }}
                  >
                    {kpi.icon}
                  </div>
                </div>

                {/* Value */}
                <div className="mb-2">
                  <h2
                    className="text-2xl font-bold transition-colors duration-200"
                    style={{ color: kpi.color }}
                  >
                    {kpi.value}
                  </h2>
                </div>

                {/* Subtitle */}
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: kpi.color }}
                  ></div>
                  <p className="text-xs text-gray-700 font-semibold">
                    {kpi.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-white rounded-xl border-2 border-gray-300 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-sm text-gray-800 font-medium">
              Última atualização:{" "}
              <span className="font-bold text-gray-900">
                {new Date().toLocaleString("pt-BR")}
              </span>
            </p>
          </div>
        </div>

        {/* Message Flow Chart */}
        <div className="mt-6">
          <MessageFlow />
        </div>

        {/* Live Feed */}
        <div className="mt-6">
          <LiveFeed />
        </div>

        {/* Analytics & Intelligence */}
        <div className="mt-8">
          <Analytics />
        </div>
      </div>

      {/* Right Sidebar - Fixed */}
      <div className="hidden xl:block w-96 space-y-6">
        <div className="sticky top-6 space-y-6">
          <TopRiskGroups />
          <RecentMedia />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
