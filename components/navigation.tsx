import { Button } from "@/components/ui/button";
import { Upload, History, MessageCircle, LogOut, LogIn } from "lucide-react";

interface NavigationProps {
  activeTab: "analyze" | "history" | "forum";
  setActiveTab: (tab: "analyze" | "history" | "forum") => void;
  isLoggedIn: boolean;
  username: string;
  onLogout: () => void;
}

export function Navigation({
  activeTab,
  setActiveTab,
  isLoggedIn,
  username,
  onLogout,
}: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                EB
              </div>
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg group-hover:bg-cyan-400/30 transition-all"></div>
            </div>
            <h1 className="text-2xl font-bold text-gradient">ExoBrasilNet</h1>
          </div>

          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: "analyze", label: "Analisar", icon: Upload },
                { id: "history", label: "Minhas Análises", icon: History },
                { id: "forum", label: "Comunidade", icon: MessageCircle },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`nav-link text-white/80 hover:text-white transition-all flex items-center gap-2 ${
                    activeTab === id ? "text-blue-400" : ""
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <span className="text-sm text-purple-300">Olá, {username}!</span>
            )}
            <Button
              variant={isLoggedIn ? "outline" : "default"}
              className={isLoggedIn ? "btn-secondary" : "btn-primary"}
              onClick={onLogout}
            >
              {isLoggedIn ? (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
