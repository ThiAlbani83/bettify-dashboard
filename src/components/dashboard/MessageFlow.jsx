import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MessageFlow = () => {
  const [timeRange, setTimeRange] = useState("24h");

  const timeRanges = [
    { label: "6 horas", value: "6h" },
    { label: "12 horas", value: "12h" },
    { label: "24 horas", value: "24h" },
    { label: "48 horas", value: "48h" },
    { label: "3 dias", value: "3d" },
    { label: "7 dias", value: "7d" },
  ];

  // Gerar dados simulados baseado no período selecionado
  const generateData = (range) => {
    let points;
    let labelFormat;

    switch (range) {
      case "6h":
        points = 24; // A cada 15 minutos
        labelFormat = (i) =>
          `${String(Math.floor(i / 4)).padStart(2, "0")}:${String(
            (i % 4) * 15
          ).padStart(2, "0")}`;
        break;
      case "12h":
        points = 24; // A cada 30 minutos
        labelFormat = (i) =>
          `${String(Math.floor(i / 2)).padStart(2, "0")}:${String(
            (i % 2) * 30
          ).padStart(2, "0")}`;
        break;
      case "24h":
        points = 24; // A cada hora
        labelFormat = (i) => `${String(i).padStart(2, "0")}:00`;
        break;
      case "48h":
        points = 48; // A cada hora
        labelFormat = (i) => {
          const day = Math.floor(i / 24);
          const hour = i % 24;
          return day === 0 ? `Hoje ${hour}h` : `Ontem ${hour}h`;
        };
        break;
      case "3d":
        points = 36; // A cada 2 horas
        labelFormat = (i) => {
          const day = Math.floor(i / 12);
          const hour = (i % 12) * 2;
          return `D-${2 - day} ${hour}h`;
        };
        break;
      case "7d":
        points = 28; // A cada 6 horas
        labelFormat = (i) => {
          const day = Math.floor(i / 4);
          return day === 0 ? "Hoje" : `D-${7 - day}`;
        };
        break;
      default:
        points = 24;
        labelFormat = (i) => `${i}h`;
    }

    const data = [];
    for (let i = 0; i < points; i++) {
      // Criar padrão de onda mais realista
      const baseValue = 1000 + Math.sin(i * 0.5) * 300;
      const randomVariation = Math.random() * 400;
      const timeOfDayFactor =
        range.includes("h") && points === 24
          ? Math.sin(((i - 6) * Math.PI) / 12) * 500 + 500 // Pico durante o dia
          : 0;

      data.push({
        time: labelFormat(i),
        messages: Math.floor(baseValue + randomVariation + timeOfDayFactor),
        alerts: Math.floor(
          (baseValue + randomVariation + timeOfDayFactor) * 0.05
        ),
      });
    }
    return data;
  };

  const data = generateData(timeRange);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-xs font-semibold text-gray-800 mb-1">
            {payload[0].payload.time}
          </p>
          <p className="text-xs text-blue-600">
            📨 Mensagens:{" "}
            <span className="font-bold">
              {payload[0].value.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-red-600">
            🚨 Alertas:{" "}
            <span className="font-bold">
              {payload[1].value.toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Fluxo de Mensagens
              </h3>
              <p className="text-xs text-gray-500">
                Monitoramento temporal de atividade
              </p>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                  timeRange === range.value
                    ? "text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor:
                    timeRange === range.value ? "#66FCF1" : undefined,
                }}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6 bg-gray-50">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#66FCF1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#66FCF1" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              style={{ fontSize: "11px" }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: "11px" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="messages"
              stroke="#66FCF1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMessages)"
              name="Mensagens"
            />
            <Area
              type="monotone"
              dataKey="alerts"
              stroke="#ef4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAlerts)"
              name="Alertas"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Total Mensagens</p>
            <p className="text-lg font-bold" style={{ color: "#66FCF1" }}>
              {data
                .reduce((acc, curr) => acc + curr.messages, 0)
                .toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Total Alertas</p>
            <p className="text-lg font-bold text-red-600">
              {data
                .reduce((acc, curr) => acc + curr.alerts, 0)
                .toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Média/Período</p>
            <p className="text-lg font-bold text-gray-800">
              {Math.floor(
                data.reduce((acc, curr) => acc + curr.messages, 0) / data.length
              ).toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Pico Máximo</p>
            <p className="text-lg font-bold text-gray-800">
              {Math.max(...data.map((d) => d.messages)).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageFlow;
