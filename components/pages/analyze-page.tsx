import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Upload, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { SavedAnalysis, CurveDataPoint, AnalysisResult } from "@/app/types";

interface AnalyzePageProps {
  onSaveAnalysis: (analysis: SavedAnalysis) => void;
}

export function AnalyzePage({ onSaveAnalysis }: AnalyzePageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [curveData, setCurveData] = useState<CurveDataPoint[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [coordinate, setCoordinate] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
      parseCurveFile(selectedFile);
    }
  };

  const parseCurveFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split("\n").filter((line) => line.trim());
        const data: CurveDataPoint[] = [];

        lines.forEach((line) => {
          const parts = line.split(/[\s,]+/).filter((p) => p);
          if (parts.length >= 2) {
            const time = Number.parseFloat(parts[0]);
            const flux = Number.parseFloat(parts[1]);
            if (!isNaN(time) && !isNaN(flux)) {
              data.push({ time, flux });
            }
          }
        });

        if (data.length === 0) {
          setError("Arquivo inválido. Nenhum dado encontrado.");
          return;
        }

        setCurveData(data);
        setResult(null);
      } catch (err) {
        setError("Erro ao processar arquivo");
      }
    };
    reader.readAsText(file);
  };

  const simulateAIAnalysis = async () => {
    if (!curveData || curveData.length === 0) {
      setError("Nenhuma curva carregada");
      return;
    }

    setAnalyzing(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const fluxValues = curveData.map((d) => d.flux);
    const mean = fluxValues.reduce((a, b) => a + b) / fluxValues.length;
    const variance =
      fluxValues.reduce((a, b) => a + Math.pow(b - mean, 2)) /
      fluxValues.length;
    const std = Math.sqrt(variance);

    let dipCount = 0;
    for (let i = 1; i < fluxValues.length - 1; i++) {
      if (
        fluxValues[i] < mean - 2 * std &&
        fluxValues[i] < fluxValues[i - 1] &&
        fluxValues[i] < fluxValues[i + 1]
      ) {
        dipCount++;
      }
    }

    const isExoplanet = dipCount >= 2 && std > 0.01;
    const confidence = Math.min(95, 40 + dipCount * 10 + std * 100);

    const catalogs = ["TESS", "Gaia", "Kepler", "TIC"];
    const crossRef = {
      catalog: catalogs[Math.floor(Math.random() * catalogs.length)],
      match: `TIC ${Math.floor(Math.random() * 999999)}`,
      distance: (Math.random() * 0.05).toFixed(4),
      confidence: Math.floor(Math.random() * 40 + 50),
    };

    setResult({
      isExoplanet,
      confidence: Number.parseFloat(confidence.toFixed(1)),
      dipCount,
      std: Number.parseFloat(std.toFixed(4)),
      message: isExoplanet
        ? "🪐 Possível detecção de exoplanet!"
        : "⭐ Padrão típico de estrela",
      crossRef,
    });

    setAnalyzing(false);
  };

  const handleSaveAnalysis = () => {
    if (!coordinate.trim()) {
      setError("Insira as coordenadas celestes");
      return;
    }

    if (!result || !file) return;

    const analysis: SavedAnalysis = {
      id: Date.now(),
      filename: file.name,
      timestamp: new Date().toLocaleDateString("pt-BR"),
      result,
      coordinate,
      description,
      isPrivate,
      credits: isPrivate ? 5 : 10,
    };

    onSaveAnalysis(analysis);
    setShowSaveModal(false);
    setCoordinate("");
    setDescription("");
    setIsPrivate(true);
    setCurveData([]);
    setFile(null);
    setResult(null);
  };

  return (
    <div className="container mx-auto px-6 py-24 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-gradient">
          Analisar Curva de Luz
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Faça upload de uma curva de luz em formato .txt ou .csv e deixe nossa
          IA analisar se há sinais de exoplanetas
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="glass-card border-white/10 p-8 space-y-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-400" />
            Upload de Arquivo
          </h3>

          <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-blue-400/50 transition-colors cursor-pointer group">
            <input
              type="file"
              accept=".txt,.csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer block">
              <div className="space-y-2">
                <Upload className="h-8 w-8 mx-auto text-blue-400 group-hover:scale-110 transition-transform" />
                <p className="text-white font-medium">
                  Clique ou arraste um arquivo
                </p>
                <p className="text-white/50 text-sm">Formatos: .txt ou .csv</p>
              </div>
            </label>
          </div>

          {file && (
            <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-white/60 text-sm">
                  {curveData.length} pontos de dados
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <Button
            onClick={simulateAIAnalysis}
            disabled={!curveData.length || analyzing}
            className="w-full btn-primary"
          >
            {analyzing ? (
              <>
                <Spinner className="h-4 w-4 mr-2" />
                Analisando...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Analisar com IA
              </>
            )}
          </Button>
        </Card>

        {/* Chart Section */}
        <Card className="glass-card border-white/10 p-8">
          <h3 className="text-xl font-semibold text-white mb-6">
            Visualização da Curva
          </h3>
          {curveData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={curveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="time" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(59, 130, 246, 0.5)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="flux"
                  stroke="#a855f7"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-80 flex items-center justify-center text-white/40">
              <p>Faça upload de um arquivo para visualizar a curva</p>
            </div>
          )}
        </Card>
      </div>

      {/* Result Section */}
      {result && (
        <Card
          className={`glass-card border-white/10 p-8 space-y-6 ${
            result.isExoplanet ? "border-green-500/50" : "border-blue-500/50"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {result.message}
              </h3>
              <p className="text-white/60">Análise concluída com sucesso</p>
            </div>
            <div
              className={`text-4xl font-bold ${
                result.isExoplanet ? "text-green-400" : "text-blue-400"
              }`}
            >
              {result.confidence}%
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Dips Detectados</p>
              <p className="text-2xl font-bold text-cyan-400">
                {result.dipCount}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Desvio Padrão</p>
              <p className="text-2xl font-bold text-purple-400">{result.std}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Catálogo</p>
              <p className="text-2xl font-bold text-blue-400">
                {result.crossRef.catalog}
              </p>
            </div>
          </div>

          <div className="bg-indigo-900/20 border border-indigo-500/50 rounded-lg p-4 space-y-2">
            <p className="text-white font-medium">Cruzamento com Catálogos</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/60">Match</p>
                <p className="text-white font-mono">{result.crossRef.match}</p>
              </div>
              <div>
                <p className="text-white/60">Distância Angular</p>
                <p className="text-white font-mono">
                  {result.crossRef.distance}°
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setShowSaveModal(true)}
            className="w-full btn-primary"
          >
            Salvar & Compartilhar
          </Button>
        </Card>
      )}

      {/* Save Modal */}
      <Dialog open={showSaveModal} onOpenChange={setShowSaveModal}>
        <DialogContent className="glass-card border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Salvar Análise</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label className="text-white mb-2 block">
                Coordenadas Celestes *
              </Label>
              <Input
                placeholder="RA 12:30:45, DEC -45:30:00"
                value={coordinate}
                onChange={(e) => setCoordinate(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <div>
              <Label className="text-white mb-2 block">
                Descrição (opcional)
              </Label>
              <Textarea
                placeholder="Descreva sua descoberta..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-white">Privacidade</Label>
              <RadioGroup
                value={isPrivate ? "private" : "public"}
                onValueChange={(v) => setIsPrivate(v === "private")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label
                    htmlFor="private"
                    className="text-white/80 cursor-pointer"
                  >
                    Privado (5 créditos)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label
                    htmlFor="public"
                    className="text-white/80 cursor-pointer"
                  >
                    Compartilhar (10 créditos)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowSaveModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveAnalysis}
                className="flex-1 btn-primary"
              >
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
