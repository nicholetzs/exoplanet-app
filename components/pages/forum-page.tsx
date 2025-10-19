import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Zap } from "lucide-react";
import { ForumPost } from "@/app/types";

interface ForumPageProps {
  posts: ForumPost[];
}

export function ForumPage({ posts }: ForumPageProps) {
  return (
    <div className="container mx-auto px-6 py-24 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-gradient">
          Comunidade ExoBrasilNet
        </h2>
        <p className="text-white/60">
          Descubra análises compartilhadas pela comunidade
        </p>
      </div>

      {posts.length === 0 ? (
        <Card className="glass-card border-white/10 p-12 text-center">
          <p className="text-white/60 text-lg">
            Nenhuma análise compartilhada ainda. Seja o primeiro!
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className={`glass-card border-white/10 p-6 hover:border-blue-500/50 transition-all cursor-pointer group ${
                post.isExoplanet ? "border-green-500/30" : "border-blue-500/30"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {post.title}
                      </h3>
                      <Badge
                        variant={post.isExoplanet ? "default" : "secondary"}
                        className={
                          post.isExoplanet
                            ? "bg-green-900/50 text-green-300"
                            : "bg-blue-900/50 text-blue-300"
                        }
                      >
                        {post.isExoplanet ? "🪐 Exoplanet" : "⭐ Estrela"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span>Por {post.author}</span>
                      <span>•</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      {post.confidence}%
                    </div>
                    <p className="text-white/60 text-xs">Confiança</p>
                  </div>
                </div>

                {post.description && (
                  <p className="text-white/80 leading-relaxed">
                    {post.description}
                  </p>
                )}

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="space-y-2">
                    <p className="text-white/60 text-xs">Coordenadas</p>
                    <p className="text-white font-mono text-sm">
                      {post.coordinate}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/60 text-xs">
                      Cruzamento com Catálogos
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="border-indigo-500/50 text-indigo-300"
                      >
                        {post.crossRefData.catalog}
                      </Badge>
                      <span className="text-white/60 text-xs font-mono">
                        {post.crossRefData.match}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <Button
                    variant="ghost"
                    className="text-white/60 hover:text-white gap-2"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {post.votes} votos
                  </Button>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <Zap className="h-4 w-4" />
                    +10 créditos
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
