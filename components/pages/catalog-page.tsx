import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

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

interface CatalogPageProps {
  exoplanets: Exoplanet[];
}

export function CatalogPage({ exoplanets }: CatalogPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  const filters = [
    "Todos",
    "Terrestres",
    "Gigantes Gasosos",
    "Super Terras",
    "Zona Habitável",
  ];

  const filteredPlanets = exoplanets.filter((planet) => {
    const matchesSearch =
      planet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      planet.star.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "Todos" ||
      planet.type.includes(selectedFilter) ||
      planet.habitability.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-bg min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8">
          Catálogo de <span className="text-gradient">Exoplanetas</span>
        </h1>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Input
                placeholder="Buscar por nome do exoplaneta ou estrela..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input text-white placeholder:text-white/50 pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 group-hover:text-white/60 transition-colors" />
            </div>
            <Button className="btn-primary">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Badge
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  selectedFilter === filter
                    ? "bg-blue-600 text-white"
                    : "border-white/20 text-white/80 hover:border-blue-400/50 hover:text-white"
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>

        {/* Exoplanets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlanets.map((planet) => (
            <Card key={planet.id} className="planet-card group">
              <CardContent className="p-6">
                <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                  <img
                    src={planet.image || "/placeholder.svg"}
                    alt={planet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
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
    </div>
  );
}
