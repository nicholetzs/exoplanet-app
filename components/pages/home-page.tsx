import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Sparkles } from "lucide-react";

interface Exoplanet {
  id: number;
  name: string;
  type: string;
  star: string;
  distance: string;
  habitability: string;
  image: string;
  description: string;
}

interface HomePageProps {
  exoplanets: Exoplanet[];
  onRegister: () => void;
}

export function HomePage({ exoplanets, onRegister }: HomePageProps) {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center justify-center text-center relative particles-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-300">
              Bem-vindo ao futuro da astronomia
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-6 animate-float text-shadow leading-tight">
            Explore o <span className="text-gradient">Universo</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto animate-fade-in">
            Descubra, cadastre e compartilhe exoplanetas com uma comunidade
            apaixonada pela astronomia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary text-lg px-8 py-6 group">
              <Search className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Explorar Catálogo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white/10 bg-transparent group"
              onClick={onRegister}
            >
              <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
              Cadastrar Exoplaneta
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 space-bg relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                value: "1,247",
                label: "Exoplanetas Cadastrados",
                color: "from-blue-500 to-cyan-500",
              },
              {
                value: "892",
                label: "Usuários Ativos",
                color: "from-purple-500 to-pink-500",
              },
              {
                value: "156",
                label: "Discussões no Fórum",
                color: "from-cyan-500 to-blue-500",
              },
            ].map((stat, i) => (
              <Card
                key={i}
                className="stats-counter text-center group cursor-pointer"
              >
                <CardContent className="p-8">
                  <div
                    className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white/80 group-hover:text-white transition-colors">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Exoplanets */}
      <section className="py-12 md:py-20 space-bg">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8 md:mb-12 animate-slide-up">
            Exoplanetas em <span className="text-gradient">Destaque</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {exoplanets.map((planet) => (
              <Card key={planet.id} className="planet-card group">
                <CardContent className="p-6">
                  <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                    <img
                      src={planet.image || "/placeholder.svg"}
                      alt={planet.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {planet.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-blue-500/20 text-blue-300 border-blue-400/30"
                    >
                      {planet.type}
                    </Badge>
                    <Badge
                      variant={
                        planet.habitability === "Zona Habitável"
                          ? "default"
                          : "outline"
                      }
                      className={
                        planet.habitability === "Zona Habitável"
                          ? "bg-green-600"
                          : ""
                      }
                    >
                      {planet.habitability}
                    </Badge>
                  </div>
                  <p className="text-white/70 text-sm mb-4">
                    {planet.description}
                  </p>
                  <div className="text-xs text-white/50 space-y-1">
                    <div>Estrela: {planet.star}</div>
                    <div>Distância: {planet.distance}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
