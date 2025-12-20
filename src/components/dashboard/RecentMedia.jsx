import { useState } from "react";

const RecentMedia = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);

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
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full"
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
                Canal: {selectedMedia.channel}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Preview */}
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center border-2 border-gray-300">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl text-white">🖼️</span>
                  </div>
                  <p className="text-sm text-gray-600 font-semibold">
                    Imagem processada com OCR
                  </p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-300">
                  <p className="text-xs text-gray-700 font-bold mb-1">Tipo</p>
                  <p className="text-lg font-bold text-purple-600">
                    {selectedMedia.type}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-300">
                  <p className="text-xs text-gray-700 font-bold mb-1">Score</p>
                  <p className="text-lg font-bold text-gray-600">
                    {selectedMedia.score}
                  </p>
                </div>
              </div>

              {/* Extracted Text */}
              <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                <p className="text-sm font-bold text-gray-900 mb-2">
                  📄 Texto Extraído:
                </p>
                <p className="text-sm text-gray-700 italic">
                  {selectedMedia.extracted || "Nenhum texto extraído."}
                </p>
              </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className="bg-gray-100 rounded p-2 border border-gray-300 hover:border-purple-400 hover:shadow-sm transition-all cursor-pointer group"
              >
                {/* Layout 2 Colunas: Imagem à Esquerda e Texto à Direita */}
                <div className="flex gap-2">
                  {/* Coluna Esquerda: Imagem/Badge */}
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded flex items-center justify-center group-hover:scale-105 transition-transform">
                      <span className="text-white font-bold text-xs">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  {/* Coluna Direita: Texto */}
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    {/* Channel Name */}
                    <p className="text-[10px] font-semibold text-gray-900 truncate mb-1">
                      {item.channel}
                    </p>

                    {/* Extracted Text Preview */}
                    <p className="text-[9px] text-gray-600 italic line-clamp-2">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-2 py-1.5">
          <p className="text-[12px] text-gray-700 font-semibold text-center">
            {mediaItems.length} mídias • Há 2 min
          </p>
        </div>
      </div>
    </>
  );
};

export default RecentMedia;
