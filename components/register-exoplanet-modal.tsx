
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ChevronRight, ChevronLeft, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"

interface Candidate {
  id: number
  kepler_name: string
  tess_name: string
  koi_kepmag: number
  koi_steff: number
  koi_slogg: number
  status: "CONFIRMED" | "CANDIDATE"
  koi_num_transits: number
  koi_model_snr: number
  koi_period: number
  koi_ror: number
  koi_srho: number
  koi_prad: number
  koi_dor: number
  koi_teq: number
  koi_insol: number
  koi_fpflag_nt: number
  koi_fpflag_ss: number
  koi_fpflag_co: number
  koi_fpflag_ec: number
  koi_max_sngle_ev: number
  koi_max_mult_ev: number
  koi_model_chisq: number
  koi_srad: number
  koi_smass: number
}

interface EditableData {
  koi_depth: string
  koi_duration: string
  koi_incl: string
  koi_impact: string
  comments: string
  hasOwnCurve: boolean
}

interface Prediction {
  confirmed: number
  falsePositive: number
  confidence: "high" | "medium" | "low"
}

interface RegisterExoplanetModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RegisterExoplanetModal({ isOpen, onClose }: RegisterExoplanetModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedTarget, setSelectedTarget] = useState<Candidate | null>(null)
  const [editableData, setEditableData] = useState<EditableData>({
    koi_depth: "",
    koi_duration: "",
    koi_incl: "",
    koi_impact: "",
    comments: "",
    hasOwnCurve: false,
  })
  const [prediction, setPrediction] = useState<Prediction | null>(null)

  const candidates: Candidate[] = [
    {
      id: 1,
      kepler_name: "Kepler-442b",
      tess_name: "TIC 123456789",
      koi_kepmag: 12.5,
      koi_steff: 5200,
      koi_slogg: 4.5,
      status: "CONFIRMED",
      koi_num_transits: 15,
      koi_model_snr: 45.2,
      koi_period: 112.3,
      koi_ror: 0.045,
      koi_srho: 1.2,
      koi_prad: 1.3,
      koi_dor: 0.31,
      koi_teq: 296,
      koi_insol: 1.04,
      koi_fpflag_nt: 0,
      koi_fpflag_ss: 0,
      koi_fpflag_co: 0,
      koi_fpflag_ec: 0,
      koi_max_sngle_ev: 12.5,
      koi_max_mult_ev: 8.3,
      koi_model_chisq: 1.2,
      koi_srad: 0.95,
      koi_smass: 1.02,
    },
    {
      id: 2,
      kepler_name: "HD 209458b",
      tess_name: "TIC 987654321",
      koi_kepmag: 7.6,
      koi_steff: 6091,
      koi_slogg: 4.3,
      status: "CONFIRMED",
      koi_num_transits: 28,
      koi_model_snr: 78.5,
      koi_period: 3.52,
      koi_ror: 0.12,
      koi_srho: 0.8,
      koi_prad: 1.38,
      koi_dor: 0.047,
      koi_teq: 1449,
      koi_insol: 2141,
      koi_fpflag_nt: 0,
      koi_fpflag_ss: 0,
      koi_fpflag_co: 0,
      koi_fpflag_ec: 0,
      koi_max_sngle_ev: 25.3,
      koi_max_mult_ev: 15.8,
      koi_model_chisq: 0.95,
      koi_srad: 1.155,
      koi_smass: 1.119,
    },
    {
      id: 3,
      kepler_name: "TRAPPIST-1e",
      tess_name: "TIC 25155310",
      koi_kepmag: 18.8,
      koi_steff: 2566,
      koi_slogg: 5.2,
      status: "CANDIDATE",
      koi_num_transits: 8,
      koi_model_snr: 32.1,
      koi_period: 6.099,
      koi_ror: 0.02,
      koi_srho: 1.5,
      koi_prad: 0.92,
      koi_dor: 0.02925,
      koi_teq: 246,
      koi_insol: 0.62,
      koi_fpflag_nt: 0,
      koi_fpflag_ss: 0,
      koi_fpflag_co: 0,
      koi_fpflag_ec: 0,
      koi_max_sngle_ev: 8.2,
      koi_max_mult_ev: 5.1,
      koi_model_chisq: 1.1,
      koi_srad: 0.117,
      koi_smass: 0.089,
    },
  ]

  const handleSelectTarget = (candidate: Candidate) => {
    setSelectedTarget(candidate)
    setEditableData({
      koi_depth: "",
      koi_duration: "",
      koi_incl: "",
      koi_impact: "",
      comments: "",
      hasOwnCurve: false,
    })
    setStep(2)
  }

  const handleEditableChange = (field: keyof EditableData, value: string | boolean) => {
    setEditableData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmitPrediction = () => {
    const confidence = Math.random() * 100
    setPrediction({
      confirmed: confidence,
      falsePositive: 100 - confidence,
      confidence: confidence > 90 ? "high" : confidence > 50 ? "medium" : "low",
    })
    setStep(3)
  }

  const getConfidenceIcon = (confidence: number) => {
    if (confidence > 90) return <CheckCircle className="h-6 w-6 text-green-400" />
    if (confidence > 50) return <AlertTriangle className="h-6 w-6 text-yellow-400" />
    return <AlertCircle className="h-6 w-6 text-red-400" />
  }

  const getStatusColor = (status: string) => {
    if (status === "CONFIRMED") return "bg-green-600"
    if (status === "CANDIDATE") return "bg-yellow-600"
    return "bg-red-600"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-2xl mx-4 glass-card max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-white/10">
          <div>
            <CardTitle className="text-2xl text-white">
              {step === 1 && "Escolha o Alvo"}
              {step === 2 && "Visualize e Ajuste os Dados"}
              {step === 3 && "Resultado da Predição"}
            </CardTitle>
            <CardDescription className="text-white/60">Etapa {step} de 3</CardDescription>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </CardHeader>

        <CardContent className="pt-6">
          {/* STEP 1: Seleção do Alvo */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Buscar por Kepler Name ou TESS Name</label>
                <Input
                  placeholder="Ex: Kepler-442b ou TIC 123456789"
                  className="search-input text-white placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white mb-3">Candidatos Disponíveis</label>
                <div className="space-y-3">
                  {candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      onClick={() => handleSelectTarget(candidate)}
                      className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 cursor-pointer transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {candidate.kepler_name}
                          </h3>
                          <p className="text-sm text-white/60">{candidate.tess_name}</p>
                        </div>
                        <Badge className={`${getStatusColor(candidate.status)} text-white`}>{candidate.status}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-white/60">Magnitude:</span>
                          <p className="text-white font-medium">{candidate.koi_kepmag}</p>
                        </div>
                        <div>
                          <span className="text-white/60">Trânsitos:</span>
                          <p className="text-white font-medium">{candidate.koi_num_transits}</p>
                        </div>
                        <div>
                          <span className="text-white/60">SNR:</span>
                          <p className="text-white font-medium">{candidate.koi_model_snr.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Visualização e Ajuste */}
          {step === 2 && selectedTarget && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-400/30">
                <h3 className="text-lg font-semibold text-white mb-1">{selectedTarget.kepler_name}</h3>
                <p className="text-sm text-white/60">{selectedTarget.tess_name}</p>
              </div>

              {/* Propriedades Transitórias (Editáveis) */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Propriedades Transitórias (Editáveis)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/60 mb-2">Profundidade do Trânsito (ppm)</label>
                    <Input
                      type="number"
                      placeholder="koi_depth"
                      value={editableData.koi_depth}
                      onChange={(e) => handleEditableChange("koi_depth", e.target.value)}
                      className="search-input text-white placeholder:text-white/50"
                    />
                    <p className="text-xs text-white/40 mt-1">
                      💡 Ajuste apenas se tiver medições reais da curva de luz
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-2">Duração do Trânsito (horas)</label>
                    <Input
                      type="number"
                      placeholder="koi_duration"
                      value={editableData.koi_duration}
                      onChange={(e) => handleEditableChange("koi_duration", e.target.value)}
                      className="search-input text-white placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-2">Inclinação (graus)</label>
                    <Input
                      type="number"
                      placeholder="koi_incl"
                      value={editableData.koi_incl}
                      onChange={(e) => handleEditableChange("koi_incl", e.target.value)}
                      className="search-input text-white placeholder:text-white/50"
                    />
                    <p className="text-xs text-white/40 mt-1">⚠️ Apenas com curva de luz de alta qualidade</p>
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-2">Parâmetro de Impacto</label>
                    <Input
                      type="number"
                      placeholder="koi_impact"
                      value={editableData.koi_impact}
                      onChange={(e) => handleEditableChange("koi_impact", e.target.value)}
                      className="search-input text-white placeholder:text-white/50"
                    />
                  </div>
                </div>
              </div>

              {/* Informações de Contexto (Somente Leitura) */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Informações de Contexto (Somente Leitura)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { label: "Período Orbital", value: `${selectedTarget.koi_period} dias` },
                    { label: "Raio do Planeta", value: `${selectedTarget.koi_prad} R⊕` },
                    { label: "Temperatura de Equilíbrio", value: `${selectedTarget.koi_teq} K` },
                    { label: "Insolação", value: `${selectedTarget.koi_insol.toFixed(2)} S⊕` },
                    { label: "Temperatura Estelar", value: `${selectedTarget.koi_steff} K` },
                    { label: "Massa Estelar", value: `${selectedTarget.koi_smass} M☉` },
                    { label: "SNR do Modelo", value: `${selectedTarget.koi_model_snr.toFixed(1)}` },
                    { label: "Número de Trânsitos", value: `${selectedTarget.koi_num_transits}` },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-xs text-white/60">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campos Colaborativos */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Comentários do Observador</label>
                  <textarea
                    placeholder="Adicione suas observações ou notas..."
                    value={editableData.comments}
                    onChange={(e) => handleEditableChange("comments", e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-blue-400/50 focus:outline-none"
                    rows={3}
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editableData.hasOwnCurve}
                    onChange={(e) => handleEditableChange("hasOwnCurve", e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-white">Minha medição é baseada em curva de luz própria</span>
                </label>
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                <Button onClick={handleSubmitPrediction} className="btn-primary">
                  Enviar para Análise
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Resultado da Predição */}
          {step === 3 && prediction && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-400/30">
                <h3 className="text-lg font-semibold text-white mb-1">{selectedTarget?.kepler_name}</h3>
                <p className="text-sm text-white/60">Análise Concluída</p>
              </div>

              {/* Resultado Principal */}
              <div className="space-y-4">
                <div className="p-6 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">Classificação</h4>
                    {getConfidenceIcon(prediction.confirmed)}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-white">Confirmado</span>
                        <span className="text-green-400 font-semibold">{prediction.confirmed.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${prediction.confirmed}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-white">Falso Positivo</span>
                        <span className="text-red-400 font-semibold">{prediction.falsePositive.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${prediction.falsePositive}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nível de Confiança */}
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-semibold text-white mb-3">Nível de Confiança</h4>
                  <div className="flex items-center gap-3">
                    {getConfidenceIcon(prediction.confirmed)}
                    <span className="text-white font-medium">
                      {prediction.confidence === "high" && "✅ Confirmação Alta (>90%)"}
                      {prediction.confidence === "medium" && "⚠️ Confirmação Média (50-90%)"}
                      {prediction.confidence === "low" && "❌ Confirmação Baixa (<50%)"}
                    </span>
                  </div>
                </div>

                {/* Flags de Alerta */}
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-semibold text-white mb-3">Flags de Verificação</h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { flag: selectedTarget?.koi_fpflag_nt, label: "Teste de Não-Trânsito" },
                      { flag: selectedTarget?.koi_fpflag_ss, label: "Teste Estelar" },
                      { flag: selectedTarget?.koi_fpflag_co, label: "Teste de Centroide" },
                      { flag: selectedTarget?.koi_fpflag_ec, label: "Teste Eclipsante" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${item.flag === 0 ? "bg-green-400" : "bg-red-400"}`}
                        ></span>
                        <span className="text-white/80">
                          {item.label}: {item.flag === 0 ? "Passou" : "Falhou"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                <Button onClick={onClose} className="btn-primary">
                  Concluir
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
