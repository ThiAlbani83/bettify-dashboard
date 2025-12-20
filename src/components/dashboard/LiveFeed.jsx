import { useState, useEffect, useRef } from "react";

const LiveFeed = () => {
  const [messages, setMessages] = useState([]);
  const feedRef = useRef(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const initialMessages = [
    {
      time: "08:51:32",
      source: "🐉 DRAGON TIGER 🐯 [megaprime]",
      content: "🎲 ATENÇÃO, POSSÍVEL ENTRADA ! 🎲...",
      severity: null,
    },
    {
      time: "08:51:51",
      source: "🐉 DRAGON TIGER 🐯 [megaprime]",
      content:
        "✅ ENTRADA: 🔴 + 🟢 🎯 Entrar após: 🟡 🎲 Jogar até G2. 🤩 1 Greens Seguidos ✅ ...",
      severity: null,
    },
    {
      time: "08:52:13",
      source: "🐉 DRAGON TIGER 🐯 [megaprime]",
      content: "♻️ Gale 1 ✨ Tenha Gerenciamento!...",
      severity: null,
    },
    {
      time: "08:52:34",
      source: "🐉 DRAGON TIGER 🐯 [megaprime]",
      content: "♻️ Gale 2 ✨ Tenha Gerenciamento!...",
      severity: null,
    },
    {
      time: "08:52:36",
      source: "🔍 CONSULTAS GRÁTIS 🔎",
      content: "/nome Lucas Pachele Pereira...",
      severity: { n1: "0U 0K", n2: "phishing (55%)", n3: "MEDIA" },
    },
    {
      time: "08:52:36",
      source: "🔍 CONSULTAS GRÁTIS 🔎",
      content:
        "**🔘 SELECIONE UM BANCO DE DADOS!** **🔍 CONSULTA:** `Lucas Pachele Pereira`...",
      severity: { n1: "0U 0K", n2: "phishing (55%)", n3: "MEDIA" },
    },
    {
      time: "08:52:49",
      source: "🔍 CONSULTAS GRÁTIS 🔎",
      content: "/nome Lucas Pachele Pereira...",
      severity: null,
    },
    {
      time: "08:52:50",
      source: "🔍 CONSULTAS GRÁTIS 🔎",
      content:
        "**🔘 SELECIONE UM BANCO DE DADOS!** **🔍 CONSULTA:** `Lucas Pachele Pereira`...",
      severity: { n1: "0U 0K", n2: "phishing (55%)", n3: "MEDIA" },
    },
    {
      time: "08:53:04",
      source: "🐉 DRAGON TIGER 🐯 [megaprime]",
      content: "✨ Volte mais tarde!...",
      severity: null,
    },
    {
      time: "08:53:06",
      source: "🐉 DRAGON TIGER 🐯 [megaprime]",
      content: "🎲 ATENÇÃO, POSSÍVEL ENTRADA ! 🎲...",
      severity: null,
    },
    {
      time: "08:53:28",
      source: "🐉 DRAGON TIGER 🐯 [megaprime]",
      content:
        "✅ ENTRADA: 🔴 + 🟢 🎯 Entrar após: 🟡 🎲 Jogar até G2. 🤩 0 Greens Seguidos ✅ ...",
      severity: null,
    },
    {
      time: "08:53:29",
      source: "Consultas de cpf grátis",
      content: "/CPF `01590428951`...",
      severity: { n1: "0U 0K", n2: "vazamento_dados (55%)", n3: "MEDIA" },
    },
    {
      time: "08:53:29",
      source: "Consultas de cpf grátis",
      content:
        "**🔎 CONSULTA DE CPF 🔎** **🆔 CPF:** `01590428951` **👤 USUARIO:** @O Bode *...",
      severity: { n1: "0U 0K", n2: "vazamento_dados (55%)", n3: "MEDIA" },
    },
    {
      time: "08:53:33",
      source: "Cooperaçao 60% até 75% do montante",
      content: "...",
      severity: null,
    },
    {
      time: "08:53:33",
      source: "Cooperaçao 60% até 75% do montante",
      content: "...",
      severity: null,
    },
    {
      time: "08:53:33",
      source: "Cooperaçao 60% até 75% do montante",
      content:
        "🆕🆕🆕🆕🆕🆕   🅰️🅰️🅰️🅰️🅰️   🅰️🅰️🅰️ 💰 **MONTANTE DE  65%** 💰 💄**NÃO...",
      severity: { n1: "1U 0K", n2: "vazamento_dados (55%)", n3: "MEDIA" },
    },
    {
      time: "08:53:33",
      source: "Cooperaçao 60% até 75% do montante",
      content: "...",
      severity: null,
    },
    {
      time: "08:53:36",
      source: "Consultas de cpf grátis",
      content:
        "**🔎 CONSULTA REALIZADA COM SUCESSO** **Base:** CPF | CREDLINK** Clique no arq...",
      severity: { n1: "0U 0K", n2: "vazamento_dados (55%)", n3: "MEDIA" },
    },
    {
      time: "08:53:42",
      source: "Consultas de cpf grátis",
      content: "/placa LOO6B11...",
      severity: null,
    },
    {
      time: "08:53:42",
      source: "Consultas de cpf grátis",
      content:
        "**🔎 CONSULTA DE PLACA 🔎** **🆔 PLACA:** `LOO6B11` **👤 USUARIO:** @Daniel *...",
      severity: null,
    },
    {
      time: "08:53:50",
      source: "🐉 DRAGON TIGER 🐯 [megaprime]",
      content: "♻️ Gale 1 ✨ Tenha Gerenciamento!...",
      severity: null,
    },
  ];

  const newMessagesPool = [
    {
      source: "🐉 DRAGON TIGER 🐯 [megaprime]",
      content: "✅ GREEN! Parabéns! 🎉",
      severity: null,
    },
    {
      source: "Consultas de cpf grátis",
      content: "/CPF `12345678900`...",
      severity: { n1: "0U 0K", n2: "vazamento_dados (55%)", n3: "MEDIA" },
    },
    {
      source: "🔍 CONSULTAS GRÁTIS 🔎",
      content: "**🔎 NOVA CONSULTA PROCESSADA**",
      severity: { n1: "1U 0K", n2: "phishing (60%)", n3: "ALTA" },
    },
    {
      source: "Sistema de Alertas",
      content: "⚠️ Atividade suspeita detectada!",
      severity: { n1: "2U 0K", n2: "malware (75%)", n3: "ALTA" },
    },
    {
      source: "🐉 DRAGON TIGER 🐯 [megaprime]",
      content: "🎲 NOVA ENTRADA DISPONÍVEL! 🎲",
      severity: null,
    },
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage =
        newMessagesPool[Math.floor(Math.random() * newMessagesPool.length)];
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

      const newMessage = {
        time,
        source: randomMessage.source,
        content: randomMessage.content,
        severity: randomMessage.severity,
        isNew: true,
      };

      setMessages((prev) => [...prev, newMessage]);

      // Remove isNew flag after animation
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => ({ ...msg, isNew: false })));
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isAutoScroll && feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages, isAutoScroll]);

  const handleScroll = () => {
    if (feedRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = feedRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setIsAutoScroll(isAtBottom);
    }
  };

  const getSeverityColor = (n3) => {
    if (!n3) return "";
    if (n3.includes("ALTA")) return "text-red-600 bg-red-50";
    if (n3.includes("MEDIA")) return "text-orange-600 bg-orange-50";
    return "text-yellow-600 bg-yellow-50";
  };

  const getMessageDetails = (msg) => {
    // Gerar detalhes enriquecidos para a mensagem
    const now = new Date();
    const dateTime = `${now.toLocaleDateString("pt-BR")}, ${msg.time}`;

    const details = {
      dateTime,
      channel: msg.source,
      content: msg.content,
      sender: msg.source.includes("DRAGON")
        ? "BetBot"
        : msg.source.includes("Consultas")
        ? "HakaiBuscas"
        : "Sistema",
      urls: Math.floor(Math.random() * 3),
      keywords: Math.floor(Math.random() * 5),
      type: msg.severity?.n2?.split(" ")[0] || "normal",
      confidence: msg.severity?.n2?.match(/\d+/)?.[0] || "0",
      detectedWord: msg.content.includes("CPF")
        ? "cpf"
        : msg.content.includes("PLACA")
        ? "placa"
        : msg.content.includes("CONSULTA")
        ? "consulta"
        : "N/A",
      priority: msg.severity?.n3 || "BAIXA",
      score: msg.severity
        ? parseInt(msg.severity.n2?.match(/\d+/)?.[0] || "50")
        : 0,
      riskFactors: {
        severityType:
          msg.severity?.n3 === "ALTA"
            ? 18
            : msg.severity?.n3 === "MEDIA"
            ? 10
            : 5,
        aiConfidence: Math.floor(Math.random() * 10) + 5,
        criticalWords: Math.floor(Math.random() * 5),
        channelReoccurrence: Math.floor(Math.random() * 2000) + 100,
        userReoccurrence: Math.floor(Math.random() * 1000) + 50,
      },
    };

    return details;
  };

  return (
    <>
      {/* Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📨</span>
                  <h2 className="text-xl font-bold">DETALHES DA MENSAGEM</h2>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
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
              {(() => {
                const details = getMessageDetails(selectedMessage);
                return (
                  <>
                    {/* Data/Hora */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">📅</span>
                        <h3 className="font-semibold text-gray-800">
                          DATA/HORA
                        </h3>
                      </div>
                      <p className="text-gray-700 pl-7">{details.dateTime}</p>
                    </div>

                    {/* Canal */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">📡</span>
                        <h3 className="font-semibold text-gray-800">CANAL</h3>
                      </div>
                      <p className="text-gray-700 pl-7">{details.channel}</p>
                    </div>

                    {/* Conteúdo */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">💬</span>
                        <h3 className="font-semibold text-gray-800">
                          CONTEÚDO
                        </h3>
                      </div>
                      <div className="text-gray-700 pl-7 whitespace-pre-wrap break-words">
                        {details.content}
                        {selectedMessage.severity && (
                          <div className="mt-3 text-sm">
                            <p>
                              <strong>USUARIO:</strong> @{details.sender}
                            </p>
                            <p>
                              <strong>BOT:</strong> @HakaiSearchBot
                            </p>
                            <p>
                              <strong>CANAL:</strong> @HakaiSearchChannel
                            </p>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 pl-7 mt-2">
                        👤 Remetente: {details.sender}
                      </p>
                    </div>

                    {/* Análise Automatizada */}
                    {selectedMessage.severity && (
                      <>
                        <div className="border-t-2 border-gray-200 pt-4">
                          <h3 className="font-bold text-lg text-gray-800 mb-4">
                            🔍 ANÁLISE AUTOMATIZADA
                          </h3>
                        </div>

                        {/* Grid de 3 níveis lado a lado */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Nível 1 - Porteiro */}
                          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-3">
                              🟢 NÍVEL 1 - PORTEIRO
                            </h4>
                            <div className="space-y-1 text-sm text-gray-700">
                              <p>📎 URLs: {details.urls}</p>
                              <p>🔑 Keywords: {details.keywords}</p>
                            </div>
                          </div>

                          {/* Nível 2 - Inspector */}
                          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
                            <h4 className="font-semibold text-yellow-800 mb-3">
                              🟡 NÍVEL 2 - INSPECTOR
                            </h4>
                            <div className="space-y-1 text-sm text-gray-700">
                              <p>🏷️ Tipo: {details.type}</p>
                              <p>📊 Confiança: {details.confidence}%</p>
                              <p>
                                Detectado por palavra: {details.detectedWord}
                              </p>
                            </div>
                          </div>

                          {/* Nível 3 - IA/Juiz */}
                          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 mb-3">
                              🔴 NÍVEL 3 - IA/JUIZ
                            </h4>
                            <div className="space-y-1 text-sm text-gray-700">
                              <p>
                                ⚠️ Prioridade:{" "}
                                <span className="font-bold">
                                  {details.priority}
                                </span>
                              </p>
                              <p>📈 Score: {details.score}/100</p>
                            </div>
                          </div>
                        </div>

                        {/* Ação Urgente */}
                        {details.priority !== "BAIXA" && (
                          <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4">
                            <h4 className="font-bold text-red-800 mb-2">
                              🚨 AÇÃO URGENTE REQUERIDA
                            </h4>
                          </div>
                        )}

                        {/* Fatores de Risco */}
                        <div className="bg-gray-100 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-800 mb-3">
                            ⚠️ FATORES DE RISCO
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>
                              • Severidade tipo: +
                              {details.riskFactors.severityType}
                            </li>
                            <li>
                              • Confiança IA: +
                              {details.riskFactors.aiConfidence}
                            </li>
                            <li>
                              • Palavras críticas (
                              {details.riskFactors.criticalWords}): +
                              {details.riskFactors.criticalWords * 2}
                            </li>
                            <li>
                              • Canal reincidente (
                              {details.riskFactors.channelReoccurrence}x): +
                              {Math.floor(
                                details.riskFactors.channelReoccurrence / 100
                              )}
                            </li>
                            <li>
                              • Usuário reincidente (
                              {details.riskFactors.userReoccurrence}x): +
                              {Math.floor(
                                details.riskFactors.userReoccurrence / 100
                              )}
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-4 rounded-b-xl border-t border-gray-200">
              <button
                onClick={() => setSelectedMessage(null)}
                className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <h3 className="text-sm font-semibold text-gray-800">Live Feed</h3>
              <span className="text-xs text-gray-500">Tempo Real</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {messages.length} mensagens
              </span>
              <button
                onClick={() => setIsAutoScroll(!isAutoScroll)}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  isAutoScroll
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {isAutoScroll ? "🔴 Auto-scroll" : "Auto-scroll OFF"}
              </button>
            </div>
          </div>
        </div>

        {/* Feed Content */}
        <div
          ref={feedRef}
          onScroll={handleScroll}
          className="h-96 overflow-y-auto p-4 space-y-2 bg-gray-50"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              onClick={() => setSelectedMessage(msg)}
              className={`bg-white border border-gray-200 rounded-lg p-3 transition-all duration-300 hover:shadow-md cursor-pointer hover:border-blue-300 ${
                msg.isNew ? "animate-pulse bg-blue-50 border-blue-300" : ""
              }`}
            >
              {/* Message Header */}
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xs font-mono text-gray-500 whitespace-nowrap">
                  {msg.time}
                </span>
                <span className="text-xs font-semibold text-gray-700 flex-1">
                  {msg.source}
                </span>
              </div>

              {/* Message Content */}
              <div className="text-xs text-gray-600 pl-16 mb-2 break-words">
                {msg.content}
              </div>

              {/* Severity Info */}
              {msg.severity && (
                <div
                  className={`text-xs px-2 py-1.5 rounded ml-16 ${getSeverityColor(
                    msg.severity.n3
                  )}`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono">N1: {msg.severity.n1}</span>
                    <span className="font-mono">N2: {msg.severity.n2}</span>
                    <span className="font-mono font-semibold">
                      N3: {msg.severity.n3}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
          <p className="text-xs text-gray-500 text-center">
            Monitoramento ativo • Última atualização há poucos segundos
          </p>
        </div>
      </div>
    </>
  );
};

export default LiveFeed;
