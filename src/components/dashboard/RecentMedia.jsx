import { useState, useEffect } from "react";
import useMediaStore from "../../store/mediaStore";

const RecentMedia = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const { recentMedia, loading, error, fetchRecentMedia } = useMediaStore();

  // Buscar mídias recentes da API
  useEffect(() => {
    fetchRecentMedia();

    // Atualizar a cada 30 segundos
    const interval = setInterval(() => {
      fetchRecentMedia();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchRecentMedia]);

  // Função para formatar tipo de mídia
  const formatMediaType = (tipo) => {
    const types = {
      imagem: "IMG",
      video: "VID",
      audio: "AUD",
      documento: "DOC",
    };
    return types[tipo] || "MEDIA";
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Agora";
    if (diffMins < 60) return `Há ${diffMins} min`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Há ${diffHours}h`;
    return date.toLocaleDateString("pt-BR");
  };

  const mediaItems = [
    {
      id: 1,
      type: "IMG",
      channel: "Cooperaçao 60% até 75% do montante",
      status: "pending",
      text: "Sem texto...",
      extracted: null,
      score: "N/A",
    },
    {
      id: 2,
      type: "IMG",
      channel: "Cooperaçao 60% até 75% do montante",
      status: "pending",
      text: "Sem texto...",
      extracted: null,
      score: "N/A",
    },
    {
      id: 3,
      type: "IMG",
      channel: "Cooperaçao 60% até 75% do montante",
      status: "pending",
      text: "Sem texto...",
      extracted: null,
      score: "N/A",
    },
    {
      id: 4,
      type: "IMG",
      channel: "Cooperaçao 60% até 75% do montante",
      status: "pending",
      text: "Sem texto...",
      extracted: null,
      score: "N/A",
    },
    {
      id: 5,
      type: "IMG",
      channel: "Cooperaçao 60% até 75% do montante",
      status: "pending",
      text: "Sem texto...",
      extracted: null,
      score: "N/A",
    },
    {
      id: 6,
      type: "IMG",
      channel: "Cooperaçao 60% até 75% do montante",
      status: "pending",
      text: "Sem texto...",
      extracted: null,
      score: "N/A",
    },
  ];

  return (
    <>
      {/* Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🖼️</span>
                  <h2 className="text-xl font-bold">DETALHES DA MÍDIA</h2>
                </div>
                <button
                  onClick={() => setSelectedMedia(null)}
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
              <p className="text-sm mt-2 opacity-90">
                Canal: {selectedMedia.canal}
              </p>
              <p className="text-xs mt-1 opacity-80">
                Remetente: {selectedMedia.remetente} |{" "}
                {formatDate(selectedMedia.data_hora)}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Preview */}
              <div className="bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300">
                {selectedMedia.tipo === "imagem" ? (
                  <img
                    src={`http://72.60.49.22:8005${selectedMedia.arquivo_path}`}
                    alt={selectedMedia.arquivo_nome}
                    className="w-full h-auto max-h-96 object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : selectedMedia.tipo === "video" ? (
                  <video
                    src={`http://72.60.49.22:8005${selectedMedia.arquivo_path}`}
                    controls
                    className="w-full h-auto max-h-96"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  >
                    Seu navegador não suporta a reprodução de vídeos.
                  </video>
                ) : (
                  <div className="p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <span className="text-4xl text-white">🎵</span>
                      </div>
                      <p className="text-sm text-gray-600 font-semibold">
                        {selectedMedia.arquivo_nome}
                      </p>
                    </div>
                  </div>
                )}
                {/* Fallback para erro de carregamento */}
                <div
                  style={{ display: "none" }}
                  className="p-8 items-center justify-center"
                >
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl text-white">
                        {selectedMedia.tipo === "imagem" ? "🖼️" : "🎥"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 font-semibold">
                      {selectedMedia.arquivo_nome}
                    </p>
                    <p className="text-xs text-red-600 mt-2">
                      Erro ao carregar mídia
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-300">
                  <p className="text-xs text-gray-700 font-bold mb-1">Tipo</p>
                  <p className="text-lg font-bold text-purple-600">
                    {formatMediaType(selectedMedia.tipo)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-300">
                  <p className="text-xs text-gray-700 font-bold mb-1">Status</p>
                  <p className="text-lg font-bold text-gray-600">
                    {selectedMedia.processado ? "Processado" : "Pendente"}
                  </p>
                </div>
              </div>

              {/* Associated Text */}
              {selectedMedia.texto_associado && (
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                  <p className="text-sm font-bold text-gray-900 mb-2">
                    💬 Texto Associado:
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {selectedMedia.texto_associado}
                  </p>
                </div>
              )}

              {/* Extracted Text (OCR) */}
              <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                <p className="text-sm font-bold text-gray-900 mb-2">
                  📄 Texto Extraído (OCR):
                </p>
                <p className="text-sm text-gray-700 italic">
                  {selectedMedia.ocr_texto || "Nenhum texto extraído."}
                </p>
              </div>

              {/* Transcription */}
              {selectedMedia.tipo === "video" && (
                <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                  <p className="text-sm font-bold text-gray-900 mb-2">
                    🎤 Transcrição:
                  </p>
                  <p className="text-sm text-gray-700 italic">
                    {selectedMedia.transcricao ||
                      "Nenhuma transcrição disponível."}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-4 rounded-b-xl border-t-2 border-gray-200">
              <button
                onClick={() => setSelectedMedia(null)}
                className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-semibold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b-2 border-purple-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎥</span>
            <h3 className="text-base font-bold text-gray-900">
              Mídias Recentes (OCR/Audio)
            </h3>
          </div>
        </div>

        {/* Media Grid */}
        <div className="p-2">
          {loading && recentMedia.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Carregando mídias...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-2">
              <p className="text-sm text-red-600 text-center">⚠️ {error}</p>
            </div>
          ) : recentMedia.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-gray-500">Nenhuma mídia disponível</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {recentMedia.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setSelectedMedia(item)}
                  className="bg-gray-100 rounded p-2 border border-gray-300 hover:border-purple-400 hover:shadow-sm transition-all cursor-pointer group"
                >
                  {/* Layout 2 Colunas: Imagem à Esquerda e Texto à Direita */}
                  <div className="flex gap-2">
                    {/* Coluna Esquerda: Imagem/Badge */}
                    <div className="shrink-0">
                      {item.tipo === "imagem" ? (
                        <div className="w-12 h-12 rounded overflow-hidden group-hover:scale-105 transition-transform">
                          <img
                            src={`http://72.60.49.22:8005${item.arquivo_path}`}
                            alt={item.arquivo_nome}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.parentElement.classList.add(
                                "bg-gradient-to-br",
                                "from-purple-400",
                                "to-blue-400",
                                "flex",
                                "items-center",
                                "justify-center"
                              );
                              e.target.parentElement.innerHTML =
                                '<span class="text-white font-bold text-xs">IMG</span>';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded flex items-center justify-center group-hover:scale-105 transition-transform">
                          <span className="text-white font-bold text-xs">
                            {formatMediaType(item.tipo)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Coluna Direita: Texto */}
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      {/* Channel Name */}
                      <p className="text-[10px] font-semibold text-gray-900 truncate mb-1">
                        {item.canal}
                      </p>

                      {/* Extracted Text Preview */}
                      <p className="text-[9px] text-gray-600 italic line-clamp-2">
                        {item.texto_associado || "Sem texto..."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-2 py-1.5">
          <p className="text-[12px] text-gray-700 font-semibold text-center">
            {recentMedia.length} mídias •{" "}
            {recentMedia.length > 0
              ? formatDate(recentMedia[0].data_hora)
              : "Aguardando..."}
          </p>
        </div>
      </div>
    </>
  );
};

export default RecentMedia;
