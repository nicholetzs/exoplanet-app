import { useState } from "react";
import "./App.css";
import { Navigation } from "./components/navigation";
import { AnalyzePage } from "./components/pages/analyze-page";
import { HistoryPage } from "./components/pages/history-page";
import { ForumPage } from "./components/pages/forum-page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { HeroSection } from "./components/hero-section";
import { SavedAnalysis, ForumPost } from "./app/types";

export default function App() {
  const [activeTab, setActiveTab] = useState<"analyze" | "history" | "forum">(
    "analyze"
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: 1,
      author: "João Silva",
      title: "🪐 Possível exoplanet detectado em Crux",
      description:
        "Curva com padrão muito interessante, detectei 3 dips significativos",
      confidence: 87,
      isExoplanet: true,
      votes: 12,
      crossRefData: {
        catalog: "TESS",
        match: "TIC 123456",
        distance: "0.02°",
      },
      timestamp: "2 dias atrás",
      coordinate: "RA 12:30:45, DEC -45:30:00",
    },
    {
      id: 2,
      author: "Maria Santos",
      title: "⭐ Análise de variabilidade estelar",
      description:
        "Padrão típico de estrela variável, sem sinais de trânsito planetário",
      confidence: 45,
      isExoplanet: false,
      votes: 5,
      crossRefData: {
        catalog: "Gaia",
        match: "Gaia DR3 123456",
        distance: "0.01°",
      },
      timestamp: "1 dia atrás",
      coordinate: "RA 18:45:30, DEC +30:15:00",
    },
  ]);

  const handleLogin = () => {
    if (loginUsername.trim()) {
      setUsername(loginUsername);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setShowHero(false);
      setLoginUsername("");
      setLoginPassword("");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setActiveTab("analyze");
    setSavedAnalyses([]);
    setShowHero(true);
    setShowLoginModal(false);
  };

  const handleGetStarted = () => {
    setShowHero(false);
    setShowLoginModal(true);
  };

  const handleSaveAnalysis = (analysis: SavedAnalysis) => {
    setSavedAnalyses([...savedAnalyses, analysis]);

    // Se compartilhado, adicionar ao forum
    if (!analysis.isPrivate) {
      const forumPost: ForumPost = {
        id: forumPosts.length + 1,
        author: username,
        title: `${analysis.result.isExoplanet ? "🪐" : "⭐"} ${
          analysis.description || analysis.filename
        }`,
        description: analysis.description,
        confidence: analysis.result.confidence,
        isExoplanet: analysis.result.isExoplanet,
        votes: 0,
        crossRefData: analysis.result.crossRef,
        timestamp: "agora",
        coordinate: analysis.coordinate,
      };
      setForumPosts([forumPost, ...forumPosts]);
    }
  };

  return (
    <div className="min-h-screen space-bg text-white">
      {!isLoggedIn && showHero && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}

      {isLoggedIn && (
        <>
          <Navigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isLoggedIn={isLoggedIn}
            username={username}
            onLogout={handleLogout}
          />

          {/* Main Content */}
          {activeTab === "analyze" && (
            <AnalyzePage onSaveAnalysis={handleSaveAnalysis} />
          )}
          {activeTab === "history" && <HistoryPage analyses={savedAnalyses} />}
          {activeTab === "forum" && <ForumPage posts={forumPosts} />}
        </>
      )}

      {/* Login Modal */}
      <Dialog
        open={showLoginModal && !isLoggedIn}
        onOpenChange={setShowLoginModal}
      >
        <DialogContent className="glass-card border-white/10 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">
              Bem-vindo ao ExoBrasilNet
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-6">
            <p className="text-white/60">
              Faça login para começar a analisar curvas de luz
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-white text-sm mb-2 block">Usuário</label>
                <Input
                  placeholder="Digite seu usuário"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Senha</label>
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <Button onClick={handleLogin} className="w-full btn-primary">
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </Button>

            <p className="text-white/60 text-sm text-center">
              Primeira vez? Use qualquer usuário para criar sua conta
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
