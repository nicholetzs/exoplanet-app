import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Settings } from "lucide-react";

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

interface ProfilePageProps {
  exoplanets: Exoplanet[];
}

export function ProfilePage({ exoplanets }: ProfilePageProps) {
  return (
    <div className="space-bg min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8">
          Meu <span className="text-gradient">Perfil</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="glass-card group">
            <CardHeader>
              <CardTitle className="text-white">
                Informações do Usuário
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Dr. Astrofísico
                </h3>
                <p className="text-white/60">Membro desde Janeiro 2024</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Meus Exoplanetas</CardTitle>
              <CardDescription className="text-white/60">
                Exoplanetas que você cadastrou no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exoplanets.slice(0, 2).map((planet) => (
                  <div
                    key={planet.id}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
                  >
                    <img
                      src={planet.image || "/placeholder.svg"}
                      alt={planet.name}
                      className="w-16 h-16 object-cover rounded-lg group-hover:scale-110 transition-transform"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {planet.name}
                      </h4>
                      <p className="text-sm text-white/60">
                        {planet.type} • {planet.star}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group-hover:border-blue-400 group-hover:text-blue-400 transition-colors bg-transparent"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
