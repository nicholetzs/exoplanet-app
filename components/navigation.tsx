
import { Button } from "@/components/ui/button"
import { Globe, Plus, Home, Database, MessageCircle, User } from "lucide-react"

interface NavigationProps {
  activeTab: "home" | "catalog" | "forum" | "profile"
  setActiveTab: (tab: "home" | "catalog" | "forum" | "profile") => void
  onRegister: () => void
}

export function Navigation({ activeTab, setActiveTab, onRegister }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <Globe className="h-8 w-8 text-blue-400 group-hover:text-cyan-400 transition-colors" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg group-hover:bg-cyan-400/30 transition-all"></div>
            </div>
            <h1 className="text-2xl font-bold text-gradient">ExoArchive</h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: "home", label: "Início", icon: Home },
              { id: "catalog", label: "Catálogo", icon: Database },
              { id: "forum", label: "Fórum", icon: MessageCircle },
              { id: "profile", label: "Perfil", icon: User },
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

          <Button className="btn-primary group" onClick={onRegister}>
            <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
            Cadastrar
          </Button>
        </div>
      </div>
    </nav>
  )
}
