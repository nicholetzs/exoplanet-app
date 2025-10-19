import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Share2, Zap } from "lucide-react";
import { SavedAnalysis } from "@/app/types";

interface HistoryPageProps {
  analyses: SavedAnalysis[];
}

export function HistoryPage({ analyses }: HistoryPageProps) {
  return (
    <div className="container mx-auto px-6 py-24 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-gradient">Minhas Análises</h2>
        <p className="text-white/60">
          Histórico de todas as suas análises de curvas de luz
        </p>
      </div>

      {analyses.length === 0 ? (
        <Card className="glass-card border-white/10 p-12 text-center">
          <p className="text-white/60 text-lg">
            Nenhuma análise salva ainda. Comece analisando uma curva de luz!
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <Card
              key={analysis.id}
              className="glass-card border-white/10 p-6 hover:border-blue-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {analysis.filename}
                    </h3>
                    <Badge
                      variant={analysis.isPrivate ? "secondary" : "default"}
                      className="flex items-center gap-1"
                    >
                      {analysis.isPrivate ? (
                        <>
                          <Lock className="h-3 w-3" />
                          Privado
                        </>
                      ) : (
                        <>
                          <Share2 className="h-3 w-3" />
                          Compartilhado
                        </>
                      )}
                    </Badge>
                  </div>
                  <p className="text-white/60 text-sm">{analysis.timestamp}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {analysis.result.confidence}%
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <Zap className="h-4 w-4" />+{analysis.credits}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {analysis.description && (
                  <p className="text-white/80">
                    <span className="text-white/60">Descrição: </span>
                    {analysis.description}
                  </p>
                )}
                <p className="text-white/80">
                  <span className="text-white/60">Coordenadas: </span>
                  <span className="font-mono text-cyan-300">
                    {analysis.coordinate}
                  </span>
                </p>

                <div className="grid md:grid-cols-3 gap-3 pt-3 border-t border-white/10">
                  <div>
                    <p className="text-white/60 text-xs mb-1">Tipo</p>
                    <p className="text-white font-medium">
                      {analysis.result.isExoplanet
                        ? "🪐 Exoplanet"
                        : "⭐ Estrela"}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">Dips</p>
                    <p className="text-white font-medium">
                      {analysis.result.dipCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">Catálogo</p>
                    <p className="text-white font-medium">
                      {analysis.result.crossRef.catalog}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
