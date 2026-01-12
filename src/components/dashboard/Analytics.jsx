import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import useAnalyticsStore from "../../store/analyticsStore";

const Analytics = () => {
  const {
    statsTempoReal,
    prioridades,
    gruposPerigosos,
    pipeline,
    saudeDoSistema,
    infiltracaoStatus,
    loading,
    error,
    fetchStatsTempoReal,
    fetchPrioridades,
    fetchGruposPerigosos,
    fetchPipeline,
    fetchSaudeDoSistema,
    fetchInfiltracaoStatus,
  } = useAnalyticsStore();

  // Buscar dados da API
  useEffect(() => {
    fetchStatsTempoReal();
    fetchPrioridades();
    fetchGruposPerigosos();
    fetchPipeline();
    fetchSaudeDoSistema();
    fetchInfiltracaoStatus();

    // Atualizar a cada 30 segundos
    const interval = setInterval(() => {
      fetchStatsTempoReal();
      fetchPrioridades();
      fetchGruposPerigosos();
      fetchPipeline();
      fetchSaudeDoSistema();
      fetchInfiltracaoStatus();
    }, 30000);

    return () => clearInterval(interval);
  }, [
    fetchStatsTempoReal,
    fetchPrioridades,
    fetchGruposPerigosos,
    fetchPipeline,
    fetchSaudeDoSistema,
    fetchInfiltracaoStatus,
  ]);

  // Transformar dados da API para o formato do gráfico
  const priorityData = prioridades
    ? [
        { name: "Crítica", value: prioridades.CRÍTICA || 0, color: "#dc2626" },
        { name: "Alta", value: prioridades.ALTA || 0, color: "#ef4444" },
        { name: "Média", value: prioridades.MÉDIA || 0, color: "#f59e0b" },
        { name: "Baixa", value: prioridades.BAIXA || 0, color: "#10b981" },
        { name: "Nenhuma", value: prioridades.NENHUMA || 0, color: "#6b7280" },
      ].filter((item) => item.value > 0) // Remover prioridades com valor 0
    : [];

  // Transformar dados da API para o formato do gráfico (Top 10 Grupos)
  const dangerousGroups =
    gruposPerigosos.length > 0
      ? gruposPerigosos.map((item) => ({
          name: item.grupo,
          alerts: item.alertas,
        }))
      : [];

  // Dados para Alertas por Hora
  const hourlyAlerts = Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, "0")}h`,
    alerts: Math.floor(Math.random() * 80) + 20,
  }));

  // Transformar dados da API para o formato do gráfico (Pipeline)
  const pipelineData = pipeline
    ? [
        { stage: "Nível 1", value: pipeline.nivel1_taxa },
        { stage: "Nível 2", value: pipeline.nivel2_taxa },
        { stage: "Nível 3", value: pipeline.nivel3_taxa },
        { stage: "Conversão Final", value: pipeline.conversao_final },
      ]
    : [];

  // Dados para Keywords
  const keywordsData = [
    { word: "cpf", count: 432 },
    { word: "vazamento", count: 298 },
    { word: "phishing", count: 245 },
    { word: "malware", count: 198 },
    { word: "dados", count: 187 },
    { word: "senha", count: 156 },
    { word: "banco", count: 143 },
    { word: "cartão", count: 128 },
  ];

  // Transformar dados da API para o formato do gráfico (Saúde do Sistema)
  const systemHealth = saudeDoSistema?.componentes
    ? Object.entries(saudeDoSistema.componentes).map(([key, value]) => {
        const metricNames = {
          gateway: "Gateway",
          celery: "Celery",
          mongodb: "MongoDB",
          redis: "Redis",
          ia_ollama: "IA Ollama",
        };
        return {
          metric: metricNames[key] || key,
          score: value.status === "online" ? 100 : 0,
        };
      })
    : [];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-xs font-semibold text-gray-800">
            {payload[0].payload.name || payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">📊</span>
        <h2 className="text-2xl font-bold text-gray-800">
          ANALYTICS & INTELIGÊNCIA
        </h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-4">
          <p className="text-xs font-bold text-gray-700 uppercase mb-2">
            Mensagens Hoje
          </p>
          <h3 className="text-3xl font-bold mb-1" style={{ color: "#66FCF1" }}>
            {statsTempoReal
              ? statsTempoReal.mensagens_hoje.toLocaleString("pt-BR")
              : "-"}
          </h3>
          <p className="text-xs text-green-700 font-semibold flex items-center gap-1">
            <span>↑</span> Em tempo real
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-4">
          <p className="text-xs font-bold text-gray-700 uppercase mb-2">
            Alertas Criados
          </p>
          <h3 className="text-3xl font-bold text-red-600 mb-1">
            {statsTempoReal
              ? statsTempoReal.alertas_criados.toLocaleString("pt-BR")
              : "-"}
          </h3>
          <p className="text-xs text-gray-700 font-semibold">↑ Últimas 24h</p>
        </div>

        <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-4">
          <p className="text-xs font-bold text-gray-700 uppercase mb-2">
            Taxa Conversão
          </p>
          <h3 className="text-3xl font-bold text-orange-600 mb-1">
            {statsTempoReal
              ? `${statsTempoReal.taxa_conversao.toFixed(1)}%`
              : "-"}
          </h3>
          <p className="text-xs text-gray-700 font-semibold">Alerta/Mensagem</p>
        </div>

        <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-4">
          <p className="text-xs font-bold text-gray-700 uppercase mb-2">
            Links Únicos
          </p>
          <h3 className="text-3xl font-bold text-purple-600 mb-1">
            {statsTempoReal
              ? statsTempoReal.links_unicos.toLocaleString("pt-BR")
              : "-"}
          </h3>
          <p className="text-xs text-gray-700 font-semibold">URLs diferentes</p>
        </div>

        <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-4">
          <p className="text-xs font-bold text-gray-700 uppercase mb-2">
            Infiltrados Hoje
          </p>
          <h3 className="text-3xl font-bold text-blue-600 mb-1">
            {statsTempoReal
              ? statsTempoReal.grupos_infiltrados.toLocaleString("pt-BR")
              : "-"}
          </h3>
          <p className="text-xs text-gray-700 font-semibold">Novos grupos</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Prioridade */}
        <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            📊 Distribuição por Prioridade
          </h3>
          {loading && !prioridades ? (
            <div className="flex items-center justify-center h-[250px]">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Carregando...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-[250px]">
              <p className="text-sm text-red-600">⚠️ Erro ao carregar dados</p>
            </div>
          ) : priorityData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px]">
              <p className="text-sm text-gray-500">Nenhum dado disponível</p>
            </div>
          )}
        </div>

        {/* Top 10 Grupos Perigosos */}
        <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            🚨 Top 10 Grupos Perigosos (7 dias)
          </h3>
          {loading && gruposPerigosos.length === 0 ? (
            <div className="flex items-center justify-center h-[250px]">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Carregando...</p>
              </div>
            </div>
          ) : dangerousGroups.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dangerousGroups} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" style={{ fontSize: "10px" }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  style={{ fontSize: "10px" }}
                />
                <Tooltip />
                <Bar dataKey="alerts" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px]">
              <p className="text-sm text-gray-500">Nenhum dado disponível</p>
            </div>
          )}
        </div>

        {/* Alertas por Hora */}
        <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            ⏰ Alertas por Hora (24h)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={hourlyAlerts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" style={{ fontSize: "10px" }} />
              <YAxis style={{ fontSize: "10px" }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="alerts"
                stroke="#66FCF1"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance do Pipeline */}
        <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            ⚙️ Performance do Pipeline
          </h3>
          {loading && !pipeline ? (
            <div className="flex items-center justify-center h-[250px]">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Carregando...</p>
              </div>
            </div>
          ) : pipelineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" style={{ fontSize: "10px" }} />
                <YAxis domain={[0, 100]} style={{ fontSize: "10px" }} />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px]">
              <p className="text-sm text-gray-500">Nenhum dado disponível</p>
            </div>
          )}
        </div>

        {/* Keywords Mais Detectadas */}
        <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            🔑 Keywords Mais Detectadas (24h)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={keywordsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="word" style={{ fontSize: "10px" }} />
              <YAxis style={{ fontSize: "10px" }} />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Saúde do Sistema */}
        <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            💚 Saúde do Sistema
          </h3>
          {loading && !saudeDoSistema ? (
            <div className="flex items-center justify-center h-[250px]">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Carregando...</p>
              </div>
            </div>
          ) : systemHealth.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={systemHealth}>
                  <PolarGrid />
                  <PolarAngleAxis
                    dataKey="metric"
                    style={{ fontSize: "11px" }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    style={{ fontSize: "10px" }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#66FCF1"
                    fill="#66FCF1"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
              <div className="text-center mt-4">
                <p className="text-xs text-gray-700 font-bold mb-1">
                  Score Geral
                </p>
                <p
                  className={`text-2xl font-bold ${
                    saudeDoSistema?.score >= 80
                      ? "text-green-600"
                      : saudeDoSistema?.score >= 50
                      ? "text-orange-600"
                      : "text-red-600"
                  }`}
                >
                  {saudeDoSistema?.score || 0}%
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-[250px]">
              <p className="text-sm text-gray-500">Nenhum dado disponível</p>
            </div>
          )}
        </div>
      </div>

      {/* Status de Infiltração */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow-md border-2 border-blue-300 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🕵️</span>
          <h3 className="text-lg font-bold text-gray-900">
            Status de Infiltração
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center border-2 border-gray-300 shadow-sm">
            <p className="text-xs text-gray-700 font-bold mb-2">
              Próximo Ciclo
            </p>
            <p className="text-2xl font-bold text-blue-600">
              {infiltracaoStatus
                ? infiltracaoStatus.proximo_ciclo_minutos
                : "-"}
            </p>
            <p className="text-xs text-gray-700 font-semibold">minutos</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border-2 border-gray-300 shadow-sm">
            <p className="text-xs text-gray-700 font-bold mb-2">
              Grupos na Fila
            </p>
            <p className="text-2xl font-bold text-orange-600">
              {infiltracaoStatus ? infiltracaoStatus.grupos_na_fila : "-"}
            </p>
            <p className="text-xs text-gray-700 font-semibold">aguardando</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border-2 border-gray-300 shadow-sm">
            <p className="text-xs text-gray-700 font-bold mb-2">
              Infiltrados Hoje
            </p>
            <p className="text-2xl font-bold text-green-600">
              {infiltracaoStatus
                ? `${infiltracaoStatus.grupos_infiltrados_hoje} / ${infiltracaoStatus.limite_diario}`
                : "-"}
            </p>
            <p className="text-xs text-gray-700 font-semibold">
              meta:{" "}
              {infiltracaoStatus
                ? `${Math.round(
                    (infiltracaoStatus.grupos_infiltrados_hoje /
                      infiltracaoStatus.limite_diario) *
                      100
                  )}%`
                : "-"}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border-2 border-gray-300 shadow-sm">
            <p className="text-xs text-gray-700 font-bold mb-2">
              Taxa de Sucesso
            </p>
            <p className="text-2xl font-bold text-green-600">
              {infiltracaoStatus ? `${infiltracaoStatus.taxa_sucesso}%` : "-"}
            </p>
            <p className="text-xs text-gray-700 font-semibold">últimas 24h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
